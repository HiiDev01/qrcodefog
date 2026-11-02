// Coarse, privacy-safe bucket only. We never store the user agent, IP or location.
export function deviceType(ua = '') {
  if (!ua) return 'other';
  if (/ipad|tablet/i.test(ua)) return 'tablet';
  if (/mobi|android|iphone/i.test(ua)) return 'mobile';
  return 'desktop';
}
