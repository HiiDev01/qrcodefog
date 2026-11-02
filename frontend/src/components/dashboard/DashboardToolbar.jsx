import { Search } from 'lucide-react';
import { DESTINATIONS } from '../../utils/destinations.js';

export default function DashboardToolbar({ q, setQ, type, setType }) {
  return (
    <div className="toolbar">
      <div className="search">
        <Search size={16} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title" aria-label="Search QR codes" />
      </div>
      <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type">
        <option value="">All types</option>
        {DESTINATIONS.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
      </select>
    </div>
  );
}
