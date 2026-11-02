import { z } from 'zod';

export const TYPES = ['url', 'email', 'vcard', 'message', 'phone', 'wifi', 'crypto', 'text'];
const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Colors must look like #1a2b3c.');
const pattern = z.enum(['square', 'dots', 'rounded']);
const title = z.string().trim().min(1, 'Enter a title.').max(100);
const logoUrl = z.string().url().max(500).nullable();

export const saveSchema = z.object({
  title,
  destinationType: z.enum(TYPES),
  content: z.string().min(1, 'Nothing to encode.').max(2048),
  qrType: z.enum(['static', 'dynamic']).default('static'),
  foreground: hex.default('#111111'),
  background: hex.default('#ffffff'),
  pattern: pattern.default('square'),
  logoUrl: logoUrl.optional(),
});

export const updateSchema = z.object({
  title: title.optional(),
  foreground: hex.optional(),
  background: hex.optional(),
  pattern: pattern.optional(),
  logoUrl: logoUrl.optional(),
}).strict();

export const destinationSchema = z.object({ url: z.string().trim().min(1, 'Enter a URL.').max(2048) });

export const listSchema = z.object({
  q: z.string().trim().max(100).optional(),
  type: z.enum(TYPES).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export const idSchema = z.string().uuid('Invalid QR code id.');
