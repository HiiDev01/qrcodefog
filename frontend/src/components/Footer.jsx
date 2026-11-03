import { Link } from 'react-router-dom';
import { QrCode, ArrowUpRight } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="qrf-site-footer">
      <div className="qrf-site-footer-wrap">

        <div className="qrf-site-footer-main">

          {/* Brand */}
          <div className="qrf-site-footer-identity">
            <Link to="/" className="qrf-site-footer-brand">
              <QrCode size={23} strokeWidth={2} />
              <span>QRForge</span>
            </Link>

            <p>
              Create, customize and manage QR codes
              with tools built for modern businesses.
            </p>

            <Link
              to="/generator"
              className="qrf-site-footer-create"
            >
              Create your first QR code
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="qrf-site-footer-navigation">

            <div className="qrf-site-footer-column">
              <h4>Product</h4>
              <Link to="/generator">QR Generator</Link>
              <Link to="/pricing">Pricing</Link>
              <a href="/#how">How it works</a>
              <a href="/#faq">FAQs</a>
            </div>

            <div className="qrf-site-footer-column">
              <h4>Account</h4>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Create account</Link>
            </div>

            <div className="qrf-site-footer-column">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/terms">Terms of service</Link>
            </div>

          </nav>
        </div>

        {/* Bottom */}
        <div className="qrf-site-footer-bottom">
          <span>
            © {new Date().getFullYear()} QRForge. All rights reserved.
          </span>

          <span>
            Made for better connections.
          </span>
        </div>

      </div>
    </footer>
  );
}
