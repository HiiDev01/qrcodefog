import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api.js';

const PAGE = 20;

// Search, type filter, pagination and local edits for the dashboard list.
export default function useQrList(notify) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async (offset = 0) => {
    const params = { limit: PAGE, offset, ...(q.trim() && { q: q.trim() }), ...(type && { type }) };
    const res = await api.listQr(params);
    setItems((prev) => (offset ? [...prev, ...res.items] : res.items));
    setTotal(res.total);
  }, [q, type]);

  // Debounced so typing in the search box does not fire a request per keystroke.
  useEffect(() => {
    setLoading(true); setError('');
    const t = setTimeout(() => load(0).catch((e) => setError(e.message)).finally(() => setLoading(false)), 250);
    return () => clearTimeout(t);
  }, [load]);

  return {
    items, total, q, setQ, type, setType, loading, error,
    hasMore: items.length < total,
    loadMore: () => load(items.length).catch((e) => notify(e.message, 'error')),
    updateItem: (u) => setItems((list) => list.map((x) => (x.id === u.id ? u : x))),
    removeItem: (id) => { setItems((list) => list.filter((x) => x.id !== id)); setTotal((t) => t - 1); },
  };
}
