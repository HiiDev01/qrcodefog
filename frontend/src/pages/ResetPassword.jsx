import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function ResetPassword() {
  const { user, loading, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Supabase signs the user in from the emailed link, so a session means the link was valid.
  if (!loading && !user) {
    return (
      <AuthCard title="Link expired" error="This reset link is invalid or has expired."
        footer={<Link to="/forgot-password">Request a new link</Link>} />
    );
  }

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirm) return setError('Passwords do not match.');
    setBusy(true);
    const { error } = await updatePassword(password);
    setBusy(false);
    if (error) setError(error.message);
    else navigate('/dashboard', { replace: true });
  }

  return (
    <AuthCard title="Choose a new password" error={error}>
      <form className="form" onSubmit={submit}>
        <div className="field"><label htmlFor="pw">New password</label>
          <input id="pw" type="password" required autoComplete="new-password" value={password}
            onChange={(e) => setPassword(e.target.value)} /></div>
        <div className="field"><label htmlFor="pw2">Confirm password</label>
          <input id="pw2" type="password" required autoComplete="new-password" value={confirm}
            onChange={(e) => setConfirm(e.target.value)} /></div>
        <button className="btn primary block" disabled={busy}>{busy ? 'Saving…' : 'Update password'}</button>
      </form>
    </AuthCard>
  );
}
