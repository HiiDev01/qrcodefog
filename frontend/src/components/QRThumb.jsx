import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { buildOptions } from '../utils/qrOptions.js';
import { qrData, qrStyle } from '../utils/qrRecord.js';

export default function QRThumb({ qr, size = 96 }) {
  const ref = useRef();
  const key = [qrData(qr), qr.pattern, qr.foreground_color, qr.background_color, qr.logo_url].join('|');
  useEffect(() => {
    const inst = new QRCodeStyling(buildOptions(qrData(qr), qrStyle(qr), size * 2)); // 2x for sharpness
    ref.current.innerHTML = '';
    inst.append(ref.current);
  }, [key, size]); // eslint-disable-line react-hooks/exhaustive-deps
  return <div ref={ref} className="thumb" style={{ width: size, height: size }} />;
}
