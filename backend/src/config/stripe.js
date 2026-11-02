import 'dotenv/config';
import Stripe from 'stripe';
import { AppError } from '../utils/AppError.js';

export const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
export const priceIds = () => ({ pro: process.env.STRIPE_PRICE_PRO, business: process.env.STRIPE_PRICE_BUSINESS });
export const billingEnabled = () => Boolean(stripe && priceIds().pro && priceIds().business);

// The app runs without Stripe configured; billing routes just answer 503.
export function requireStripe() {
  if (!billingEnabled()) throw new AppError(503, 'Billing is not configured on this server yet.');
  return stripe;
}
