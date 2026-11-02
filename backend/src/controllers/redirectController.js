import { findRedirectTarget, recordScan } from '../services/scanService.js';

export async function redirect(req, res) {
  const hit = await findRedirectTarget(req.params.shortCode);
  if (!hit) return res.status(404).type('text').send('This QR code link is not active.');
  recordScan(hit.qrId, req.get('user-agent'));
  // 302 (not 301) so edited destinations take effect immediately.
  res.set('Cache-Control', 'no-store').redirect(302, hit.target);
}
