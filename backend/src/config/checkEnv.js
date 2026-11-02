import { decodeJwt } from '../utils/jwt.js';

// Startup sanity checks that catch the most common Supabase setup mistakes.
export function checkSupabaseEnv({ url, anon, service }) {
  const warnings = [];
  let ref = '';
  try { ref = new URL(url).hostname.split('.')[0]; }
  catch { warnings.push('SUPABASE_URL is not a valid URL. It should look like https://xxxx.supabase.co'); }

  if (anon && anon === service) warnings.push('SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are identical. Use the service_role key for the second one.');

  for (const [name, key, role] of [['SUPABASE_ANON_KEY', anon, 'anon'], ['SUPABASE_SERVICE_ROLE_KEY', service, 'service_role']]) {
    const p = decodeJwt(key); // legacy JWT-style keys only; newer sb_ keys are skipped
    if (!p) continue;
    if (p.role !== role) warnings.push(`${name} has role "${p.role}" but should be "${role}". The keys may be swapped.`);
    if (ref && p.ref && p.ref !== ref) warnings.push(`${name} belongs to project "${p.ref}" but SUPABASE_URL points to "${ref}".`);
  }
  return warnings;
}
