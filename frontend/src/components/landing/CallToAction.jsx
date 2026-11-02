import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <section className="lp-cta">
      <h2>Ready to make your first QR code?</h2>
      <Link to="/generator" className="btn primary lg">Generate QR Code</Link>
    </section>
  );
}
