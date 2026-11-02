import { Link } from 'react-router-dom';
import HeroQR from './HeroQR.jsx';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Create Beautiful QR Codes for Your Business</h1>
        <p>Design branded QR codes with your colors and logo, edit them after printing, and see how many people scan them.</p>
        <div className="row">
          <Link to="/generator" className="btn primary lg">Generate QR Code</Link>
          <Link to="/pricing" className="btn ghost lg">See pricing</Link>
        </div>
      </div>
      <HeroQR />
    </section>
  );
}
