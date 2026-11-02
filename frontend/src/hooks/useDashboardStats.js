import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function useDashboardStats() {
  const [stats, setStats] = useState(null);
  const reload = useCallback(() => api.overview().then(setStats).catch(() => {}), []);
  useEffect(() => { reload(); }, [reload]);
  return { stats, reload };
}
