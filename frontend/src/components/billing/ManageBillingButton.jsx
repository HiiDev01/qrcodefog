import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { api } from '../../services/api.js';

export default function ManageBillingButton({ className = 'btn ghost sm' }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function open() {
    setBusy(true); setError('');
    try { window.location.href = (await api.portal()).url; }
    catch (e) { setError(e.message); setBusy(false); }
  }
  return (
    <>
      <button className={className} onClick={open} disabled={busy}><CreditCard size={14} /> {busy ? 'Opening…' : 'Manage billing'}</button>
      {error && <small className="err">{error}</small>}
    </>
  );
}
