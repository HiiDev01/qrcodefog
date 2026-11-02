import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { api } from '../services/api.js';
import { FREE_LIMITS } from '../utils/plans.js';

const BillingContext = createContext(null);
export const useBilling = () => useContext(BillingContext);

export function BillingProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id;
  const [state, setState] = useState(null);

  const refresh = useCallback(async () => {
    if (!userId) { setState(null); return; }
    try { setState(await api.billingStatus()); } catch { /* keep the previous state */ }
  }, [userId]);
  useEffect(() => { refresh(); }, [refresh]);

  const value = {
    plan: state?.plan ?? 'free',
    limits: state?.limits ?? FREE_LIMITS, // guests are on the free plan
    usage: state?.usage ?? null,
    subscription: state?.subscription ?? null,
    billingEnabled: state?.billingEnabled ?? false,
    hasCustomer: state?.hasCustomer ?? false,
    refresh,
  };
  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
}
