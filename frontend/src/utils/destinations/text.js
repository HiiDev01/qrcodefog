export default {
  id: 'text', label: 'Plain Text', icon: 'Type',
  initial: { text: '' },
  fields: [{ name: 'text', label: 'Text', type: 'textarea', placeholder: 'Enter any text…' }],
  validate: (d) => (!d.text.trim() ? { text: 'Enter some text.' }
    : d.text.length > 1000 ? { text: 'Keep text under 1000 characters.' } : {}),
  build: (d) => d.text,
};
