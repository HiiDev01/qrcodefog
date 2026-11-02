
import { Link } from 'react-router-dom';
import HeroQR from './HeroQR.jsx';

export default function Hero() {
  return (
    <section className="hero-compact">

      <div className="hero-compact-grid"></div>

      <div className="hero-compact-inner">

        <div className="hero-compact-content">

          <div className="hero-tag">
            <span className="hero-pulse"></span>
            SMART QR CODE PLATFORM
          </div>

          <h1>
            Create smarter.
            <br />
            <span>Connect faster.</span>
          </h1>

          <p>
            Create beautiful branded QR codes, manage your
            digital experiences, and track every scan from
            one powerful platform.
          </p>

          <div className="hero-compact-actions">
            <Link to="/generator" className="hero-compact-primary">
              Create QR Code <span>↗</span>
            </Link>

            <Link to="/pricing" className="hero-compact-secondary">
              View pricing
            </Link>
          </div>

          <div className="hero-compact-features">
            <span>✓ Dynamic QR codes</span>
            <span>✓ Custom branding</span>
            <span>✓ Scan analytics</span>
          </div>

        </div>

        <div className="hero-compact-visual">

          <div className="compact-glow"></div>

          <div className="compact-preview">

            <div className="compact-preview-header">
              <div className="compact-dots">
                <i></i><i></i><i></i>
              </div>
              <span>QR STUDIO</span>
              <span className="compact-live">● LIVE</span>
            </div>

            <div className="compact-preview-content">

              <div className="compact-preview-title">
                <div>
                  <small>YOUR QR EXPERIENCE</small>
                  <h3>Brand Preview</h3>
                </div>
                <span>✦</span>
              </div>

              <div className="compact-qr">
                <HeroQR />
              </div>

              <div className="compact-preview-footer">
                <span>✓ Ready to scan</span>
                <span>Dynamic QR</span>
              </div>

            </div>
          </div>

          <div className="compact-floating">
            <span>↗</span>
            <div>
              <strong>Track every scan</strong>
              <small>Powerful analytics</small>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
