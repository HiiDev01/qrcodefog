import { useEffect, useMemo, useState } from 'react';
import DestinationList from '../components/DestinationList.jsx';
import DestinationForm from '../components/DestinationForm.jsx';
import Customizer from '../components/Customizer.jsx';
import QRPreview from '../components/QRPreview.jsx';
import SavePanel from '../components/SavePanel.jsx';
import { DESTINATIONS, getDestination } from '../utils/destinations.js';
import { useToast, ToastHost } from '../hooks/useToast.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useBilling } from '../contexts/BillingContext.jsx';
import { api } from '../services/api.js';
import { uploadLogo } from '../services/storage.js';

const initialForms = Object.fromEntries(DESTINATIONS.map((d) => [d.id, d.initial]));

export default function Generator() {
  const { user } = useAuth();
  const { limits } = useBilling();
  const [destId, setDestId] = useState('url');
  const [forms, setForms] = useState(initialForms);
  const [style, setStyle] = useState({ pattern: 'square', fg: '#111111', bg: '#ffffff', logo: null, logoSize: 20 });
  const [qrType, setQrType] = useState('static');
  const [size, setSize] = useState(1000);
  const [format, setFormat] = useState('png');
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [dynamicUrl, setDynamicUrl] = useState(null); // short link after a dynamic QR is saved
  const [toast, notify] = useToast();

  const destination = getDestination(destId);
  const values = forms[destId];
  const errors = useMemo(() => destination.validate(values), [destination, values]);
  const firstError = Object.values(errors)[0];
  const payload = firstError ? null : destination.build(values);

  const dynamicAllowed = Boolean(user) && destId === 'url' && limits.maxDynamic > 0;
  const dynamicReason = !user ? 'Log in to use dynamic QR codes.'
    : destId !== 'url' ? 'Dynamic QR codes support website URLs only.'
    : limits.maxDynamic === 0 ? 'Dynamic QR codes are available on Pro and Business. See Pricing.' : '';
  const isDynamic = qrType === 'dynamic' && dynamicAllowed;

  useEffect(() => { if (qrType === 'dynamic' && !dynamicAllowed) setQrType('static'); }, [qrType, dynamicAllowed]);

  // Dynamic codes encode the short link, which only exists after saving.
  const data = isDynamic ? dynamicUrl : payload;
  const hint = isDynamic && payload && !dynamicUrl
    ? 'Click “Save dynamic QR” to create your short link and QR code.' : firstError;

  const onField = (name, value) => {
    setDynamicUrl(null);
    setForms((f) => ({ ...f, [destId]: { ...f[destId], [name]: value } }));
  };
  const onDest = (id) => { setDynamicUrl(null); setDestId(id); };
  const onQrType = (t) => { setDynamicUrl(null); setQrType(t); };

  async function handleSave() {
    if (!payload) return notify('Fix the highlighted details first.', 'error');
    setSaving(true);
    try {
      const logoUrl = style.logo ? await uploadLogo(user.id, style.logo) : null;
      const { qr } = await api.saveQr({
        title: title.trim() || destination.label,
        destinationType: destId,
        content: payload,
        qrType: isDynamic ? 'dynamic' : 'static',
        foreground: style.fg, background: style.bg, pattern: style.pattern, logoUrl,
      });
      if (isDynamic) setDynamicUrl(qr.short_url);
      notify(isDynamic ? 'Dynamic QR created.' : 'Saved to your account.');
    } catch (e) {
      notify(e.message, 'error');
    } finally { setSaving(false); }
  }

  return (
    <div className="workspace">
      <DestinationList value={destId} onChange={onDest} />

      <section className="card">
        <h2 className="card-title"><span className="step">2</span> Customize</h2>
        <DestinationForm destination={destination} values={values} errors={errors} onChange={onField} />
        <hr />
        <Customizer style={style} setStyle={setStyle} qrType={qrType} setQrType={onQrType} notify={notify}
          dynamicAllowed={dynamicAllowed} dynamicReason={dynamicReason} />
      </section>

      <QRPreview data={data} style={style} size={size} setSize={setSize} format={format} setFormat={setFormat}
        destId={destId} hint={hint} notify={notify}>
        <SavePanel user={user} title={title} setTitle={setTitle} onSave={handleSave} saving={saving}
          disabled={!payload} isDynamic={isDynamic} savedUrl={dynamicUrl} />
      </QRPreview>
      <ToastHost toast={toast} />
    </div>
  );
}
