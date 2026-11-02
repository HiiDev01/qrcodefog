import { useState } from 'react';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { downloadQr } from '../../utils/download.js';
import { useBilling } from '../../contexts/BillingContext.jsx';

const SIZES = [256, 500, 1000, 2000];
const FORMATS = [['png', 'PNG'], ['jpeg', 'JPEG'], ['svg', 'SVG']];

export default function DownloadControls({ data, style, size, setSize, format, setFormat, destId, notify }) {
  const [busy, setBusy] = useState(false);
  const { limits } = useBilling();
  const locked = FORMATS.some(([v]) => !limits.formats.includes(v));

  async function download() {
    if (!data) return;
    setBusy(true);
    try {
      const name = `qrforge-${destId}${format === 'svg' ? '' : `-${size}px`}`;
      await downloadQr({ data, style, size, format, name });
      notify(`${format.toUpperCase()} downloaded.`);
    } catch {
      notify('Download failed. Try a smaller resolution or a smaller logo.', 'error');
    } finally { setBusy(false); }
  }

  return (
    <>
      <div className="field">
        <label htmlFor="res">Resolution</label>
        <select id="res" value={size} onChange={(e) => setSize(Number(e.target.value))} disabled={format === 'svg'}>
          {SIZES.map((s) => <option key={s} value={s}>{s} × {s}</option>)}
        </select>
        {format === 'svg' && <small className="muted">SVG is vector and scales to any size.</small>}
      </div>
      <div className="seg">
        {FORMATS.map(([v, l]) => (
          <button key={v} className={format === v ? 'active' : ''} disabled={!limits.formats.includes(v)}
            title={limits.formats.includes(v) ? '' : 'Available on Pro'} onClick={() => setFormat(v)}>{l}</button>
        ))}
      </div>
      {locked && <p className="muted small">JPEG and SVG downloads are on Pro. <Link to="/pricing">See plans</Link></p>}
      <button className="btn primary block" disabled={!data || busy} onClick={download}>
        <Download size={18} /> {busy ? 'Preparing…' : `Download ${format.toUpperCase()}`}
      </button>
    </>
  );
}
