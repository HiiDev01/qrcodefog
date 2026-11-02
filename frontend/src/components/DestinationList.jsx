import * as Icons from 'lucide-react';
import { DESTINATIONS } from '../utils/destinations.js';

export default function DestinationList({ value, onChange }) {
  return (
    <section className="card">
      <h2 className="card-title"><span className="step">1</span> Destination</h2>
      <div className="dest-list">
        {DESTINATIONS.map((d) => {
          const Icon = Icons[d.icon];
          return (
            <button key={d.id} className={`dest ${value === d.id ? 'active' : ''}`} onClick={() => onChange(d.id)}>
              <Icon size={18} /> {d.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
