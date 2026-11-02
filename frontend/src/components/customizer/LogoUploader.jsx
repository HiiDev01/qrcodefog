import { useRef } from 'react';
import { Upload, Trash2 } from 'lucide-react';

const ALLOWED = ['image/png', 'image/jpeg', 'image/webp'];

export default function LogoUploader({ style, setStyle, notify, locked = false }) {
  const fileRef = useRef();
  const set = (k, v) => setStyle((s) => ({ ...s, [k]: v }));

  function onFile(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!ALLOWED.includes(file.type)) return notify('Logo must be a PNG, JPEG or WebP image.', 'error');
    if (file.size > 1024 * 1024) return notify('Logo must be under 1 MB.', 'error');
    const reader = new FileReader();
    reader.onload = () => set('logo', reader.result);
    reader.onerror = () => notify('Could not read that image.', 'error');
    reader.readAsDataURL(file);
  }

  return (
    <>
      <input ref={fileRef} type="file" accept={ALLOWED.join(',')} hidden onChange={onFile} />
      <div className="row">
        <button className="btn ghost" disabled={locked} onClick={() => fileRef.current.click()}><Upload size={16} /> Upload logo</button>
        {style.logo && (
          <button className="btn ghost danger" onClick={() => set('logo', null)}><Trash2 size={16} /> Remove</button>
        )}
      </div>
      {style.logo && (
        <div className="field">
          <label htmlFor="logo-size">Logo size: {style.logoSize}%</label>
          <input id="logo-size" type="range" min="10" max="35" value={style.logoSize}
            onChange={(e) => set('logoSize', Number(e.target.value))} />
        </div>
      )}
    </>
  );
}
