
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import HeroQR from './HeroQR.jsx';
import '../../styles/Hero.css';

export default function Hero() {
  return (
    <section className="forge-intro">

      <div className="forge-intro-layout">

        <div className="forge-intro-copy">

          <span className="forge-intro-kicker">
            QR CODES, MADE SIMPLE
          </span>

          <h1>
            Better QR codes.
            <br />
            <span>Better connections.</span>
          </h1>

          <p className="forge-intro-description">
            Create branded QR codes, manage your links and
            understand your audience with simple scan analytics.
            Everything you need, in one place.
          </p>

          <div className="forge-intro-actions">
            <Link to="/generator" className="forge-intro-button">
              Create a QR code
              <ArrowUpRight size={17} />
            </Link>

            <Link to="/pricing" className="forge-intro-link">
              Explore pricing
            </Link>
          </div>

          <div className="forge-intro-benefits">
            <span><Check size={15} /> Free to start</span>
            <span><Check size={15} /> No design skills needed</span>
            <span><Check size={15} /> Instant downloads</span>
          </div>

        </div>

        <div className="forge-intro-visual">

          <div className="forge-intro-window">

            <div className="forge-intro-window-header">
              <div className="forge-intro-brand">
                <span className="forge-intro-brand-icon">
                  <ArrowUpRight size={16} />
                </span>
                QRForge Studio
              </div>

              <span className="forge-intro-status">
                <span />
                Ready
              </span>
            </div>

            <div className="forge-intro-window-body">

              <div className="forge-intro-preview-heading">
                <span>YOUR QR CODE</span>
                <h3>Ready to share</h3>
              </div>

              <div className="forge-intro-qr">
                <HeroQR />
              </div>

              <div className="forge-intro-qr-info">
                <span>
                  <i />
                  QR code generated
                </span>
                <span>PNG · SVG</span>
              </div>

            </div>

            <div className="forge-intro-window-footer">
              <span>Made with QRForge</span>
              <span>01 / 01</span>
            </div>

          </div>

          <div className="forge-intro-note">
            <span className="forge-intro-note-icon">
              <Check size={15} />
            </span>

            <div>
              <strong>Designed for your brand</strong>
              <span>Customize. Download. Share.</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
