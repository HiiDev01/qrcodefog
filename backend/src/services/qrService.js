import { supabaseAdmin as db } from '../config/supabase.js';
import { OWN_HOST } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { generateShortCode } from '../utils/shortCode.js';
import { safeRedirectUrl } from '../utils/url.js';
import { assertCanCreate } from './planService.js';
import { assertOwnLogo, logoPrefix, logoStoragePath, LOGO_BUCKET } from '../utils/logo.js';

// The service-role client bypasses RLS, so every query here filters by user_id itself.
export async function findOwned(userId, id) {
  const { data, error } = await db.from('qr_codes').select('*').eq('id', id).eq('user_id', userId).maybeSingle();
  if (error) throw error;
  if (!data) throw new AppError(404, 'QR code not found.');
  return data;
}

async function insertWithShortCode(row, dynamic) {
  for (let i = 0; i < 5; i++) {
    const { data, error } = await db.from('qr_codes')
      .insert({ ...row, short_code: dynamic ? generateShortCode() : null }).select().single();
    if (!error) return data;
    if (error.code !== '23505' || !dynamic) throw error; // retry only on a short-code collision
  }
  throw new AppError(500, 'Could not allocate a short code.');
}

export async function createQr(userId, b) {
  const dynamic = b.qrType === 'dynamic';
  let original = b.content;
  if (dynamic) {
    if (b.destinationType !== 'url') throw new AppError(400, 'Dynamic QR codes support website URLs only.');
    original = safeRedirectUrl(b.content, OWN_HOST);
    if (!original) throw new AppError(400, 'Enter a valid http(s) website URL.');
  }
  assertOwnLogo(b.logoUrl, userId);
  await assertCanCreate(userId, { dynamic });
  return insertWithShortCode({
    user_id: userId, title: b.title, destination_type: b.destinationType, original_url: original,
    qr_type: b.qrType, foreground_color: b.foreground, background_color: b.background,
    pattern: b.pattern, logo_url: b.logoUrl ?? null,
  }, dynamic);
}

export async function listQrs(userId, { q, type, limit, offset }) {
  let query = db.from('qr_codes').select('*, qr_scans(count)', { count: 'exact' })
    .eq('user_id', userId).order('created_at', { ascending: false }).range(offset, offset + limit - 1);
  if (type) query = query.eq('destination_type', type);
  if (q) query = query.ilike('title', `%${q.replace(/[%_,]/g, '')}%`);
  const { data, count, error } = await query;
  if (error) throw error;
  return { rows: data, total: count };
}

export async function updateQr(userId, id, b) {
  assertOwnLogo(b.logoUrl, userId);
  const patch = {
    ...(b.title !== undefined && { title: b.title }),
    ...(b.foreground && { foreground_color: b.foreground }),
    ...(b.background && { background_color: b.background }),
    ...(b.pattern && { pattern: b.pattern }),
    ...(b.logoUrl !== undefined && { logo_url: b.logoUrl }),
  };
  if (!Object.keys(patch).length) throw new AppError(400, 'Nothing to update.');
  await findOwned(userId, id);
  const { data, error } = await db.from('qr_codes').update(patch).eq('id', id).eq('user_id', userId).select().single();
  if (error) throw error;
  return data;
}

export async function updateDestination(userId, id, url) {
  const row = await findOwned(userId, id);
  if (row.qr_type !== 'dynamic') throw new AppError(400, 'Only dynamic QR codes can change destination.');
  const safe = safeRedirectUrl(url, OWN_HOST);
  if (!safe) throw new AppError(400, 'Enter a valid http(s) website URL.');
  const { data, error } = await db.from('qr_codes').update({ original_url: safe })
    .eq('id', id).eq('user_id', userId).select().single();
  if (error) throw error;
  return data;
}

export async function deleteQr(userId, id) {
  const row = await findOwned(userId, id);
  const { error } = await db.from('qr_codes').delete().eq('id', id).eq('user_id', userId);
  if (error) throw error;
  if (row.logo_url?.startsWith(logoPrefix(userId))) {
    // Best effort: a leftover file is harmless, so never fail the request over it.
    try { await db.storage.from(LOGO_BUCKET).remove([logoStoragePath(row.logo_url)]); } catch { /* ignore */ }
  }
}
