import { PUBLIC_BASE_URL } from '../config/env.js';

// Database row -> API response (adds the short URL and flattens the scan count).
export function toApi(row) {
  const { qr_scans, ...rest } = row;
  return {
    ...rest,
    short_url: row.short_code ? `${PUBLIC_BASE_URL}/r/${row.short_code}` : null,
    ...(qr_scans ? { total_scans: qr_scans[0]?.count ?? 0 } : {}),
  };
}
