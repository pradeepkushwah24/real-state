import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    background: '#1e3c72',
    color: '#fff',
    padding: '60px 0 20px',
    marginTop: '60px'
  };

  const footerContentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  };

  const sectionStyle = {
    marginBottom: '20px'
  };

  const headingStyle = {
    marginBottom: '20px',
    fontSize: '18px'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0
  };

  const listItemStyle = {
    marginBottom: '10px'
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    opacity: 0.8,
    transition: 'opacity 0.3s ease'
  };

  const bottomStyle = {
    textAlign: 'center',
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    maxWidth: '1200px',
    margin: '40px auto 0',
    padding: '20px 20px 0'
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>About AKPS Realty</h3>
          <p>Your trusted partner in finding the perfect property. We connect buyers and sellers with transparency and trust.</p>
        </div>
        
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Quick Links</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}><Link to="/" style={linkStyle}>Home</Link></li>
            <li style={listItemStyle}><Link to="/search" style={linkStyle}>Properties</Link></li>
            <li style={listItemStyle}><Link to="/sell" style={linkStyle}>Sell Property</Link></li>
            <li style={listItemStyle}><Link to="/admin" style={linkStyle}>Admin Panel</Link></li>
          </ul>
        </div>
        
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Contact Info</h3>
          <ul style={listStyle}>
            <li style={listItemStyle}><i className="fas fa-phone"></i> +91 9876543210</li>
            <li style={listItemStyle}><i className="fas fa-envelope"></i> info@akpsrealty.com</li>
            <li style={listItemStyle}><i className="fas fa-map-marker-alt"></i> Delhi NCR, India</li>
          </ul>
        </div>
      </div>
      
      <div style={bottomStyle}>
        <p>&copy; 2024 AKPS Realty. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;