const CORNER_SQUARE = { square: 'square', dots: 'dot', rounded: 'extra-rounded' };
const CORNER_DOT = { square: 'square', dots: 'dot', rounded: 'dot' };

export function buildOptions(data, s, size) {
  return {
    width: size,
    height: size,
    type: 'canvas',
    data,
    margin: Math.round(size * 0.04),
    image: s.logo || undefined,
    qrOptions: { errorCorrectionLevel: s.logo ? 'H' : 'M' },
    dotsOptions: { color: s.fg, type: s.pattern },
    backgroundOptions: { color: s.bg },
    cornersSquareOptions: { color: s.fg, type: CORNER_SQUARE[s.pattern] },
    cornersDotOptions: { color: s.fg, type: CORNER_DOT[s.pattern] },
    imageOptions: { hideBackgroundDots: true, imageSize: s.logoSize / 100, margin: 4, crossOrigin: 'anonymous' },
  };
}

function luminance(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Scanners need dark-on-light with enough contrast.
export function scanWarning(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)];
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  if (a > b) return 'Foreground is lighter than the background. Many scanners cannot read inverted codes.';
  if (ratio < 3) return 'Low contrast between colors. This code may be hard to scan.';
  return null;
}
