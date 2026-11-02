import { idSchema } from '../validators/qr.js';
import { tzSchema } from '../validators/analytics.js';
import { getOverview, getQrAnalytics } from '../services/analyticsService.js';

export async function overview(req, res) {
  res.json(await getOverview(req.user.id));
}

export async function qrAnalytics(req, res) {
  const id = idSchema.parse(req.params.qrId);
  const { tzOffset } = tzSchema.parse(req.query);
  res.json(await getQrAnalytics(req.user.id, id, tzOffset));
}
