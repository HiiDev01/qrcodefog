import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useBilling } from '../../contexts/BillingContext.jsx';
import ManageBillingButton from '../billing/ManageBillingButton.jsx';

export default function PlanBanner() {
  const [params] = useSearchParams();
  const { plan, limits, usage, subscription, refresh } = useBilling();
  const justPaid = params.get('billing') === 'success';

  // The webhook may land a moment after the redirect, so re-check a couple of times.
  useEffect(() => {
    if (!justPaid) return undefined;
    refresh();
    const timers = [3000, 8000].map((ms) => setTimeout(refresh, ms));
    return () => timers.forEach(clearTimeout);
  }, [justPaid, refresh]);

  const ends = subscription?.cancelAtPeriodEnd && subscription.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : null;
  const parts = [
    usage && `${usage.saved} of ${limits.maxSaved} saved QR codes`,
    usage && limits.maxDynamic > 0 && `${usage.dynamic} of ${limits.maxDynamic} dynamic`,
    ends && `ends on ${ends}`,
  ].filter(Boolean);

  return (
    <div className="card plan-banner">
      {justPaid && (
        <p className="alert alert-ok">{plan === 'free' ? 'Payment received. Confirming your plan…' : 'Your plan is active. Thank you!'}</p>
      )}
      <div className="plan-row">
        <div>
          <strong className="cap">{plan} plan</strong>
          <p className="muted small">{parts.join(' · ')}</p>
        </div>
        {plan === 'free' ? <Link className="btn primary sm" to="/pricing">Upgrade</Link> : <ManageBillingButton />}
      </div>
    </div>
  );
}
