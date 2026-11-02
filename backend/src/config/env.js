import 'dotenv/config';

export const PORT = process.env.PORT || 4000;
// Public URL of THIS API. Dynamic QR codes encode `${PUBLIC_BASE_URL}/r/<code>`.
export const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
export const OWN_HOST = new URL(PUBLIC_BASE_URL).host;
export const IS_PROD = process.env.NODE_ENV === 'production';
export const CLIENT_URL = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');
