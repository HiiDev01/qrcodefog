
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
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

    try {
      window.location.href = (await api.checkout(planId)).url;
    } catch (e) {
      setError(e.message);
      setBusy('');
    }
  }

  function action(p) {
    if (p.id === 'free') {
      return (
        <Link to={p.to} className="pricing-button pricing-button-secondary">
          {p.cta}
          <ArrowRight size={16} />
        </Link>
      );
    }

    if (user && current === p.id) {
      return (
        <button className="pricing-button pricing-button-secondary" disabled>
          Current plan
        </button>
      );
    }

    if (user && current !== 'free') {
      return (
        <ManageBillingButton className="pricing-button pricing-button-secondary" />
      );
    }

    return (
      <button
        className={`pricing-button ${
          p.popular
            ? 'pricing-button-primary'
            : 'pricing-button-secondary'
        }`}
        disabled={busy === p.id}
        onClick={() => choose(p.id)}
      >
        {busy === p.id ? 'Redirecting…' : p.cta}
        {busy !== p.id && <ArrowRight size={16} />}
      </button>
    );
  }

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">

        {/* Heading */}
        <div className="pricing-heading">
          <div className="pricing-eyebrow">
            <span className="pricing-eyebrow-dot" />
            PRICING
          </div>

          <h2>
            Simple plans.
            <br />
            <span>Powerful possibilities.</span>
          </h2>

          <p>
            Start for free and upgrade when you're ready.
            Everything you need to create, manage and grow
            with smarter QR codes.
          </p>
        </div>

        {/* Plans */}
        <div className="pricing-grid">
          {PLANS.map((p) => (
            <article
              key={p.id}
              className={`pricing-card ${
                p.popular ? 'pricing-card-featured' : ''
              }`}
            >
              {p.popular && (
                <div className="pricing-popular-badge">
                  <Sparkles size={13} />
                  MOST POPULAR
                </div>
              )}

              <div className="pricing-card-top">
                <h3>{p.name}</h3>

                <p className="pricing-blurb">
                  {p.blurb}
                </p>

                <div className="pricing-price">
                  <span className="pricing-price-value">
                    {p.price}
                  </span>
                  <span className="pricing-period">
                    {p.period}
                  </span>
                </div>
              </div>

              <div className="pricing-divider" />

              <div className="pricing-features">
                <span className="pricing-features-title">
                  WHAT'S INCLUDED
                </span>

                <ul>
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="pricing-check">
                        <Check size={13} strokeWidth={2.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pricing-card-action">
                {action(p)}
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="pricing-footer">
          <div className="pricing-footer-left">
            <span className="pricing-footer-check">
              <Check size={14} />
            </span>
            No complicated setup. Upgrade whenever you want.
          </div>

          <span className="pricing-footer-right">
            SIMPLE. TRANSPARENT. FLEXIBLE.
          </span>
        </div>

        {error && (
          <p className="pricing-error" role="alert">
            {error}
          </p>
        )}

        {user && !billingEnabled && (
          <p className="pricing-notice">
            Payments are not configured on this server yet.
          </p>
        )}

      </div>
    </section>
  );
}
