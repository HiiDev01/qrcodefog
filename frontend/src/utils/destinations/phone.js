import { PHONE_RE, cleanPhone } from './shared.js';

export default {
  id: 'phone', label: 'Phone Call', icon: 'Phone',
  initial: { phone: '' },
  fields: [{ name: 'phone', label: 'Phone number', placeholder: '+234 800 000 0000' }],
  validate: (d) => (!PHONE_RE.test(d.phone.trim()) ? { phone: 'Enter a valid phone number.' } : {}),
  build: (d) => `tel:${cleanPhone(d.phone)}`,
};
