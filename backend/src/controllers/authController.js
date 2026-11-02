import { registerSchema, loginSchema } from '../validators/auth.js';
import { registerUser, loginUser } from '../services/authService.js';

export async function register(req, res) {
  res.status(201).json(await registerUser(registerSchema.parse(req.body)));
}

export async function login(req, res) {
  res.json(await loginUser(loginSchema.parse(req.body)));
}

export const me = (req, res) => res.json({ user: { id: req.user.id, email: req.user.email } });
