import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Modal.css';

// Initialize Supabase
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

const Modal = ({ isOpen, onClose, subtitle, conversationData }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            conversation: conversationData?.messages || null,
            automation_value: conversationData?.automationValue || null
          }
        ]);

      if (error) throw error;

      console.log('Saved to Supabase:', data);
      
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Error saving to Supabase:', error);
      setIsSubmitting(false);
      alert('Error submitting form. Please try again.');
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '' });
    setSubmitSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  const displaySubtitle = subtitle || "Share your details and we'll reach out to schedule a discovery call.";

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>
        
        {!submitSuccess ? (
          <>
            <h2 className="modal-title">Let's Chat</h2>
            <p className="modal-subtitle">
              {displaySubtitle}
            </p>
            
            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="form-input"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="form-input"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Thank You!</h2>
            <p className="success-text">
              We'll be in touch soon to explore what's possible.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;