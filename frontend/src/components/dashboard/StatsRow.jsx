import { QrCode, ScanLine, Link2 } from 'lucide-react';
import StatCard from '../StatCard.jsx';

export default function StatsRow({ stats }) {
  return (
    <div className="stats">
      <StatCard icon={QrCode} label="Total QR codes" value={stats?.totalQr} />
      <StatCard icon={ScanLine} label="Total scans" value={stats?.totalScans} />
      <StatCard icon={Link2} label="Active dynamic QR codes" value={stats?.activeDynamic} />
    </div>
  );
}
