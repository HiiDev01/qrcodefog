// Simple SVG bar chart: one bar per day.
export default function ScanChart({ series }) {
  const W = 600, H = 180, PAD = 4;
  const max = Math.max(1, ...series.map((d) => d.count));
  const bw = W / series.length;
  const fmt = (d) => new Date(`${d}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H + 20}`} role="img" aria-label="Scans per day, last 30 days">
        <line x1="0" y1={H} x2={W} y2={H} className="axis" />
        {series.map((d, i) => {
          const h = (d.count / max) * (H - PAD * 4);
          return (
            <rect key={d.date} className="bar" x={i * bw + 2} width={Math.max(bw - 4, 1)} rx="2"
              y={H - h} height={Math.max(h, d.count ? 2 : 0)}>
              <title>{`${fmt(d.date)}: ${d.count} scan${d.count === 1 ? '' : 's'}`}</title>
            </rect>
          );
        })}
        <text x="0" y={H + 15} className="axis-label">{fmt(series[0].date)}</text>
        <text x={W} y={H + 15} textAnchor="end" className="axis-label">{fmt(series[series.length - 1].date)}</text>
        <text x={W} y="12" textAnchor="end" className="axis-label">max {max}/day</text>
      </svg>
    </div>
  );
}
