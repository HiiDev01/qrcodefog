import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QrCode } from 'lucide-react';
import { buildOptions } from '../../utils/qrOptions.js';

const PREVIEW_SIZE = 300;

export default function PreviewCanvas({ data, style, hint }) {
  const box = useRef();
  const qr = useRef(null);

  useEffect(() => {
    if (!data) { qr.current = null; if (box.current) box.current.innerHTML = ''; return; }
    const opts = buildOptions(data, style, PREVIEW_SIZE);
    if (!qr.current) {
      qr.current = new QRCodeStyling(opts);
      box.current.innerHTML = '';
      qr.current.append(box.current);
    } else {
      qr.current.update(opts);
    }
  }, [data, style]);

  return (
    <div className="preview">
      <div ref={box} className="qr-box" style={{ display: data ? 'block' : 'none' }} />
      {!data && (
        <div className="empty"><QrCode size={48} /><p>{hint || 'Fill in the details to see your QR code.'}</p></div>
      )}
    </div>
  );
}
