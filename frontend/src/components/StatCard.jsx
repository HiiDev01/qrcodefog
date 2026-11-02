export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="card stat">
      <span className="stat-icon"><Icon size={20} /></span>
      <div><div className="stat-value">{value ?? '–'}</div><div className="muted small">{label}</div></div>
    </div>
  );
}
