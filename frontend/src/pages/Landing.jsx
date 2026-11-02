import Hero from '../components/landing/Hero.jsx';
import FeatureGrid from '../components/landing/FeatureGrid.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import PricingSection from '../components/landing/PricingSection.jsx';
import FAQ from '../components/landing/FAQ.jsx';
import CallToAction from '../components/landing/CallToAction.jsx';

export default function Landing() {
  return (
    <div className="landing">
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <PricingSection />
      <FAQ />
      <CallToAction />
    </div>
  );
}
