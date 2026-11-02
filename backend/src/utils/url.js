import { IS_PROD } from '../config/env.js';

// Returns a normalized http(s) URL, or null if it is not safe to redirect to.
export function safeRedirectUrl(input, ownHost) {
  let u;
  try { u = new URL(String(input).trim()); } catch { return null; }
  if (!['http:', 'https:'].includes(u.protocol)) return null;   // blocks javascript:, data:, file:
  if (u.username || u.password) return null;
  const local = u.hostname === 'localhost';
  if (!u.hostname.includes('.') && !(local && !IS_PROD)) return null;
  if (ownHost && u.host === ownHost) return null;               // no redirect loops
  return u.toString();
}
