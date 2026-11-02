import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useBilling } from '../contexts/BillingContext.jsx';
import { scanWarning } from '../utils/qrOptions.js';
import { FG_COLORS, BG_COLORS } from '../utils/palettes.js';
import QrTypeToggle from './customizer/QrTypeToggle.jsx';
import PatternPicker from './customizer/PatternPicker.jsx';
import ColorSwatches from './customizer/ColorSwatches.jsx';
import LogoUploader from './customizer/LogoUploader.jsx';

export default function Customizer({ style, setStyle, qrType, setQrType, notify, dynamicAllowed, dynamicReason }) {
  const set = (k) => (v) => setStyle((s) => ({ ...s, [k]: v }));
  const { limits } = useBilling();
  const warning = scanWarning(style.fg, style.bg);

  return (
    <>
      <QrTypeToggle qrType={qrType} setQrType={setQrType} dynamicAllowed={dynamicAllowed} dynamicReason={dynamicReason} />
      <h3 className="sub">Pattern</h3>
      <PatternPicker value={style.pattern} onChange={set('pattern')} />
      <h3 className="sub">QR color</h3>
      <ColorSwatches colors={FG_COLORS} value={style.fg} onChange={set('fg')} allowCustom={limits.advanced} />
      <h3 className="sub">Background</h3>
      <ColorSwatches colors={BG_COLORS} value={style.bg} onChange={set('bg')} allowCustom={limits.advanced} />
      {warning && <p className="warn"><AlertTriangle size={16} /> {warning}</p>}
      <h3 className="sub">Logo</h3>
      <LogoUploader style={style} setStyle={setStyle} notify={notify} locked={!limits.advanced} />
      {!limits.advanced && (
        <p className="muted small">Custom colors and logos are on Pro. <Link to="/pricing">See plans</Link></p>
      )}
    </>
  );
}
