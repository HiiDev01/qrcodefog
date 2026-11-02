import { Link } from 'react-router-dom';
import { Save } from 'lucide-react';

export default function SavePanel({ user, title, setTitle, onSave, saving, disabled, isDynamic, savedUrl }) {
  if (!user) {
    return (
      <div className="save-panel">
        <p className="muted small">Want to save this or make it dynamic?</p>
        <Link className="btn ghost block" to="/login" state={{ from: '/generator' }}>Log in to save</Link>
      </div>
    );
  }
  return (
    <div className="save-panel">
      <div className="field">
        <label htmlFor="qr-title">Title</label>
        <input id="qr-title" value={title} maxLength={100} placeholder="e.g. Shop menu"
          onChange={(e) => setTitle(e.target.value)} />
      </div>
      <button className="btn ghost block" onClick={onSave} disabled={disabled || saving}>
        <Save size={18} /> {saving ? 'Saving…' : isDynamic ? 'Save dynamic QR' : 'Save to my account'}
      </button>
      {savedUrl && <p className="muted small">Encodes <strong>{savedUrl}</strong></p>}
    </div>
  );
}
