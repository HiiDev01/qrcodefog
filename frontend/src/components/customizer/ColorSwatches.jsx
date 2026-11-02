export default function ColorSwatches({ colors, value, onChange, allowCustom = true }) {
  return (
    <div className="swatches">
      {colors.map(([name, hex]) => (
        <button key={hex} title={name} aria-label={name}
          className={`swatch ${value.toLowerCase() === hex ? 'active' : ''}`}
          style={{ background: hex }} onClick={() => onChange(hex)} />
      ))}
      {allowCustom && <label className="swatch custom" title="Custom color">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>}
    </div>
  );
}
