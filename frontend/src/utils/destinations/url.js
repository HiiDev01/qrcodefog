import { normalizeUrl, validUrl } from './shared.js';

export default {
  id: 'url', label: 'Website URL', icon: 'Link',
  initial: { url: '' },
  fields: [{ name: 'url', label: 'Website URL', placeholder: 'https://example.com' }],
  validate: (d) => (!d.url.trim() ? { url: 'Enter a website URL.' }
    : !validUrl(d.url) ? { url: 'Enter a valid URL, e.g. https://example.com' } : {}),
  build: (d) => normalizeUrl(d.url),
};
