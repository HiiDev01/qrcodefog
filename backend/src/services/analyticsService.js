import { supabaseAdmin as db } from '../config/supabase.js';
import { AppError } from '../utils/AppError.js';
import { toApi } from '../utils/qrMapper.js';
import { findOwned } from './qrService.js';

const DAY = 86_400_000;
const countOf = (query) => query.then(({ count, error }) => { if (error) throw error; return count ?? 0; });

export async function getOverview(userId) {
  const [totalQr, activeDynamic, totalScans, recent] = await Promise.all([
    countOf(db.from('qr_codes').select('id', { count: 'exact', head: true }).eq('user_id', userId)),
    countOf(db.from('qr_codes').select('id', { count: 'exact', head: true }).eq('user_id', userId).eq('qr_type', 'dynamic')),
    // Inner join keeps only scans whose QR code belongs to this user.
    countOf(db.from('qr_scans').select('id, qr_codes!inner(user_id)', { count: 'exact', head: true }).eq('qr_codes.user_id', userId)),
    db.from('qr_codes').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
  ]);
  if (recent.error) throw recent.error;
  return { totalQr, activeDynamic, totalScans, recent: recent.data.map(toApi) };
}

export async function getQrAnalytics(userId, id, tzOffset) {
  const qr = await findOwned(userId, id);
  if (qr.qr_type !== 'dynamic') throw new AppError(400, 'Analytics are only available for dynamic QR codes.');

  const now = Date.now();
  const since = new Date(now - 31 * DAY).toISOString();
  const [totalScans, windowRes, recentRes] = await Promise.all([
    countOf(db.from('qr_scans').select('id', { count: 'exact', head: true }).eq('qr_code_id', id)),
    db.from('qr_scans').select('scanned_at').eq('qr_code_id', id).gte('scanned_at', since).limit(10000),
    db.from('qr_scans').select('scanned_at, device_type').eq('qr_code_id', id)
      .order('scanned_at', { ascending: false }).limit(20),
  ]);
  if (windowRes.error) throw windowRes.error;
  if (recentRes.error) throw recentRes.error;

  // Bucket by the viewer's local day.
  const dayKey = (ms) => new Date(ms - tzOffset * 60_000).toISOString().slice(0, 10);
  const days = Array.from({ length: 30 }, (_, i) => dayKey(now - (29 - i) * DAY));
  const counts = Object.fromEntries(days.map((d) => [d, 0]));
  for (const s of windowRes.data) {
    const k = dayKey(new Date(s.scanned_at).getTime());
    if (k in counts) counts[k] += 1;
  }
  const series = days.map((date) => ({ date, count: counts[date] }));

  return {
    qr: toApi(qr), totalScans, scansToday: series[series.length - 1].count,
    series, recent: recentRes.data, createdAt: qr.created_at,
  };
}
