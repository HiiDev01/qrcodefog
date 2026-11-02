import PreviewCanvas from './preview/PreviewCanvas.jsx';
import DownloadControls from './preview/DownloadControls.jsx';

export default function QRPreview({ data, style, size, setSize, format, setFormat, destId, hint, notify, children }) {
  return (
    <section className="card preview-card">
      <h2 className="card-title"><span className="step">3</span> QR Preview</h2>
      <PreviewCanvas data={data} style={style} hint={hint} />
      <DownloadControls data={data} style={style} size={size} setSize={setSize} format={format}
        setFormat={setFormat} destId={destId} notify={notify} />
      {children}
    </section>
  );
}
