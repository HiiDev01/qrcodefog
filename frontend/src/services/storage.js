import { supabase } from '../lib/supabase.js';

const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };

// Uploads a data-URL logo to the user's own folder and returns its public URL.
export async function uploadLogo(userId, dataUrl) {
  const blob = await (await fetch(dataUrl)).blob();
  const ext = EXT[blob.type];
  if (!ext || blob.size > 1024 * 1024) throw new Error('Logo must be a PNG, JPEG or WebP under 1 MB.');
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('qr-logos').upload(path, blob, { contentType: blob.type });
  if (error) throw new Error('Could not upload the logo.');
  return supabase.storage.from('qr-logos').getPublicUrl(path).data.publicUrl;
}
