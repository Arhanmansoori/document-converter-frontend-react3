// AI assisted development
import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      content: "OneClickDoc saved me hours of work! Converting Word documents to PDF has never been easier. Highly recommended!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Student",
      content: "As a student, I need to convert documents frequently. This tool is fast, free, and works perfectly every time.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Office Manager",
      content: "We use OneClickDoc daily in our office. The merge PDF feature is a game-changer for our workflow.",
      rating: 5,
    },
    {
      name: "David Thompson",
      role: "Freelancer",
      content: "Professional quality conversions without any hassle. This is exactly what I needed for my client work.",
      rating: 5,
    },
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">💬 Testimonials</div>
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            Join thousands of satisfied users who trust OneClickDoc for their document conversion needs
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

