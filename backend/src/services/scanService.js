import { supabaseAdmin as db } from '../config/supabase.js';
import { OWN_HOST } from '../config/env.js';
import { safeRedirectUrl } from '../utils/url.js';
import { deviceType } from '../utils/device.js';

const CODE_RE = /^[A-Za-z0-9]{6,12}$/;

// Returns { qrId, target } for an active dynamic code, or null.
export async function findRedirectTarget(shortCode) {
  if (!CODE_RE.test(shortCode)) return null;
  const { data, error } = await db.from('qr_codes')
    .select('id, original_url, qr_type').eq('short_code', shortCode).maybeSingle();
  if (error) throw error;
  if (data?.qr_type !== 'dynamic') return null;
  const target = safeRedirectUrl(data.original_url, OWN_HOST); // re-checked at redirect time
  return target ? { qrId: data.id, target } : null;
}

// Fire and forget so a slow insert never delays the visitor's redirect.
export function recordScan(qrId, userAgent) {
  db.from('qr_scans').insert({ qr_code_id: qrId, device_type: deviceType(userAgent) })
    .then(({ error }) => { if (error) console.error('scan insert failed:', error.message); });
}
