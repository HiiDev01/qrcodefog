import { supabaseAdmin } from '../config/supabase.js';
import { AppError } from '../utils/AppError.js';
import { decodeJwt } from '../utils/jwt.js';

// Explains in the SERVER log why a token was rejected. Clients only see a generic message.
function explainRejection(token, error) {
  const payload = decodeJwt(token);
  const expected = `${process.env.SUPABASE_URL.replace(/\/$/, '')}/auth/v1`;
  if (!payload) return 'the Authorization header is not a valid JWT';
  if (payload.iss && payload.iss !== expected) {
    return `token was issued by ${payload.iss} but the backend SUPABASE_URL is ${expected}. Frontend and backend point at different Supabase projects`;
  }
  if (payload.exp && payload.exp * 1000 < Date.now()) return 'token has expired (log out and back in)';
  return `Supabase rejected the token (${error?.message || 'unknown reason'}). Check SUPABASE_SERVICE_ROLE_KEY`;
}

export async function requireAuth(req, _res, next) {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!token) throw new AppError(401, 'Authentication required.');
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data?.user) {
      console.warn(`[auth] 401: ${explainRejection(token, error)}`);
      throw new AppError(401, 'Invalid or expired session.');
    }
    req.user = data.user;
    next();
  } catch (e) { next(e); }
}
