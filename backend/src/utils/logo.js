import { AppError } from './AppError.js';

export const LOGO_BUCKET = 'qr-logos';
const base = () => `${process.env.SUPABASE_URL}/storage/v1/object/public/${LOGO_BUCKET}/`;

export const logoPrefix = (userId) => `${base()}${userId}/`;
export const logoStoragePath = (url) => url.slice(base().length); // "<userId>/<file>"

// A logo URL must point into the caller's own storage folder, never an arbitrary site.
export function assertOwnLogo(url, userId) {
  if (url && !url.startsWith(logoPrefix(userId))) throw new AppError(400, 'Invalid logo.');
}
