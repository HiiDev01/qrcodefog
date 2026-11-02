import { EMAIL_RE } from './shared.js';

export default {
  id: 'email', label: 'Email', icon: 'Mail',
  initial: { to: '', subject: '', body: '' },
  fields: [
    { name: 'to', label: 'Email address', placeholder: 'hello@example.com' },
    { name: 'subject', label: 'Subject', placeholder: 'Subject' },
    { name: 'body', label: 'Message (optional)', type: 'textarea', placeholder: 'Write a message…' },
  ],
  validate: (d) => ({
    ...(!EMAIL_RE.test(d.to.trim()) ? { to: 'Enter a valid email address.' } : {}),
    ...(!d.subject.trim() ? { subject: 'Enter a subject.' } : {}),
  }),
  build: (d) => `mailto:${d.to.trim()}?subject=${encodeURIComponent(d.subject.trim())}` +
    (d.body.trim() ? `&body=${encodeURIComponent(d.body.trim())}` : ''),
};
