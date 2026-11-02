import { FAQS } from '../../utils/plans.js';

export default function FAQ() {
  return (
    <section className="lp-section narrow" id="faq">
      <h2 className="lp-h2">Frequently asked questions</h2>
      <div className="faq">
        {FAQS.map(([q, a]) => (
          <details key={q} className="card faq-item"><summary>{q}</summary><p>{a}</p></details>
        ))}
      </div>
    </section>
  );
}
