
import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { buildOptions } from '../../utils/qrOptions.js';

export default function HeroQR() {
  const ref = useRef(null);

  useEffect(() => {
    const style = {
      pattern: 'rounded',
      fg: '#172033',
      bg: '#ffffff',
      logo: null,
      logoSize: 20
    };

    const inst = new QRCodeStyling(
      buildOptions(
        `${window.location.origin}/generator`,
        style,
        520
      )
    );

    ref.current.innerHTML = '';
    inst.append(ref.current);

    return () => {
      if (ref.current) {
        ref.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="card hero-qr">
      <div ref={ref} className="hero-qr-canvas" />
      <p className="muted small">
        Scan me. It opens the generator.
      </p>
    </div>
  );
}
