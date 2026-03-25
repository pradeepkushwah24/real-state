import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    background: '#0a2a3a',
    color: '#fff',
    marginTop: 'auto',
    width: '100%'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px 40px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '40px',
    '@media (maxWidth: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '30px'
    },
    '@media (maxWidth: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '30px'
    }
  };

  const headingStyle = {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#f9b234',
    fontWeight: '600'
  };

  const textStyle = {
    color: '#b0b0b0',
    lineHeight: '1.6',
    marginBottom: '20px',
    fontSize: '14px'
  };

  const linkStyle = {
    color: '#b0b0b0',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    marginBottom: '12px'
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '15px',
    color: '#b0b0b0',
    fontSize: '14px'
  };

  // Fixed Newsletter Form Style
  const newsletterFormStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    width: '100%'
  };

  const inputStyle = {
    flex: 1,
    padding: '12px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '8px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
    width: 'auto'
  };

  const buttonStyle = {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #f9b234, #f5af19)',
    border: 'none',
    borderRadius: '8px',
    color: '#1e3c72',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {/* Column 1 - Company Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #f9b234, #f5af19)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e3c72' }}>4P</span>
              </div>
              <div>
                <span style={{ fontSize: '24px', fontWeight: '800' }}>4PGR</span>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#f9b234' }}> Realty</span>
              </div>
            </div>
            <p style={textStyle}>
              Your trusted partner in finding the perfect property. Making dreams come true since 2015.
            </p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                <a key={idx} href="#" style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f9b234';
                  e.currentTarget.style.color = '#1e3c72';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#fff';
                }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 style={headingStyle}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Home', 'Buy Property', 'Rent Property', 'Sell Property'].map((item, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' property', '')}`} 
                    style={linkStyle}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f9b234'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#b0b0b0'}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h4 style={headingStyle}>Contact Info</h4>
            <div style={contactItemStyle}>
              <FaPhone style={{ color: '#f9b234', flexShrink: 0 }} />
              <a href="tel:7610655232" style={{ color: '#b0b0b0', textDecoration: 'none' }}>+91 7610655232</a>
            </div>
            <div style={contactItemStyle}>
              <FaEnvelope style={{ color: '#f9b234', flexShrink: 0 }} />
              <a href="mailto:info@4pgrrealty.com" style={{ color: '#b0b0b0', textDecoration: 'none' }}>info@4pgrrealty.com</a>
            </div>
            <div style={contactItemStyle}>
              <FaMapMarkerAlt style={{ color: '#f9b234', flexShrink: 0 }} />
              <span style={{ color: '#b0b0b0' }}>Delhi NCR, India</span>
            </div>
            <div style={contactItemStyle}>
              <FaClock style={{ color: '#f9b234', flexShrink: 0 }} />
              <span style={{ color: '#b0b0b0' }}>Mon-Sat: 9AM - 7PM</span>
            </div>
          </div>

          {/* Column 4 - Newsletter - Fixed Subscribe Button */}
          <div>
            <h4 style={headingStyle}>Newsletter</h4>
            <p style={textStyle}>Subscribe to get latest property updates</p>
            <form style={newsletterFormStyle} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                style={inputStyle}
              />
              <button type="submit" style={buttonStyle}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '20px 0 0',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#b0b0b0', fontSize: '14px' }}>
            © {currentYear} 4PGR Real Estate. All rights reserved. | Designed with ❤️ for your dream home
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          form {
            flex-direction: column;
          }
          form button {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;