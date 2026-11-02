
const STEPS = [
  {
    number: '01',
    label: 'SELECT',
    title: 'Start with a destination.',
    text: 'Choose where you want your audience to go. Connect a website, share contact details, WiFi access, email, or anything else.',
    tags: ['Website', 'vCard', 'WiFi'],
    icon: '↗'
  },
  {
    number: '02',
    label: 'DESIGN',
    title: 'Make it unmistakably yours.',
    text: 'Create a QR code that reflects your brand. Fine-tune colors, patterns, frames and logos with an instant preview.',
    tags: ['Brand colors', 'Logo', 'Custom design'],
    icon: '✳'
  },
  {
    number: '03',
    label: 'LAUNCH',
    title: 'Share it with the world.',
    text: 'Export your QR code in high quality. Print it, publish it, or share it anywhere your customers connect with you.',
    tags: ['PNG', 'SVG', 'Print ready'],
    icon: '⌁'
  }
];

export default function HowItWorks() {
  return (
    <section className="how-sleek" id="how">

      <div className="how-sleek-inner">

        <div className="how-sleek-heading">

          <div className="how-sleek-label">
            <span></span>
            HOW IT WORKS
          </div>

          <div className="how-sleek-heading-row">
            <h2>
              Simplicity is the
              <br />
              <span>ultimate advantage.</span>
            </h2>

            <p>
              From your first idea to your first scan.
              Everything happens in three simple steps.
            </p>
          </div>

        </div>

        <div className="how-sleek-list">

          {STEPS.map((step) => (
            <article className="how-sleek-card" key={step.number}>

              <div className="sleek-step-number">
                {step.number}
              </div>

              <div className="sleek-step-main">

                <div className="sleek-step-label">
                  {step.label}
                </div>

                <h3>{step.title}</h3>

                <p>{step.text}</p>

                <div className="sleek-tags">
                  {step.tags.map(tag => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

              </div>

              <div className="sleek-step-icon">
                {step.icon}
              </div>

            </article>
          ))}

        </div>

        <div className="how-sleek-bottom">
          <div className="sleek-bottom-left">
            <span className="sleek-check">✓</span>
            No complicated setup. No design experience needed.
          </div>

          <span className="sleek-bottom-right">
            BUILT FOR MODERN BRANDS
          </span>
        </div>

      </div>

    </section>
  );
}
