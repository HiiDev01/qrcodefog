
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="qrf-cta">
      <div className="qrf-cta-inner">

        <div className="qrf-cta-content">
          <h2>
            Your next QR code
            <br />
            starts here.
          </h2>

          <p>
            Create a custom QR code for your business,
            brand or next big idea. It only takes a few seconds.
          </p>
        </div>

        <div className="qrf-cta-action">
          <Link to="/generator" className="qrf-cta-button">
            Get started
            <ArrowUpRight size={17} />
          </Link>

          <span>Free to get started. No design skills needed.</span>
        </div>

      </div>
    </section>
  );
}
