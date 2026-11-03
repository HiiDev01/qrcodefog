import { Link } from 'react-router-dom';
import {
  QrCode,
  Palette,
  Image as ImageIcon,
  Download,
  RefreshCw,
  BarChart3,
  ArrowUpRight
} from 'lucide-react';
import "../../styles/Feature.css";

const FEATURES = [
  {
    Icon: QrCode,
    number: '01',
    title: 'Free QR code generation',
    text: 'Create static QR codes instantly. No account or setup required.'
  },
  {
    Icon: Palette,
    number: '02',
    title: 'Custom QR designs',
    text: 'Choose colors, patterns and styles that fit your brand.'
  },
  {
    Icon: ImageIcon,
    number: '03',
    title: 'Your logo, built in',
    text: 'Add your logo to the center of your QR code and make it recognizable.'
  },
  {
    Icon: Download,
    number: '04',
    title: 'Flexible downloads',
    text: 'Export high-quality PNG, JPEG and SVG files up to 2000 × 2000 pixels.'
  },
  {
    Icon: RefreshCw,
    number: '05',
    title: 'Dynamic QR codes',
    text: 'Update destinations whenever you need, without replacing printed codes.'
  },
  {
    Icon: BarChart3,
    number: '06',
    title: 'Useful scan analytics',
    text: 'Understand scan activity with totals, daily trends and recent scans.'
  }
];

export default function FeatureGrid() {
  return (
    <section className="qrf-features" id="features">

      <div className="qrf-features-inner">

        <div className="qrf-features-heading">
          <div>
            <span className="qrf-features-overline">
              FEATURES
            </span>

            <h2>
              Everything you need.
              <br />
              Nothing you don't.
            </h2>
          </div>

          <p>
            From your first QR code to managing campaigns,
            QRForge gives you the tools to create and connect.
          </p>
        </div>

        <div className="qrf-features-grid">

          {FEATURES.map(({ Icon, number, title, text }) => (
            <article className="qrf-feature-item" key={number}>

              <div className="qrf-feature-top">
                <span className="qrf-feature-icon">
                  <Icon size={21} strokeWidth={1.7} />
                </span>

                <span className="qrf-feature-number">
                  {number}
                </span>
              </div>

              <h3>{title}</h3>

              <p>{text}</p>

            </article>
          ))}

        </div>

        <div className="qrf-features-bottom">
          <span>Built for businesses, creators and growing brands.</span>

          <a href="/pricing">
            Explore plans
            <ArrowUpRight size={15} />
          </a>
        </div>

      </div>

    </section>
  );
}
