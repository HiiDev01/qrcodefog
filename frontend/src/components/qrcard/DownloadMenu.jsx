import { Download } from 'lucide-react';
import { useBilling } from '../../contexts/BillingContext.jsx';
import { downloadQr } from '../../utils/download.js';
import { qrData, qrStyle, slug } from '../../utils/qrRecord.js';

export default function DownloadMenu({ qr, notify }) {
  const { limits } = useBilling();
  async function download(format, e) {
    e.currentTarget.closest('details')?.removeAttribute('open');
    try {
      await downloadQr({ data: qrData(qr), style: qrStyle(qr), size: 1000, format, name: `qrforge-${slug(qr.title)}` });
    } catch { notify('Download failed.', 'error'); }
  }
  return (
    <details className="menu">
      <summary className="btn ghost sm"><Download size={14} /> Download</summary>
      <div className="menu-list">
        {['png', 'jpeg', 'svg'].filter((f) => limits.formats.includes(f)).map((f) => <button key={f} onClick={(e) => download(f, e)}>{f.toUpperCase()}</button>)}
      </div>
    </details>
  );
}
