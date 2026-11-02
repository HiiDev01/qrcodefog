import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function ForgotPassword() {
  const { sendReset } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(''); setNotice(''); setBusy(true);
    const { error } = await sendReset(email.trim());
    setBusy(false);
    if (error) setError(error.message);
    else setNotice('If that email has an account, a reset link is on its way.');
  }

  return (
    <AuthCard title="Reset your password" subtitle="We'll email you a reset link." error={error} notice={notice}
      footer={<Link to="/login">Back to log in</Link>}>
      <form className="form" onSubmit={submit}>
        <div className="field"><label htmlFor="email">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <button className="btn primary block" disabled={busy}>{busy ? 'Sending…' : 'Send reset link'}</button>
      </form>
    </AuthCard>
  );
}
