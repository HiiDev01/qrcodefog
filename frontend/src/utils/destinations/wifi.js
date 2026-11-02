const esc = (s) => s.replace(/([\\;,:"])/g, '\\$1');

export default {
  id: 'wifi', label: 'WiFi', icon: 'Wifi',
  initial: { ssid: '', password: '', security: 'WPA', hidden: false },
  fields: [
    { name: 'ssid', label: 'Network name (SSID)', placeholder: 'My WiFi' },
    { name: 'password', label: 'Password', placeholder: 'Network password' },
    { name: 'security', label: 'Security', type: 'select',
      options: [['WPA', 'WPA/WPA2/WPA3'], ['WEP', 'WEP'], ['nopass', 'None']] },
    { name: 'hidden', label: 'Hidden network', type: 'checkbox' },
  ],
  validate: (d) => ({
    ...(!d.ssid.trim() ? { ssid: 'Enter the network name.' } : {}),
    ...(d.security !== 'nopass' && !d.password ? { password: 'Enter the password.' } : {}),
  }),
  build: (d) => `WIFI:T:${d.security};S:${esc(d.ssid.trim())};` +
    (d.security !== 'nopass' ? `P:${esc(d.password)};` : '') + (d.hidden ? 'H:true;' : '') + ';',
};
