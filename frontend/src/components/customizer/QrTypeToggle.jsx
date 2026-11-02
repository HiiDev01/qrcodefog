export default function QrTypeToggle({ qrType, setQrType, dynamicAllowed, dynamicReason }) {
  return (
    <>
      <div className="seg">
        <button className={qrType === 'static' ? 'active' : ''} onClick={() => setQrType('static')}>Static</button>
        <button className={qrType === 'dynamic' ? 'active' : ''} disabled={!dynamicAllowed}
          title={dynamicReason} onClick={() => setQrType('dynamic')}>Dynamic</button>
      </div>
      {qrType === 'dynamic' && (
        <p className="muted small">Dynamic codes point to a short link, so you can change the website later without reprinting.</p>
      )}
      {!dynamicAllowed && <p className="muted small">{dynamicReason}</p>}
    </>
  );
}
