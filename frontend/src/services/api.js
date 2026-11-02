import { supabase } from '../lib/supabase.js';

const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace(/\/$/, '');

async function request(path, { method = 'GET', body } = {}) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Cannot reach the server. Is the backend running?');
  }
  if (res.status === 204) return null;
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || 'Request failed.');
  return json;
}

export const api = {
  saveQr: (body) => request('/api/qr/save', { method: 'POST', body }),
  listQr: (params = {}) => request(`/api/qr?${new URLSearchParams(params)}`),
  getQr: (id) => request(`/api/qr/${id}`),
  updateQr: (id, body) => request(`/api/qr/${id}`, { method: 'PUT', body }),
  updateDestination: (id, url) => request(`/api/qr/${id}/destination`, { method: 'PUT', body: { url } }),
  overview: () => request('/api/analytics/overview'),
  qrAnalytics: (id) => request(`/api/analytics/${id}?tzOffset=${new Date().getTimezoneOffset()}`),
  billingStatus: () => request('/api/billing/status'),
  checkout: (plan) => request('/api/billing/checkout', { method: 'POST', body: { plan } }),
  portal: () => request('/api/billing/portal', { method: 'POST' }),
  deleteQr: (id) => request(`/api/qr/${id}`, { method: 'DELETE' }),
};
