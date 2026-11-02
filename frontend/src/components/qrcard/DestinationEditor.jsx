import { Check, X } from 'lucide-react';

export default function DestinationEditor({ value, onChange, onSave, onCancel, busy }) {
  return (
    <div className="row edit-row">
      <input value={value} onChange={(e) => onChange(e.target.value)} aria-label="New destination URL" />
      <button className="icon-btn" onClick={onSave} disabled={busy} aria-label="Save"><Check size={16} /></button>
      <button className="icon-btn" onClick={onCancel} aria-label="Cancel"><X size={16} /></button>
    </div>
  );
}
