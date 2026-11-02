import { Link } from 'react-router-dom';
import PlanBanner from '../components/dashboard/PlanBanner.jsx';
import StatsRow from '../components/dashboard/StatsRow.jsx';
import RecentStrip from '../components/dashboard/RecentStrip.jsx';
import DashboardToolbar from '../components/dashboard/DashboardToolbar.jsx';
import QRCard from '../components/QRCard.jsx';
import useDashboardStats from '../hooks/useDashboardStats.js';
import useQrList from '../hooks/useQrList.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useToast, ToastHost } from '../hooks/useToast.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [toast, notify] = useToast();
  const { stats, reload } = useDashboardStats();
  const list = useQrList(notify);
  const name = user.user_metadata?.full_name?.split(' ')[0] || 'there';
  const filtered = Boolean(list.q || list.type);

  return (
    <div className="dash">
      <div className="dash-head">
        <div><h1>Hi, {name}</h1><p className="muted">Manage your QR codes and see how they perform.</p></div>
        <Link to="/generator" className="btn primary">New QR code</Link>
      </div>

      <PlanBanner />
      <StatsRow stats={stats} />
      <RecentStrip items={stats?.recent} />

      <section>
        <h2 className="section-title">Your QR codes</h2>
        <DashboardToolbar q={list.q} setQ={list.setQ} type={list.type} setType={list.setType} />

        {list.error && <p className="alert alert-error">{list.error}</p>}
        {list.loading && !list.items.length && <p className="center-note">Loading…</p>}
        {!list.loading && !list.error && !list.items.length && (
          <div className="card empty-state">
            <p>{filtered ? 'No QR codes match your search.' : 'You have not saved any QR codes yet.'}</p>
            {!filtered && <Link to="/generator" className="btn primary">Create your first QR code</Link>}
          </div>
        )}

        <div className="qr-list">
          {list.items.map((qr) => (
            <QRCard key={qr.id} qr={qr} notify={notify} onChanged={list.updateItem}
              onDeleted={(id) => { list.removeItem(id); reload(); }} />
          ))}
        </div>
        {list.hasMore && <button className="btn ghost block" onClick={list.loadMore}>Load more</button>}
      </section>
      <ToastHost toast={toast} />
    </div>
  );
}
