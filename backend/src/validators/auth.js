import { z } from 'zod';

const email = z.string().trim().toLowerCase().email('Enter a valid email.');
const password = z.string().min(8, 'Password must be at least 8 characters.').max(72);

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.').max(80),
  email,
  password,
});
export const loginSchema = z.object({ email, password: z.string().min(1, 'Enter your password.') });
