import { supabaseAuth } from '../config/supabase.js';
import { AppError } from '../utils/AppError.js';

export async function registerUser({ fullName, email, password }) {
  const { data, error } = await supabaseAuth.auth.signUp({
    email, password, options: { data: { full_name: fullName } },
  });
  if (error) throw new AppError(400, error.message);
  // No session means email confirmation is required in your Supabase settings.
  return { user: { id: data.user?.id, email }, session: data.session, needsEmailConfirmation: !data.session };
}

export async function loginUser({ email, password }) {
  const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password });
  if (error) throw new AppError(401, 'Incorrect email or password.');
  return { user: { id: data.user.id, email: data.user.email }, session: data.session };
}
