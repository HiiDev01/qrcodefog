import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Copy, BarChart3 } from 'lucide-react';
import QRThumb from './QRThumb.jsx';
import DownloadMenu from './qrcard/DownloadMenu.jsx';
import DestinationEditor from './qrcard/DestinationEditor.jsx';
import { api } from '../services/api.js';
import { getDestination } from '../utils/destinations.js';

export default function QRCard({ qr, onChanged, onDeleted, notify }) {
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(qr.original_url);
  const [busy, setBusy] = useState(false);
  const dynamic = qr.qr_type === 'dynamic';

  async function saveDestination() {
    setBusy(true);
    try {
      const { qr: updated } = await api.updateDestination(qr.id, url);
      onChanged({ ...qr, ...updated });
      setEditing(false);
      notify('Destination updated. The same QR code now goes there.');
    } catch (e) { notify(e.message, 'error'); } finally { setBusy(false); }
  }

  async function remove() {
    if (!window.confirm(`Delete “${qr.title}”? ${dynamic ? 'Its QR code will stop working.' : ''}`)) return;
    try { await api.deleteQr(qr.id); onDeleted(qr.id); notify('QR code deleted.'); }
    catch (e) { notify(e.message, 'error'); }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(qr.short_url); notify('Link copied.'); }
    catch { notify('Could not copy the link.', 'error'); }
  }

  return (
    <article className="card qr-card">
      <QRThumb qr={qr} />
      <div className="qr-main">
        <h3>{qr.title}</h3>
        <div className="chips">
          <span className={`chip ${dynamic ? 'chip-green' : ''}`}>{dynamic ? 'Dynamic' : 'Static'}</span>
          <span className="chip">{getDestination(qr.destination_type)?.label}</span>
          {dynamic && <span className="chip">{qr.total_scans ?? 0} scans</span>}
        </div>
        {qr.destination_type === 'url' && !editing && <p className="muted small ellipsis">{qr.original_url}</p>}
        {editing && (
          <DestinationEditor value={url} onChange={setUrl} onSave={saveDestination} busy={busy}
            onCancel={() => { setEditing(false); setUrl(qr.original_url); }} />
        )}
        <div className="row actions">
          <DownloadMenu qr={qr} notify={notify} />
          {dynamic && <button className="btn ghost sm" onClick={() => setEditing(true)}><Pencil size={14} /> Edit link</button>}
          {dynamic && <button className="btn ghost sm" onClick={copy}><Copy size={14} /> Copy</button>}
          {dynamic && <Link className="btn ghost sm" to={`/dashboard/qr/${qr.id}`}><BarChart3 size={14} /> Analytics</Link>}
          <button className="btn ghost sm danger" onClick={remove}><Trash2 size={14} /> Delete</button>
        </div>
      </div>
    </article>
  );
}
