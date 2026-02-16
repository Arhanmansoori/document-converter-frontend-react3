// AI assisted development
import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:support@oneclickdoc.com";
  };

  const handleWebsiteClick = () => {
    window.open("https://www.oneclickdoc.com", "_blank");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">OneClickDoc</h3>
            <p className="footer-description">
              Professional document conversion platform. Convert, merge, and transform your documents with ease. 
              Fast, secure, and reliable. Launching 2026.
            </p>
            <div className="footer-social">
              <span className="social-label">Follow Us:</span>
              <div className="social-icons">
                <a href="https://twitter.com/oneclickdoc" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <span className="social-icon">🐦</span>
                </a>
                <a href="https://facebook.com/oneclickdoc" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <span className="social-icon">📘</span>
                </a>
                <a href="https://linkedin.com/company/oneclickdoc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <span className="social-icon">💼</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li onClick={() => scrollToSection("services")}>
                <span className="footer-link">Word to PDF</span>
              </li>
              <li onClick={() => scrollToSection("services")}>
                <span className="footer-link">HTML to PDF</span>
              </li>
              <li onClick={() => scrollToSection("services")}>
                <span className="footer-link">Excel to PDF</span>
              </li>
              <li onClick={() => scrollToSection("services")}>
                <span className="footer-link">PDF to Image PDF</span>
              </li>
              <li onClick={() => scrollToSection("services")}>
                <span className="footer-link">Merge PDF</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li onClick={() => scrollToSection("about")}>
                <span className="footer-link">About Us</span>
              </li>
              <li onClick={() => scrollToSection("contact")}>
                <span className="footer-link">Contact</span>
              </li>
              <li onClick={() => scrollToSection("feedback")}>
                <span className="footer-link">Feedback</span>
              </li>
              <li>
                <span className="footer-link" onClick={() => alert("Privacy Policy - Coming Soon!")}>
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => alert("Terms of Service - Coming Soon!")}>
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>
                <span className="footer-link" onClick={handleEmailClick}>
                  📧 support@oneclickdoc.com
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={handleWebsiteClick}>
                  🌐 www.oneclickdoc.com
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => scrollToSection("contact")}>
                  📅 Launch: 2026
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} OneClickDoc. All rights reserved. | Launching 2026
          </p>
          <p className="footer-tagline">
            Made with ❤️ for seamless document conversion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

