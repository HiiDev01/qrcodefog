import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Register() {
  const { user, signUp } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  async function submit(e) {
    e.preventDefault();
    setError(''); setNotice('');
    if (form.name.trim().length < 2) return setError('Enter your full name.');
    if (form.password.length < 8) return setError('Password must be at least 8 characters.');
    setBusy(true);
    const { data, error } = await signUp(form.name.trim(), form.email.trim(), form.password);
    setBusy(false);
    if (error) return setError(error.message);
    if (!data.session) setNotice('Check your email to confirm your account, then log in.');
  }

  return (
    <AuthCard title="Create your account" subtitle="Save QR codes and use dynamic QR codes." error={error}
      notice={notice} footer={<>Already registered? <Link to="/login">Log in</Link></>}>
      <form className="form" onSubmit={submit}>
        <div className="field"><label htmlFor="name">Full name</label>
          <input id="name" required autoComplete="name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="field"><label htmlFor="email">Email</label>
          <input id="email" type="email" required autoComplete="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div className="field"><label htmlFor="password">Password</label>
          <input id="password" type="password" required autoComplete="new-password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <button className="btn primary block" disabled={busy}>{busy ? 'Creating…' : 'Create account'}</button>
      </form>
    </AuthCard>
  );
}
