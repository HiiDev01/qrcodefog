export default function DestinationForm({ destination, values, errors, onChange }) {
  return (
    <div className="form">
      {destination.fields.map((f) => {
        const id = `${destination.id}-${f.name}`;
        const err = errors[f.name];
        if (f.type === 'checkbox') {
          return (
            <label key={f.name} className="check">
              <input type="checkbox" checked={values[f.name]} onChange={(e) => onChange(f.name, e.target.checked)} />
              {f.label}
            </label>
          );
        }
        return (
          <div key={f.name} className="field">
            <label htmlFor={id}>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea id={id} rows={4} value={values[f.name]} placeholder={f.placeholder}
                onChange={(e) => onChange(f.name, e.target.value)} />
            ) : f.type === 'select' ? (
              <select id={id} value={values[f.name]} onChange={(e) => onChange(f.name, e.target.value)}>
                {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            ) : (
              <input id={id} value={values[f.name]} placeholder={f.placeholder}
                onChange={(e) => onChange(f.name, e.target.value)} />
            )}
            {err && values[f.name] !== '' && <small className="err">{err}</small>}
          </div>
        );
      })}
    </div>
  );
}
