#!/usr/bin/env bash
# Ticket 02 (GEO no-JS content gate) baseline/regression check.
#
# Fetches each canonical URL the way a non-JS AI crawler sees it (curl never
# executes JS, so this *is* the no-JS view) and asserts the core copy — hero
# headline, all 5 case studies, FAQ answers — is present as real text in the
# raw HTML response, plus a stripped-tag word count as a regression floor.
#
# Usage: ./scripts/geo-crawl-check.sh [base_url]
#   base_url defaults to https://aaa-tech.com — pass a Vercel preview URL
#   to check before a change goes live.

set -euo pipefail

BASE="${1:-https://aaa-tech.com}"
UA_DEFAULT="Mozilla/5.0"
UA_GOOGLEBOT="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

fetch() {
  local url="$1" ua="$2" out="$3"
  curl -sL -A "$ua" -o "$out" -w "%{http_code}" "$url"
}

word_count() {
  python3 -c "
import re, sys
html = open('$1', encoding='utf-8').read()
html = re.sub(r'<script.*?</script>', ' ', html, flags=re.S)
html = re.sub(r'<style.*?</style>', ' ', html, flags=re.S)
text = re.sub(r'<[^>]+>', ' ', html)
text = re.sub(r'\s+', ' ', text).strip()
print(len(text.split()))
"
}

check_page() {
  local label="$1" url="$2" hero="$3"
  shift 3
  local out="$TMP_DIR/$label.html"
  local status
  status=$(fetch "$url" "$UA_DEFAULT" "$out")

  echo "--- $label ($url) ---"
  echo "status: $status"

  local ok=1
  grep -q -- "$hero" "$out" || { echo "MISSING hero: $hero"; ok=0; }
  for term in "$@"; do
    grep -qi -- "$term" "$out" || { echo "MISSING: $term"; ok=0; }
  done
  grep -q "faq-a-in" "$out" || { echo "MISSING: faq-a-in (FAQ answer container)"; ok=0; }

  local words
  words=$(word_count "$out")
  echo "words: $words"
  [[ "$words" -ge 500 ]] || { echo "WORD COUNT TOO LOW (< 500)"; ok=0; }

  if [[ "$ok" -eq 1 ]]; then
    echo "RESULT: PASS"
  else
    echo "RESULT: FAIL"
    FAILED=1
  fi
  echo
}

FAILED=0
CASES=('data-live="cashflow"' 'data-live="floory"' 'data-live="label"' 'data-live="agent"' 'data-live="jarvis"')

check_page "he-root" "$BASE/" "צוות ה-AI שאין" "${CASES[@]}"
check_page "en" "$BASE/en" "The AI team your" "${CASES[@]}"

if [[ "$FAILED" -eq 1 ]]; then
  echo "One or more pages failed the no-JS content check."
  exit 1
fi
echo "All pages pass the no-JS content check."
