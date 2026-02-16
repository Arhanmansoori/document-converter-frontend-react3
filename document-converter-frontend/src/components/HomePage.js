// AI assisted development
import React from "react";
import ConverterCard from "./ConverterCard";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";
import FeedbackSection from "./FeedbackSection";
import "./HomePage.css";

const HomePage = () => {
  const converters = [
    {
      type: "word",
      icon: "📄",
      title: "Word to PDF",
      description: "Convert Word documents (.docx) to PDF format instantly",
      accept: ".docx",
      endpoint: "/convert/word-to-pdf",
    },
    {
      type: "html",
      icon: "🌐",
      title: "HTML to PDF",
      description: "Transform HTML files into professional PDF documents",
      accept: ".html",
      endpoint: "/convert/html-to-pdf",
    },
    {
      type: "excel",
      icon: "📊",
      title: "Excel to PDF",
      description: "Convert Excel spreadsheets to PDF with perfect formatting",
      accept: ".xlsx,.xls",
      endpoint: "/convert/excel-to-pdf",
    },
    {
      type: "pdf-image",
      icon: "🖼️",
      title: "PDF to Image PDF",
      description: "Convert PDF files to image-based PDF format",
      accept: ".pdf",
      endpoint: "/convert/pdf-to-image-pdf",
    },
    {
      type: "pdf-to-image",
      icon: "📷",
      title: "PDF to Image",
      description: "Extract PDF pages as image files (PNG, JPG)",
      accept: ".pdf",
      endpoint: "/convert/pdf-to-image",
      isPdfToImage: true,
    },
    {
      type: "merge",
      icon: "🔗",
      title: "Merge PDF",
      description: "Combine multiple PDF files into a single document",
      accept: ".pdf",
      endpoint: "/merge-pdf",
      isMerge: true,
    },
    {
      type: "compress",
      icon: "🗜️",
      title: "Compress PDF",
      description: "Reduce PDF file size with different compression levels",
      accept: ".pdf",
      endpoint: "/compress-pdf",
      isCompress: true,
    },
    {
      type: "pdf-to-word",
      icon: "📝",
      title: "PDF to Word",
      description: "Convert PDF documents to editable Word format",
      accept: ".pdf",
      endpoint: "/convert/pdf-to-word",
    },
    {
      type: "image-to-pdf",
      icon: "🖼️",
      title: "Image to PDF",
      description: "Convert images (JPG, PNG, etc.) to PDF format",
      accept: ".jpg,.jpeg,.png,.gif,.bmp",
      endpoint: "/convert/image-to-pdf",
    },
    {
      type: "split",
      icon: "✂️",
      title: "Split PDF",
      description: "Extract specific pages from a PDF document",
      accept: ".pdf",
      endpoint: "/split-pdf",
      isSplit: true,
    },
    {
      type: "rotate",
      icon: "🔄",
      title: "Rotate PDF",
      description: "Rotate PDF pages by 90, 180, or 270 degrees",
      accept: ".pdf",
      endpoint: "/rotate-pdf",
      isRotate: true,
    },
    {
      type: "protect",
      icon: "🔐",
      title: "Protect PDF",
      description: "Add password protection to your PDF files",
      accept: ".pdf",
      endpoint: "/protect-pdf",
      isProtect: true,
    },
    {
      type: "pdf-to-text",
      icon: "📄",
      title: "PDF to Text",
      description: "Extract text content from PDF documents",
      accept: ".pdf",
      endpoint: "/convert/pdf-to-text",
    },
    {
      type: "watermark",
      icon: "💧",
      title: "Watermark PDF",
      description: "Add text watermark to your PDF documents",
      accept: ".pdf",
      endpoint: "/watermark-pdf",
      isWatermark: true,
    },
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🚀 Launching 2026</div>
          <h1 className="hero-title">OneClickDoc - Free Document Converter</h1>
          <p className="hero-subtitle">
            Convert Word to PDF, Excel to PDF, HTML to PDF & Merge PDFs Instantly
          </p>
          <p className="hero-description">
            Free online document conversion tool. Convert, merge, and transform documents with professional-grade quality. 
            Fast, secure, and reliable document processing. No registration required. 100% free forever.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Conversion Types</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Secure</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Fast</div>
              <div className="stat-label">Processing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">✨ Our Services</div>
            <h2 className="section-title">Document Conversion Made Simple</h2>
            <p className="section-subtitle">
              Experience seamless document transformation with our cutting-edge conversion platform. 
              Convert, merge, and transform your files with professional precision in seconds.
            </p>
          </div>

          {/* Service Features */}
          <div className="service-features">
            <div className="feature-card">
              <div className="feature-icon-box">⚡</div>
              <h3>Lightning Speed</h3>
              <p>Process documents in seconds with our high-performance conversion engine</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box">🔒</div>
              <h3>Bank-Level Security</h3>
              <p>Your files are encrypted end-to-end with military-grade protection</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box">🎯</div>
              <h3>Pixel-Perfect Quality</h3>
              <p>Preserve formatting, fonts, and layout with 100% accuracy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box">💼</div>
              <h3>Enterprise Grade</h3>
              <p>Trusted by businesses and professionals for critical document workflows</p>
            </div>
          </div>

          {/* Service Cards */}
          <div className="services-intro">
            <h3 className="services-intro-title">Select Your Conversion Tool</h3>
            <p className="services-intro-text">
              Click on any service below to begin. Upload your file and get instant results. 
              Our intelligent system ensures perfect formatting and quality every time.
            </p>
          </div>

          <div className="converters-grid">
            {converters.map((converter, index) => (
              <div 
                key={converter.type} 
                className="converter-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ConverterCard
                  type={converter.type}
                  icon={converter.icon}
                  title={converter.title}
                  description={converter.description}
                  accept={converter.accept}
                  endpoint={converter.endpoint}
                  isMerge={converter.isMerge || false}
                  isCompress={converter.isCompress || false}
                  isSplit={converter.isSplit || false}
                  isRotate={converter.isRotate || false}
                  isProtect={converter.isProtect || false}
                  isWatermark={converter.isWatermark || false}
                  isPdfToImage={converter.isPdfToImage || false}
                  color={converter.color}
                />
              </div>
            ))}
          </div>

          {/* Professional Features */}
          <div className="professional-features">
            <div className="feature-item">
              <span className="feature-number">01</span>
              <div className="feature-content">
                <h4>Instant Document Conversion</h4>
                <p>Transform your documents in seconds with our lightning-fast conversion engine. No waiting, no delays - just instant, professional results.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-number">02</span>
              <div className="feature-content">
                <h4>Multi-Format Support</h4>
                <p>Seamlessly convert between Word, Excel, HTML, and PDF formats. Support for all major document types with perfect formatting preservation.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-number">03</span>
              <div className="feature-content">
                <h4>Advanced PDF Operations</h4>
                <p>Merge multiple PDFs, convert to image-based PDFs, and perform batch operations. Professional document management made simple.</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-number">04</span>
              <div className="feature-content">
                <h4>Enterprise-Grade Quality</h4>
                <p>Pixel-perfect conversions with 100% accuracy. Preserve fonts, layouts, and formatting exactly as intended. Trusted by professionals worldwide.</p>
              </div>
            </div>
          </div>

          {/* What You Can Do */}
          <div className="platform-capabilities">
            <h3 className="capabilities-title">Everything You Need to Work with Documents</h3>
            <p className="capabilities-subtitle">
              Professional document processing tools at your fingertips. All 100% FREE and easy to use!
            </p>
            
            <div className="capabilities-grid">
              <div className="capability-card">
                <div className="capability-icon">📄</div>
                <h4>Convert Documents</h4>
                <p>Word to PDF, Excel to PDF, HTML to PDF - convert any document format instantly</p>
              </div>
              
              <div className="capability-card">
                <div className="capability-icon">🔗</div>
                <h4>Merge PDFs</h4>
                <p>Combine multiple PDF files into a single document with perfect page ordering</p>
              </div>
              
              <div className="capability-card">
                <div className="capability-icon">🖼️</div>
                <h4>Image PDF Conversion</h4>
                <p>Convert PDFs to image-based format for better compatibility and viewing</p>
              </div>
              
              <div className="capability-card">
                <div className="capability-icon">⚡</div>
                <h4>Lightning Fast</h4>
                <p>Process documents in seconds, not minutes. High-performance conversion engine</p>
              </div>
              
              <div className="capability-card">
                <div className="capability-icon">🔒</div>
                <h4>Secure & Private</h4>
                <p>Your files are processed securely. All documents are automatically deleted after conversion</p>
              </div>
              
              <div className="capability-card">
                <div className="capability-icon">💼</div>
                <h4>Business Ready</h4>
                <p>Professional-grade quality perfect for business documents, reports, and presentations</p>
              </div>
              
              <div className="capability-card">
                <div className="capability-icon">🌐</div>
                <h4>Works Everywhere</h4>
                <p>Access from any device - desktop, tablet, or mobile. No software installation required</p>
              </div>
              
              <div className="capability-card">
                <div className="capability-icon">🎯</div>
                <h4>Perfect Quality</h4>
                <p>Maintain original formatting, fonts, and layout. 100% accurate conversions every time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About OneClickDoc</h2>
              <p className="about-description">
                OneClickDoc is a cutting-edge document conversion platform 
                designed to simplify your workflow. Launched in 2026, we're 
                committed to providing fast, reliable, and secure document 
                processing solutions.
              </p>
              <p className="about-description">
                Our platform supports multiple file formats and conversion types, 
                ensuring that you can transform your documents exactly how you need 
                them, when you need them. Built with modern technology and a focus 
                on user experience, OneClickDoc is your trusted partner for all 
                document conversion needs.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <div>
                    <h3>Lightning Fast</h3>
                    <p>Process documents in seconds, not minutes</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <div>
                    <h3>Secure & Private</h3>
                    <p>Your documents are processed securely and privately</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <div>
                    <h3>High Quality</h3>
                    <p>Professional-grade conversions every time</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💼</span>
                  <div>
                    <h3>Business Ready</h3>
                    <p>Built for professionals and businesses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Feedback Section */}
      <FeedbackSection />

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">
              Have questions? We'd love to hear from you
            </p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h3>Email</h3>
                  <p>support@oneclickdoc.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🌐</div>
                <div>
                  <h3>Website</h3>
                  <p>www.oneclickdoc.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📅</div>
                <div>
                  <h3>Launch Date</h3>
                  <p>2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

