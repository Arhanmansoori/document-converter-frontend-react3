// AI assisted development
import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2>1. Information We Collect</h2>
          <p>OneClickDoc processes your documents locally and does not store your files permanently. We only temporarily store files during the conversion process.</p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>Files uploaded to OneClickDoc are processed for conversion purposes only and are automatically deleted after conversion.</p>
        </section>

        <section>
          <h2>3. Data Security</h2>
          <p>We use industry-standard security measures to protect your files during processing. All conversions are performed securely.</p>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>We use cookies to improve your experience and for analytics purposes. You can disable cookies in your browser settings.</p>
        </section>

        <section>
          <h2>5. Contact Us</h2>
          <p>For privacy concerns, contact us at: support@oneclickdoc.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;


