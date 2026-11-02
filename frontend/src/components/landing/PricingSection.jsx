import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PLANS } from '../../utils/plans.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useBilling } from '../../contexts/BillingContext.jsx';
import { api } from '../../services/api.js';
import ManageBillingButton from '../billing/ManageBillingButton.jsx';

export default function PricingSection() {
  const { user } = useAuth();
  const { plan: current, billingEnabled } = useBilling();
  const navigate = useNavigate();
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  async function choose(planId) {
    setError('');
    if (!user) return navigate('/register');
    setBusy(planId);
    try { window.location.href = (await api.checkout(planId)).url; } // hosted Stripe Checkout
    catch (e) { setError(e.message); setBusy(''); }
  }

  function action(p) {
    if (p.id === 'free') return <Link to={p.to} className="btn ghost block">{p.cta}</Link>;
    if (user && current === p.id) return <button className="btn ghost block" disabled>Current plan</button>;
    if (user && current !== 'free') return <ManageBillingButton className="btn ghost block" />;
    return (
      <button className={`btn block ${p.popular ? 'primary' : 'ghost'}`} disabled={busy === p.id} onClick={() => choose(p.id)}>
        {busy === p.id ? 'Redirecting…' : p.cta}
      </button>
    );
  }

  return (
    <section className="lp-section" id="pricing">
      <h2 className="lp-h2">Simple pricing</h2>
      <p className="lp-sub">Start free. Upgrade when you need dynamic codes and analytics.</p>
      <div className="plans">
        {PLANS.map((p) => (
          <div key={p.id} className={`card plan ${p.popular ? 'plan-popular' : ''}`}>
            {p.popular && <span className="badge">Most popular</span>}
            <h3>{p.name}</h3>
            <p className="price">{p.price}<span>{p.period}</span></p>
            <p className="muted small">{p.blurb}</p>
            <ul>{p.features.map((f) => <li key={f}><Check size={16} /> {f}</li>)}</ul>
            {action(p)}
          </div>
        ))}
      </div>
      {error && <p className="alert alert-error center-note-sm" role="alert">{error}</p>}
      {user && !billingEnabled && <p className="muted small center">Payments are not configured on this server yet.</p>}
    </section>
  );
}
