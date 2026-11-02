const STEPS = [
  ['Choose destination', 'Website, email, contact card, WiFi, phone, crypto or plain text.'],
  ['Customize your QR code', 'Adjust the pattern, colors and logo with a live preview.'],
  ['Download and share', 'Download in the format and size you need, then print or share.'],
];

export default function HowItWorks() {
  return (
    <section className="lp-section" id="how">
      <h2 className="lp-h2">How it works</h2>
      <div className="grid3">
        {STEPS.map(([title, text], i) => (
          <div key={title} className="card feature">
            <span className="step big">{i + 1}</span><h3>{title}</h3><p className="muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
