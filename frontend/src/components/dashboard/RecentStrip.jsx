import QRThumb from '../QRThumb.jsx';

export default function RecentStrip({ items }) {
  if (!items?.length) return null;
  return (
    <section>
      <h2 className="section-title">Recently created</h2>
      <div className="recent">
        {items.map((r) => (
          <div key={r.id} className="recent-item"><QRThumb qr={r} size={64} /><span className="ellipsis">{r.title}</span></div>
        ))}
      </div>
    </section>
  );
}
