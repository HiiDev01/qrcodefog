// Turns a saved qr_codes row into what the QR library needs.
export const qrData = (qr) => (qr.qr_type === 'dynamic' ? qr.short_url : qr.original_url);
export const qrStyle = (qr) => ({
  pattern: qr.pattern, fg: qr.foreground_color, bg: qr.background_color, logo: qr.logo_url, logoSize: 20,
});
export const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'qr';
