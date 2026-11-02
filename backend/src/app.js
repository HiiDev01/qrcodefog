import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.js';
import qrRoutes from './routes/qr.js';
import analyticsRoutes from './routes/analytics.js';
import redirectRoutes from './routes/redirect.js';
import billingRoutes from './routes/billing.js';
import { handleWebhook } from './controllers/billingController.js';
import { asyncHandler } from './utils/asyncHandler.js';
import { apiLimiter, redirectLimiter } from './middleware/rateLimit.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
app.set('trust proxy', 1); // Render/Railway sit behind a proxy
app.use(helmet());
// Stripe signs the raw request body, so this route must be registered before express.json().
app.post('/api/billing/webhook', express.raw({ type: 'application/json' }), asyncHandler(handleWebhook));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '100kb' }));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/r', redirectLimiter, redirectRoutes);
app.use('/api', apiLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/billing', billingRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
