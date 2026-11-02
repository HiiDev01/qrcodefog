import { QrCode, Palette, Image as ImageIcon, Download, RefreshCw, BarChart3 } from 'lucide-react';

const FEATURES = [
  [QrCode, 'Free QR code generation', 'Create static QR codes instantly. No account needed.'],
  [Palette, 'Custom QR designs', 'Pick patterns and colors that match your brand.'],
  [ImageIcon, 'Logo integration', 'Place your logo in the center and keep the code scannable.'],
  [Download, 'Multiple download formats', 'Export PNG, JPEG or SVG up to 2000 × 2000 pixels.'],
  [RefreshCw, 'Dynamic QR codes', 'Change where a printed code points without reprinting it.'],
  [BarChart3, 'Scan analytics', 'See total scans, daily activity and recent scans.'],
];

export default function FeatureGrid() {
  return (
    <section className="lp-section" id="features">
      <h2 className="lp-h2">Everything you need</h2>
      <div className="grid3">
        {FEATURES.map(([Icon, title, text]) => (
          <div key={title} className="card feature">
            <span className="stat-icon"><Icon size={20} /></span><h3>{title}</h3><p className="muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
