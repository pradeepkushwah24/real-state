import React, { useState } from 'react';

const ContactPopup = ({ propertyId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  };

  const popupStyle = {
    background: '#fff',
    borderRadius: '10px',
    padding: '30px',
    maxWidth: '400px',
    width: '90%',
    position: 'relative',
    animation: 'slideIn 0.3s ease'
  };

  const closeStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666'
  };

  const headingStyle = {
    color: '#1e3c72',
    marginBottom: '10px'
  };

  const propertyIdStyle = {
    color: '#666',
    fontSize: '14px',
    marginBottom: '20px',
    padding: '10px',
    background: '#f8f9fa',
    borderRadius: '5px'
  };

  const formGroupStyle = {
    marginBottom: '20px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer'
  };

  const successStyle = {
    textAlign: 'center',
    padding: '20px'
  };

  const successIconStyle = {
    fontSize: '60px',
    color: '#28a745',
    marginBottom: '20px'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const buyerData = {
      ...formData,
      propertyId,
      type: 'BUYER',
      timestamp: new Date().toISOString()
    };
    
    console.log('Buyer Data:', buyerData);
    
    // Here you would send to your backend/email
    // For demo, we'll just show success
    
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={popupStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeStyle} onClick={onClose}>×</button>
        
        {!submitted ? (
          <>
            <h2 style={headingStyle}>Get Contact Details</h2>
            <div style={propertyIdStyle}>
              Property ID: {propertyId}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  style={inputStyle}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div style={formGroupStyle}>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  pattern="[0-9]{10}"
                  style={inputStyle}
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div style={formGroupStyle}>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  style={inputStyle}
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" style={buttonStyle}>
                Submit
              </button>
            </form>
          </>
        ) : (
          <div style={successStyle}>
            <div style={successIconStyle}>
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Thank You!</h3>
            <p>Your details have been submitted successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPopup;