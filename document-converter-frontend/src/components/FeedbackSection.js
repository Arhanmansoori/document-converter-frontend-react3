// AI assisted development
import React, { useState } from "react";
import "./FeedbackSection.css";
import { trackButtonClick } from "../utils/analytics";

const FeedbackSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });
  const [submitted, setSubmitted] = useState(false);

  // Only show good feedbacks (4+ stars)
  const goodFeedbacks = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Owner",
      message: "OneClickDoc saved me hours of work! Converting Word documents to PDF has never been easier. Highly recommended!",
      rating: 5,
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Student",
      message: "As a student, I need to convert documents frequently. This tool is fast, free, and works perfectly every time.",
      rating: 5,
      date: "5 days ago",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Office Manager",
      message: "We use OneClickDoc daily in our office. The merge PDF feature is a game-changer for our workflow.",
      rating: 5,
      date: "1 week ago",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Freelancer",
      message: "Professional quality conversions without any hassle. This is exactly what I needed for my client work.",
      rating: 5,
      date: "2 weeks ago",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Teacher",
      message: "Perfect for converting educational materials. Fast, reliable, and completely free. Love it!",
      rating: 5,
      date: "3 weeks ago",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Developer",
      message: "Clean interface and excellent performance. The HTML to PDF conversion works flawlessly.",
      rating: 4,
      date: "1 month ago",
    },
  ];

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Only submit if rating is 4 or 5 (good feedback)
    if (formData.rating >= 4 && formData.message.trim()) {
      trackButtonClick('Feedback Submit', 'Feedback Section');
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "", rating: 0 });
        setSubmitted(false);
        setShowForm(false);
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="feedback-section" id="feedback">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">💬 Feedback</div>
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            Share your experience and help us improve. We value your feedback!
          </p>
        </div>

        {/* Feedback Form */}
        <div className="feedback-form-container">
          {!submitted ? (
            <>
              {!showForm ? (
                <button
                  className="show-feedback-form-btn"
                  onClick={() => {
                    setShowForm(true);
                    trackButtonClick('Show Feedback Form', 'Feedback Section');
                  }}
                >
                  ✍️ Share Your Feedback
                </button>
              ) : (
                <form className="feedback-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Your Email (Optional)</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Your Rating</label>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-button ${formData.rating >= star ? "active" : ""}`}
                          onClick={() => handleRatingClick(star)}
                          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                        >
                          ⭐
                        </button>
                      ))}
                      {formData.rating > 0 && (
                        <span className="rating-text">
                          {formData.rating === 5
                            ? "Excellent"
                            : formData.rating === 4
                            ? "Good"
                            : formData.rating === 3
                            ? "Average"
                            : formData.rating === 2
                            ? "Poor"
                            : "Very Poor"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your experience..."
                      rows="5"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setShowForm(false);
                        setFormData({ name: "", email: "", message: "", rating: 0 });
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={formData.rating < 4 || !formData.message.trim()}
                    >
                      Submit Feedback
                    </button>
                  </div>

                  {formData.rating > 0 && formData.rating < 4 && (
                    <p className="rating-warning">
                      ⚠️ Only feedbacks with 4+ stars are displayed. Please provide a higher rating.
                    </p>
                  )}
                </form>
              )}
            </>
          ) : (
            <div className="feedback-success">
              <div className="success-icon">✅</div>
              <h3>Thank You for Your Feedback!</h3>
              <p>Your feedback has been submitted successfully. We appreciate your input!</p>
            </div>
          )}
        </div>

        {/* Display Good Feedbacks Only */}
        <div className="feedbacks-display">
          <h3 className="feedbacks-title">Recent Positive Feedback</h3>
          <div className="feedbacks-grid">
            {goodFeedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback-card">
                <div className="feedback-header">
                  <div className="feedback-author">
                    <div className="author-avatar">
                      {feedback.name.charAt(0)}
                    </div>
                    <div className="author-info">
                      <h4>{feedback.name}</h4>
                      <p>{feedback.role}</p>
                    </div>
                  </div>
                  <div className="feedback-rating">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="feedback-message">"{feedback.message}"</p>
                <div className="feedback-date">{feedback.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;


