#!/usr/bin/env python3
"""SEO/GEO health-check scorecard (Ticket 18).

Reads sitemap.xml to discover every indexable page, fetches each one the way
a non-JS crawler sees it (urllib never executes JS), runs a battery of
pass/fail checks per page plus a few site-level and cross-page checks, then
diffs the result against the previous run stored under
scripts/health-check-history/.

Usage: python3 scripts/seo-geo-health-check.py [base_url]
  base_url defaults to https://aaa-tech.com

What this script does NOT cover, by design — these need Omer's own tool
exports, not a raw-HTML crawl:
  - Core Web Vitals field data (real-user LCP/CLS/INP) -> PageSpeed Insights / CrUX
  - Search Console index coverage, query impressions/clicks -> Google Search Console
  - Keyword volume/difficulty, backlink data -> Semrush
  - Whether AI engines actually cite us for target queries -> manual ChatGPT/
    Perplexity/AI-Overviews checks (see content-map.md / Ticket 19)
"""
import sys
import os
import re
import json
import glob
from datetime import datetime, timezone
from urllib.request import urlopen, Request
from urllib.parse import urlparse
from urllib.error import URLError, HTTPError
import xml.etree.ElementTree as ET

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'https://aaa-tech.com').rstrip('/')
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
HISTORY_DIR = os.path.join(SCRIPT_DIR, 'health-check-history')
UA = 'Mozilla/5.0 (compatible; AAA-HealthCheck/1.0; +https://aaa-tech.com/)'
WORD_FLOOR = 150

CHECK_LABELS = [
    'status_200', 'title_ok', 'meta_description_ok', 'exactly_one_h1',
    'canonical_self_referential', 'hreflang_complete', 'jsonld_valid',
    'lang_dir_correct', 'all_images_have_alt', 'core_content_present',
]


def fetch(path):
    url = BASE + path
    req = Request(url, headers={'User-Agent': UA})
    try:
        with urlopen(req, timeout=15) as resp:
            return resp.getcode(), resp.read().decode('utf-8', errors='replace'), url
    except HTTPError as e:
        return e.code, '', url
    except URLError:
        return 0, '', url


def stripped_text(html):
    html = re.sub(r'<script.*?</script>', ' ', html, flags=re.S)
    html = re.sub(r'<style.*?</style>', ' ', html, flags=re.S)
    text = re.sub(r'<[^>]+>', ' ', html)
    return re.sub(r'\s+', ' ', text).strip()


def get_sitemap_paths():
    status, body, url = fetch('/sitemap.xml')
    if status != 200:
        return None, f"could not fetch {url} (status {status})"
    try:
        root = ET.fromstring(body)
    except ET.ParseError as e:
        return None, f"sitemap.xml is not valid XML: {e}"
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    locs = [loc.text.strip() for loc in root.findall('.//s:loc', ns)]
    if not locs:
        return None, "sitemap.xml has no <url><loc> entries"
    paths = [(urlparse(loc).path or '/') for loc in locs]
    return paths, None


def expected_locale(path):
    """Returns (lang, dir, sibling_path) — the counterpart HE<->EN path."""
    if path == '/en' or path.startswith('/en/'):
        sibling = path[len('/en'):] or '/'
        return 'en', 'ltr', sibling
    sibling = '/en' if path == '/' else '/en' + path
    return 'he', 'rtl', sibling


def check_page(path):
    checks = {}
    notes = []
    status, html, url = fetch(path)
    checks['status_200'] = (status == 200)
    if status != 200 or not html:
        for c in CHECK_LABELS[1:]:
            checks[c] = False
        notes.append(f"fetch failed, status={status}")
        return checks, notes, {}

    title_m = re.search(r'<title>(.*?)</title>', html, re.S)
    title = title_m.group(1).strip() if title_m else ''
    checks['title_ok'] = bool(title) and 10 <= len(title) <= 70
    if not checks['title_ok']:
        notes.append(f"title length {len(title)} (want 10-70): {title[:60]!r}")

    desc_m = re.search(r'<meta name="description" content="(.*?)"\s*/?>', html, re.S)
    desc = desc_m.group(1).strip() if desc_m else ''
    checks['meta_description_ok'] = bool(desc) and 50 <= len(desc) <= 160
    if not checks['meta_description_ok']:
        notes.append(f"meta description length {len(desc)} (want 50-160)")

    h1_count = len(re.findall(r'<h1[ >]', html))
    checks['exactly_one_h1'] = (h1_count == 1)
    if not checks['exactly_one_h1']:
        notes.append(f"h1 count = {h1_count}, want exactly 1")

    canon_m = re.search(r'rel="canonical" href="([^"]+)"', html)
    canon = canon_m.group(1) if canon_m else ''
    # Compare path only, not the full URL — lets this run against a staging
    # host or Vercel preview where the domain legitimately differs from the
    # canonical tag's production domain.
    checks['canonical_self_referential'] = bool(canon) and (urlparse(canon).path == path)
    if not checks['canonical_self_referential']:
        notes.append(f"canonical path {urlparse(canon).path!r} does not match fetched path {path!r}")

    lang, dirn, sibling = expected_locale(path)
    he_m = re.search(r'hreflang="he" href="([^"]+)"', html)
    en_m = re.search(r'hreflang="en" href="([^"]+)"', html)
    xd_m = re.search(r'hreflang="x-default" href="([^"]+)"', html)
    checks['hreflang_complete'] = bool(he_m and en_m and xd_m)
    if not checks['hreflang_complete']:
        notes.append("missing one or more of hreflang he/en/x-default")

    ld_blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
    jsonld_ok = False
    for block in ld_blocks:
        try:
            json.loads(block)
            jsonld_ok = True
            break
        except json.JSONDecodeError:
            continue
    checks['jsonld_valid'] = jsonld_ok
    if not checks['jsonld_valid']:
        notes.append("no valid application/ld+json block found")

    html_tag_m = re.search(r'<html lang="([^"]+)" dir="([^"]+)"', html)
    actual_lang, actual_dir = (html_tag_m.groups() if html_tag_m else ('', ''))
    checks['lang_dir_correct'] = (actual_lang == lang and actual_dir == dirn)
    if not checks['lang_dir_correct']:
        notes.append(f"lang/dir = {actual_lang}/{actual_dir}, expected {lang}/{dirn}")

    imgs = re.findall(r'<img\b[^>]*>', html)
    imgs_without_alt = [i for i in imgs if 'alt=' not in i]
    checks['all_images_have_alt'] = (len(imgs_without_alt) == 0)
    if imgs_without_alt:
        notes.append(f"{len(imgs_without_alt)}/{len(imgs)} <img> tags missing alt")

    word_count = len(stripped_text(html).split())
    checks['core_content_present'] = (word_count >= WORD_FLOOR)
    if not checks['core_content_present']:
        notes.append(f"stripped word count {word_count} < floor {WORD_FLOOR}")

    meta = {
        'word_count': word_count,
        'page_weight_kb': round(len(html.encode('utf-8')) / 1024, 1),
        'canonical': canon,
        'hreflang_he': he_m.group(1) if he_m else None,
        'hreflang_en': en_m.group(1) if en_m else None,
        'hreflang_xdefault': xd_m.group(1) if xd_m else None,
    }
    return checks, notes, meta


def check_reciprocity(pages_meta):
    """Cross-page: every page's declared hreflang siblings must exist in the
    sitemap and agree on x-default."""
    results = {}
    paths = set(pages_meta.keys())
    for path, meta in pages_meta.items():
        if not meta:
            continue
        lang, _, sibling = expected_locale(path)
        ok = True
        notes = []
        if sibling not in paths:
            ok = False
            notes.append(f"sibling {sibling} not in sitemap")
        he_href = meta.get('hreflang_he')
        en_href = meta.get('hreflang_en')
        if he_href and en_href:
            he_path = urlparse(he_href).path
            en_path = urlparse(en_href).path
            expected_he = sibling if lang == 'en' else path
            expected_en = path if lang == 'en' else sibling
            if he_path != expected_he or en_path != expected_en:
                ok = False
                notes.append(f"hreflang pair mismatch: he={he_path} en={en_path}")
        results[path] = (ok, notes)
    return results


def check_site_level():
    checks = {}
    notes = {}
    for name, path in [('robots_txt', '/robots.txt'), ('llms_txt', '/llms.txt')]:
        status, body, url = fetch(path)
        checks[name] = (status == 200 and len(body) > 0)
        if not checks[name]:
            notes[name] = f"status={status}"

    status, body, url = fetch('/sitemap.xml')
    sitemap_ok = (status == 200)
    if sitemap_ok:
        try:
            ET.fromstring(body)
        except ET.ParseError as e:
            sitemap_ok = False
            notes['sitemap_xml'] = f"invalid XML: {e}"
    else:
        notes['sitemap_xml'] = f"status={status}"
    checks['sitemap_xml'] = sitemap_ok
    return checks, notes


def load_previous_snapshot():
    os.makedirs(HISTORY_DIR, exist_ok=True)
    files = sorted(glob.glob(os.path.join(HISTORY_DIR, '*.json')))
    if not files:
        return None
    with open(files[-1], encoding='utf-8') as f:
        return json.load(f)


def save_snapshot(snapshot):
    os.makedirs(HISTORY_DIR, exist_ok=True)
    ts = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    out_path = os.path.join(HISTORY_DIR, f'{ts}.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(snapshot, f, indent=2, sort_keys=True)
    return out_path


def diff_snapshots(prev, curr):
    if not prev:
        return None
    lines = []
    prev_pages = prev.get('pages', {})
    curr_pages = curr.get('pages', {})
    for path in sorted(set(prev_pages) | set(curr_pages)):
        p = prev_pages.get(path, {}).get('checks', {})
        c = curr_pages.get(path, {}).get('checks', {})
        for check in sorted(set(p) | set(c)):
            pv, cv = p.get(check), c.get(check)
            if pv != cv:
                arrow = 'REGRESSION' if (pv and not cv) else 'IMPROVED' if (not pv and cv) else 'CHANGED'
                lines.append(f"  [{arrow}] {path} :: {check}: {pv} -> {cv}")
    score_delta = curr['overall_score'] - prev['overall_score']
    return lines, score_delta


def main():
    print(f"SEO/GEO health check against {BASE}\n")

    paths, err = get_sitemap_paths()
    if err:
        print(f"FATAL: {err}")
        sys.exit(1)
    print(f"Discovered {len(paths)} pages from sitemap.xml\n")

    pages_result = {}
    pages_meta = {}
    total_checks = 0
    total_passed = 0

    for path in paths:
        checks, notes, meta = check_page(path)
        pages_result[path] = {'checks': checks, 'notes': notes, 'meta': meta}
        pages_meta[path] = meta
        total_checks += len(checks)
        total_passed += sum(1 for v in checks.values() if v)

        status_str = 'PASS' if all(checks.values()) else 'FAIL'
        print(f"{path:45s} {status_str}  ({sum(checks.values())}/{len(checks)})")
        for note in notes:
            print(f"    - {note}")

    print()
    recip = check_reciprocity(pages_meta)
    recip_pass = sum(1 for ok, _ in recip.values() if ok)
    total_checks += len(recip)
    total_passed += recip_pass
    print(f"hreflang reciprocity: {recip_pass}/{len(recip)} pages OK")
    for path, (ok, notes) in recip.items():
        if not ok:
            for n in notes:
                print(f"    - {path}: {n}")

    print()
    site_checks, site_notes = check_site_level()
    total_checks += len(site_checks)
    total_passed += sum(1 for v in site_checks.values() if v)
    print("Site-level checks:")
    for name, ok in site_checks.items():
        print(f"  {name:15s} {'PASS' if ok else 'FAIL'}" + (f"  ({site_notes[name]})" if not ok and name in site_notes else ""))

    overall_score = round(100 * total_passed / total_checks, 1) if total_checks else 0.0

    snapshot = {
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'base_url': BASE,
        'pages': pages_result,
        'reciprocity': {p: {'ok': ok, 'notes': notes} for p, (ok, notes) in recip.items()},
        'site_checks': site_checks,
        'overall_score': overall_score,
    }

    prev = load_previous_snapshot()
    diff = diff_snapshots(prev, snapshot)

    print(f"\n{'=' * 60}")
    print(f"OVERALL SCORE: {overall_score}%  ({total_passed}/{total_checks} checks passed)")
    if diff:
        lines, score_delta = diff
        sign = '+' if score_delta >= 0 else ''
        print(f"DELTA vs. previous run: {sign}{score_delta:.1f} points")
        if lines:
            print("Changes since last run:")
            for line in lines:
                print(line)
        else:
            print("No check-level changes since last run.")
    else:
        print("No previous run found — this is the baseline.")

    out_path = save_snapshot(snapshot)
    print(f"\nSnapshot saved: {out_path}")

    print(f"""
{'-' * 60}
NOT covered by this script (needs Omer's own tool exports):
  - Core Web Vitals field data (real-user LCP/CLS/INP)  -> PageSpeed Insights
  - Search Console index coverage, query impressions    -> Google Search Console
  - Keyword volume/difficulty, backlink counts           -> Semrush
  - Whether AI engines actually cite us for target terms -> manual GEO citation
                                                             check (Ticket 19)
""")


if __name__ == '__main__':
    main()
