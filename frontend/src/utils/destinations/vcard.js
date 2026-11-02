import { EMAIL_RE, PHONE_RE, normalizeUrl, validUrl } from './shared.js';

const esc = (s) => s.trim().replace(/([\\;,])/g, '\\$1').replace(/\n/g, '\\n');

export default {
  id: 'vcard', label: 'VCard', icon: 'Contact',
  initial: { name: '', phone: '', email: '', company: '', website: '', address: '' },
  fields: [
    { name: 'name', label: 'Full name', placeholder: 'Ada Okafor' },
    { name: 'phone', label: 'Phone number', placeholder: '+234 800 000 0000' },
    { name: 'email', label: 'Email', placeholder: 'ada@example.com' },
    { name: 'company', label: 'Company', placeholder: 'Acme Ltd' },
    { name: 'website', label: 'Website', placeholder: 'https://acme.com' },
    { name: 'address', label: 'Address', placeholder: 'Street, City, Country' },
  ],
  validate: (d) => ({
    ...(!d.name.trim() ? { name: 'Enter a full name.' } : {}),
    ...(d.phone.trim() && !PHONE_RE.test(d.phone.trim()) ? { phone: 'Enter a valid phone number.' } : {}),
    ...(d.email.trim() && !EMAIL_RE.test(d.email.trim()) ? { email: 'Enter a valid email.' } : {}),
    ...(d.website.trim() && !validUrl(d.website) ? { website: 'Enter a valid website URL.' } : {}),
    ...(!d.phone.trim() && !d.email.trim() ? { phone: 'Add a phone number or an email.' } : {}),
  }),
  build: (d) => ['BEGIN:VCARD', 'VERSION:3.0', `FN:${esc(d.name)}`,
    d.company.trim() && `ORG:${esc(d.company)}`,
    d.phone.trim() && `TEL:${d.phone.trim()}`,
    d.email.trim() && `EMAIL:${d.email.trim()}`,
    d.website.trim() && `URL:${normalizeUrl(d.website)}`,
    d.address.trim() && `ADR:;;${esc(d.address)};;;;`,
    'END:VCARD'].filter(Boolean).join('\n'),
};
