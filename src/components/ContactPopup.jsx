import React, { useState } from 'react';
import { FaTimes, FaPhone, FaCheckCircle } from 'react-icons/fa';
import { submitInquiry } from '../services/api';
import { toast } from 'react-toastify';

const ContactPopup = ({ propertyId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitInquiry({
        ...formData,
        property_id: propertyId
      });
      setSubmitted(true);
      toast.success('Inquiry submitted! Agent will contact you soon.');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto'
      }} onClick={(e) => e.stopPropagation()}>
        
        <div style={{
          background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
          padding: '25px',
          borderRadius: '20px 20px 0 0',
          textAlign: 'center',
          position: 'relative'
        }}>
          <button onClick={onClose} style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff'
          }}>
            <FaTimes />
          </button>
          
          <div style={{
            width: '70px',
            height: '70px',
            background: '#f9b234',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px'
          }}>
            <FaPhone size={30} style={{ color: '#1e3c72' }} />
          </div>
          
          <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '5px' }}>Interested in this Property?</h3>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>Fill in your details and our agent will contact you</p>
          <p style={{ color: '#f9b234', fontSize: '13px', marginTop: '10px' }}>Property ID: {propertyId}</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                required
                pattern="[0-9]{10}"
                value={formData.mobile}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>City *</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>Message (Optional)</label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
                placeholder="I'm interested in this property..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #f9b234, #f5af19)',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#1e3c72',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        ) : (
          <div style={{ padding: '50px 30px', textAlign: 'center' }}>
            <FaCheckCircle size={60} style={{ color: '#28a745', marginBottom: '20px' }} />
            <h3 style={{ color: '#1e3c72', marginBottom: '10px' }}>Thank You!</h3>
            <p style={{ color: '#666' }}>Your inquiry has been submitted successfully.</p>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>Our agent will contact you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPopup;