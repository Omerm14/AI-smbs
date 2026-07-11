/**
 * The Registered mark — printer's registration corners framing a single A.
 * Construction: 100-unit square, corners 12 units in, A spans the middle third.
 * TODO(design): swap in the final SVG from the brand kit. Keep the viewBox.
 */
export function SealDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <symbol id="mark" viewBox="0 0 100 100">
        <path d="M12 30 L12 12 L30 12" />
        <path d="M70 12 L88 12 L88 30" />
        <path d="M88 70 L88 88 L70 88" />
        <path d="M30 88 L12 88 L12 70" />
        <text x="50" y="68" fontSize="52" textAnchor="middle">A</text>
      </symbol>
    </svg>
  );
}

export function Seal({ size = 16, color }: { size?: number; color?: string }) {
  return (
    <svg className="seal" style={{ fontSize: size, color }} aria-hidden>
      <use href="#mark" />
    </svg>
  );
}
