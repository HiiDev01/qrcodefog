// Placeholder prices: edit freely. Billing is not wired up yet.
export const PLANS = [
  {
    id: 'free', name: 'Free', price: '$0', period: 'forever', blurb: 'For quick, one-off QR codes.',
    features: ['Unlimited static QR generation (fair-use protection applies)', 'Basic colors', 'PNG downloads', 'No account required'],
    cta: 'Generate QR Code', to: '/generator',
  },
  {
    id: 'pro', name: 'Pro', price: '$9', period: '/month', blurb: 'For creators and small teams.', popular: true,
    features: ['Dynamic QR codes', 'Saved QR codes', 'Advanced customization', 'PNG, JPEG and SVG downloads', 'Scan analytics'],
    cta: 'Get Pro', to: '/register',
  },
  {
    id: 'business', name: 'Business', price: '$29', period: '/month', blurb: 'For businesses running many campaigns.',
    features: ['Everything in Pro', 'Higher usage limits', 'More advanced analytics', 'Business-oriented QR management'],
    cta: 'Get Business', to: '/register',
  },
];

export const FAQS = [
  ['Are static QR codes really free?', 'Yes. A static QR code stores your content directly inside the code, so it keeps working forever without an account and without relying on our servers.'],
  ['What is the difference between static and dynamic?', 'A static code encodes the destination itself and cannot be changed. A dynamic code encodes a short QRForge link that redirects to your website, so you can change the destination later without reprinting.'],
  ['Which QR codes can be dynamic?', 'Website URLs. Other types, like WiFi or contact cards, are static because they are read directly by the phone rather than opened as a link.'],
  ['Will my QR code still scan with a logo or custom colors?', 'Usually, yes. Logos use the highest error correction level and we warn you when your colors have too little contrast. Keep the logo small and always test-scan before printing.'],
  ['What happens if I delete a dynamic QR code?', 'Its short link stops working, so any printed copies will no longer redirect. Static codes are unaffected because they never depended on us.'],
  ['What do you record when someone scans?', 'Only the scan time and a coarse device type (mobile, tablet or desktop). We do not store IP addresses, locations or user agents.'],
];

// Used for guests and until the real limits load. Must mirror backend/src/config/plans.js (free).
export const FREE_LIMITS = { maxSaved: 5, maxDynamic: 0, formats: ['png'], advanced: false };
