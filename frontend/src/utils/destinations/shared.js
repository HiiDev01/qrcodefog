export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^\+?[0-9\s\-().]{6,20}$/;
export const cleanPhone = (v) => v.replace(/[\s\-().]/g, '');

export function normalizeUrl(value) {
  const v = value.trim();
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(v) ? v : `https://${v}`;
}

export function validUrl(value) {
  try {
    const u = new URL(normalizeUrl(value));
    return ['http:', 'https:'].includes(u.protocol) &&
      (u.hostname.includes('.') || u.hostname === 'localhost');
  } catch { return false; }
}
