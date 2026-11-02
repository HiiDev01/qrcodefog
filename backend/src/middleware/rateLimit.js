import rateLimit from 'express-rate-limit';

const make = (windowMs, limit, message) =>
  rateLimit({ windowMs, limit, standardHeaders: true, legacyHeaders: false, message: { error: message } });

export const apiLimiter = make(60_000, 120, 'Too many requests. Please slow down.');
export const authLimiter = make(15 * 60_000, 20, 'Too many attempts. Try again in a few minutes.');

// Scans are public traffic, so the limit is generous but still protects the database.
export const redirectLimiter = make(60_000, 300, 'Too many requests.');
