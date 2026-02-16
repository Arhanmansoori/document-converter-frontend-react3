// AI assisted development
import React from "react";
import "./CTASection.css";
import { trackButtonClick } from "../utils/analytics";

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Convert Your Documents?</h2>
          <p className="cta-description">
            Start converting your files now. It's free, fast, and secure. No registration required!
          </p>
          <div className="cta-buttons">
            <a 
              href="#services" 
              className="cta-button primary"
              onClick={() => trackButtonClick('Get Started CTA', 'CTA Section')}
            >
              Get Started Free
            </a>
            <a 
              href="#about" 
              className="cta-button secondary"
              onClick={() => trackButtonClick('Learn More CTA', 'CTA Section')}
            >
              Learn More
            </a>
          </div>
          <div className="cta-features">
            <div className="cta-feature">✓ 100% Free</div>
            <div className="cta-feature">✓ No Registration</div>
            <div className="cta-feature">✓ Secure & Private</div>
            <div className="cta-feature">✓ Instant Results</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;


