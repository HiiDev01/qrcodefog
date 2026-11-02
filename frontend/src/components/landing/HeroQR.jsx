import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { buildOptions } from '../../utils/qrOptions.js';

// A real, scannable code: it opens the generator.
export default function HeroQR() {
  const ref = useRef();
  useEffect(() => {
    const style = { pattern: 'rounded', fg: '#12863d', bg: '#ffffff', logo: null, logoSize: 20 };
    const inst = new QRCodeStyling(buildOptions(`${window.location.origin}/generator`, style, 520));
    ref.current.innerHTML = '';
    inst.append(ref.current);
  }, []);
  return (
    <div className="card hero-qr">
      <div ref={ref} className="hero-qr-canvas" />
      <p className="muted small">Scan me. It opens the generator.</p>
    </div>
  );
}
