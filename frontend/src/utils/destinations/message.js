import { PHONE_RE, cleanPhone } from './shared.js';

export default {
  id: 'message', label: 'Message', icon: 'MessageSquare',
  initial: { phone: '', message: '' },
  fields: [
    { name: 'phone', label: 'Send to (optional, opens SMS)', placeholder: '+234 800 000 0000' },
    { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Type your message…' },
  ],
  validate: (d) => ({
    ...(!d.message.trim() ? { message: 'Enter a message.' } : {}),
    ...(d.phone.trim() && !PHONE_RE.test(d.phone.trim()) ? { phone: 'Enter a valid phone number.' } : {}),
  }),
  build: (d) => (d.phone.trim() ? `SMSTO:${cleanPhone(d.phone)}:${d.message.trim()}` : d.message.trim()),
};
