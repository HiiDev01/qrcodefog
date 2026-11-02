import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ScanLine, CalendarDays, Activity } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import ScanChart from '../components/ScanChart.jsx';
import QRThumb from '../components/QRThumb.jsx';
import { api } from '../services/api.js';

export default function QRAnalytics() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setData(null); setError('');
    api.qrAnalytics(id).then(setData).catch((e) => setError(e.message));
  }, [id]);

  const back = <Link to="/dashboard" className="small-link back"><ArrowLeft size={14} /> Back to dashboard</Link>;
  if (error) return <div className="dash">{back}<p className="alert alert-error">{error}</p></div>;
  if (!data) return <p className="center-note">Loading…</p>;

  const { qr } = data;
  const when = (iso) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  const total30 = data.series.reduce((n, d) => n + d.count, 0);

  return (
    <div className="dash">
      {back}
      <div className="dash-head">
        <div className="row"><QRThumb qr={qr} size={72} /><div><h1>{qr.title}</h1><p className="muted ellipsis">{qr.original_url}</p></div></div>
      </div>

      <div className="stats">
        <StatCard icon={ScanLine} label="Total scans" value={data.totalScans} />
        <StatCard icon={Activity} label="Scans today" value={data.scansToday} />
        <StatCard icon={CalendarDays} label="Created" value={new Date(data.createdAt).toLocaleDateString()} />
      </div>

      <section className="card">
        <h2 className="section-title">Scans, last 30 days</h2>
        <ScanChart series={data.series} />
        {total30 === 0 && <p className="muted small">No scans yet. Scan your QR code to see activity here.</p>}
      </section>

      <section className="card">
        <h2 className="section-title">Recent scans</h2>
        {data.recent.length === 0 ? <p className="muted small">Nothing recorded yet.</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Time</th><th>Device</th></tr></thead>
              <tbody>
                {data.recent.map((s, i) => (
                  <tr key={i}><td>{when(s.scanned_at)}</td><td className="cap">{s.device_type || 'other'}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="muted small">Only the time and a coarse device type are recorded. No IP address or location.</p>
      </section>
    </div>
  );
}
