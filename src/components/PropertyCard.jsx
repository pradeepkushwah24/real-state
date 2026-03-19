import React, { useState } from 'react';
import ContactPopup from './ContactPopup';

const PropertyCard = ({ property }) => {
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Default images based on property type
  const getDefaultImage = (type) => {
    const images = {
      House: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500',
      Flat: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
      Apartment: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
      Commercial: 'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?w=500',
      Plot: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500',
      default: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500'
    };
    return images[type] || images.default;
  };

  const imageUrl = !imageError && property.images && property.images[0] 
    ? property.images[0] 
    : getDefaultImage(property.type);

  const cardStyle = {
    background: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: isHovered ? '0 5px 20px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const mediaStyle = {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
    background: '#f0f0f0' // Fallback color
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  };

  const idStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    zIndex: 1
  };

  const videoIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(255,255,255,0.9)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1e3c72',
    fontSize: '20px',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1
  };

  const infoStyle = {
    padding: '20px'
  };

  const titleStyle = {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333'
  };

  const locationStyle = {
    color: '#666',
    marginBottom: '10px',
    fontSize: '14px'
  };

  const detailsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    padding: '10px 0',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee'
  };

  const priceStyle = {
    color: '#1e3c72',
    fontWeight: 'bold',
    fontSize: '16px'
  };

  const sizeStyle = {
    color: '#666',
    fontSize: '14px'
  };

  const typeStyle = {
    background: '#f0f0f0',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px'
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
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  };

  const handleGetContact = () => {
    setShowContactPopup(true);
  };

  return (
    <>
      <div 
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={mediaStyle}>
          <img 
            src={imageUrl}
            alt={property.title}
            style={{
              ...imageStyle,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
            onError={() => setImageError(true)}
          />
          <span style={idStyle}>ID: {property.id}</span>
          {property.video && (
            <button style={videoIconStyle}>
              <i className="fas fa-play"></i>
            </button>
          )}
        </div>
        
        <div style={infoStyle}>
          <h3 style={titleStyle}>{property.title}</h3>
          
          <div style={locationStyle}>
            <i className="fas fa-map-marker-alt" style={{marginRight: '5px', color: '#f9b234'}}></i>
            {property.location}
          </div>
          
          <div style={detailsStyle}>
            <span style={priceStyle}>{property.price}</span>
            <span style={sizeStyle}>{property.size}</span>
            <span style={typeStyle}>{property.type}</span>
          </div>
          
          <button 
            style={buttonStyle}
            onClick={handleGetContact}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Get Contact
          </button>
        </div>
      </div>

      {showContactPopup && (
        <ContactPopup 
          propertyId={property.id}
          onClose={() => setShowContactPopup(false)}
        />
      )}
    </>
  );
};

export default PropertyCard;