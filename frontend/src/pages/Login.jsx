import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Login() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from || '/dashboard';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={from} replace />;

  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const { error } = await signIn(form.email.trim(), form.password);
    setBusy(false);
    if (error) setError('Incorrect email or password.');
    else navigate(from, { replace: true });
  }

  return (
    <AuthCard title="Welcome back" subtitle="Log in to manage your QR codes." error={error}
      footer={<>No account? <Link to="/register">Sign up</Link></>}>
      <form className="form" onSubmit={submit}>
        <div className="field"><label htmlFor="email">Email</label>
          <input id="email" type="email" required autoComplete="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div className="field"><label htmlFor="password">Password</label>
          <input id="password" type="password" required autoComplete="current-password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <Link to="/forgot-password" className="small-link">Forgot password?</Link>
        <button className="btn primary block" disabled={busy}>{busy ? 'Logging in…' : 'Log in'}</button>
      </form>
    </AuthCard>
  );
}
