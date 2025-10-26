import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
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

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Later - send to Supabase
    console.log('Form submitted:', formData);
    
    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Close modal after 2 seconds
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setFormData({ name: '', email: '' });
    setSubmitSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>
        
        {!submitSuccess ? (
          <>
            <h2 className="modal-title">Let's Chat</h2>
            <p className="modal-subtitle">
              Share your details and we'll reach out to schedule a discovery call.
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