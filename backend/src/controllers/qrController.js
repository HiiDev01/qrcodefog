import { saveSchema, updateSchema, destinationSchema, listSchema, idSchema } from '../validators/qr.js';
import { toApi } from '../utils/qrMapper.js';
import * as qrService from '../services/qrService.js';

export async function save(req, res) {
  const row = await qrService.createQr(req.user.id, saveSchema.parse(req.body));
  res.status(201).json({ qr: toApi(row) });
}

export async function list(req, res) {
  const { rows, total } = await qrService.listQrs(req.user.id, listSchema.parse(req.query));
  res.json({ items: rows.map(toApi), total });
}

export async function getOne(req, res) {
  const row = await qrService.findOwned(req.user.id, idSchema.parse(req.params.id));
  res.json({ qr: toApi(row) });
}

export async function update(req, res) {
  const row = await qrService.updateQr(req.user.id, idSchema.parse(req.params.id), updateSchema.parse(req.body));
  res.json({ qr: toApi(row) });
}

export async function updateDestination(req, res) {
  const { url } = destinationSchema.parse(req.body);
  const row = await qrService.updateDestination(req.user.id, idSchema.parse(req.params.id), url);
  res.json({ qr: toApi(row) });
}

export async function remove(req, res) {
  await qrService.deleteQr(req.user.id, idSchema.parse(req.params.id));
  res.status(204).end();
}
