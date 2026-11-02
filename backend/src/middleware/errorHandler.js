import { ZodError } from 'zod';

export function notFound(_req, res) { res.status(404).json({ error: 'Not found.' }); }

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues[0]?.message || 'Invalid input.', issues: err.issues });
  }
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ error: status === 500 ? 'Something went wrong.' : err.message });
}
