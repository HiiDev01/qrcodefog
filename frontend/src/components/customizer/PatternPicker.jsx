import { PATTERNS } from '../../utils/palettes.js';

export default function PatternPicker({ value, onChange }) {
  return (
    <div className="seg">
      {PATTERNS.map(([v, l]) => (
        <button key={v} className={value === v ? 'active' : ''} onClick={() => onChange(v)}>{l}</button>
      ))}
    </div>
  );
}
