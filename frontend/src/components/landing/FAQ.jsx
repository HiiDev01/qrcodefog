
import { useState } from 'react';
import { FAQS } from '../../utils/plans.js';
import { Plus } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">

        {/* Heading */}
        <div className="faq-heading">
          <div className="faq-eyebrow">
            <span className="faq-eyebrow-dot" />
            GOT QUESTIONS?
          </div>

          <h2>
            Everything you need
            <br />
            <span>to know.</span>
          </h2>

          <p>
            Have questions about creating, managing or
            sharing your QR codes? We've got answers.
          </p>
        </div>

        {/* Accordion */}
        <div className="faq-list">
          {FAQS.map(([q, a], index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={q}
                className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">
                    {q}
                  </span>

                  <span className="faq-toggle">
                    <Plus size={18} />
                  </span>
                </button>

                <div
                  className="faq-answer-wrapper"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr'
                  }}
                >
                  <div className="faq-answer-inner">
                    <p>{a}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer */}
        <div className="faq-footer">
          <span className="faq-footer-dot" />
          STILL HAVE QUESTIONS?
          <a href="mailto:support@example.com">
            Talk to our team →
          </a>
        </div>

      </div>
    </section>
  );
}
