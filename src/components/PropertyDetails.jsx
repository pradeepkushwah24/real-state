import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactPopup from './ContactPopup';

const PropertyDetails = () => {
  const { id } = useParams();
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const [property] = useState({
    id: id || 'RE1001',
    title: 'Luxury Villa with Pool',
    price: '₹1.25 Cr',
    location: 'Golf Course Road, Gurugram',
    size: '3500 sq.ft',
    type: 'House',
    bedrooms: 4,
    bathrooms: 5,
    description: 'This stunning luxury villa offers premium living with modern amenities. Features include a private pool, garden, and modern interiors. Located in the most prestigious area of Gurugram with 24/7 security and club house access.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400'
    ],
    video: 'https://example.com/video.mp4',
    features: ['Swimming Pool', 'Garden', 'Parking', 'Security', 'Gym', 'Club House', 'Power Backup', 'Lift']
  });

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  };

  const galleryStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginBottom: '30px'
  };

  const mainImageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const thumbnailGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px'
  };

  const thumbnailStyle = {
    width: '100%',
    height: '195px',
    objectFit: 'cover',
    borderRadius: '5px',
    cursor: 'pointer',
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
    border: '2px solid transparent'
  };

  const thumbnailActiveStyle = {
    ...thumbnailStyle,
    opacity: 1,
    border: '2px solid #1e3c72'
  };

  const infoSectionStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px'
  };

  const detailsStyle = {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    fontSize: '28px',
    color: '#1e3c72',
    marginBottom: '10px'
  };

  const priceStyle = {
    fontSize: '24px',
    color: '#f9b234',
    fontWeight: 'bold',
    marginBottom: '15px'
  };

  const locationStyle = {
    color: '#666',
    marginBottom: '20px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  };

  const specsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    padding: '20px 0',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
    marginBottom: '20px'
  };

  const specItemStyle = {
    textAlign: 'center'
  };

  const specValueStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1e3c72'
  };

  const specLabelStyle = {
    fontSize: '14px',
    color: '#666'
  };

  const descriptionStyle = {
    marginBottom: '20px',
    lineHeight: '1.8',
    color: '#666'
  };

  const featuresStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '20px'
  };

  const featureStyle = {
    background: '#f0f0f0',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  };

  const sidebarStyle = {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    height: 'fit-content'
  };

  const agentImageStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px'
  };

  const contactBtnStyle = {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '15px',
    transition: 'transform 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      {/* Image Gallery */}
      <div style={galleryStyle}>
        <img 
          src={property.images[selectedImage]} 
          alt="Main" 
          style={mainImageStyle}
          onClick={() => window.open(property.images[selectedImage], '_blank')}
        />
        <div style={thumbnailGridStyle}>
          {property.images.slice(0, 4).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              style={selectedImage === index ? thumbnailActiveStyle : thumbnailStyle}
              onClick={() => setSelectedImage(index)}
              onMouseEnter={(e) => !selectedImage === index && (e.target.style.opacity = 1)}
              onMouseLeave={(e) => !selectedImage === index && (e.target.style.opacity = 0.7)}
            />
          ))}
        </div>
      </div>

      {/* Property Info */}
      <div style={infoSectionStyle}>
        <div style={detailsStyle}>
          <h1 style={titleStyle}>{property.title}</h1>
          <div style={priceStyle}>{property.price}</div>
          <div style={locationStyle}>
            <i className="fas fa-map-marker-alt" style={{color: '#f9b234'}}></i>
            {property.location}
          </div>

          <div style={specsStyle}>
            <div style={specItemStyle}>
              <div style={specValueStyle}>{property.size}</div>
              <div style={specLabelStyle}>Size</div>
            </div>
            <div style={specItemStyle}>
              <div style={specValueStyle}>{property.bedrooms}</div>
              <div style={specLabelStyle}>Bedrooms</div>
            </div>
            <div style={specItemStyle}>
              <div style={specValueStyle}>{property.bathrooms}</div>
              <div style={specLabelStyle}>Bathrooms</div>
            </div>
          </div>

          <div style={descriptionStyle}>
            <h3 style={{marginBottom: '10px', color: '#1e3c72'}}>Description</h3>
            <p>{property.description}</p>
          </div>

          <div>
            <h3 style={{marginBottom: '15px', color: '#1e3c72'}}>Amenities & Features</h3>
            <div style={featuresStyle}>
              {property.features.map((feature, index) => (
                <span key={index} style={featureStyle}>
                  <i className="fas fa-check" style={{color: '#28a745'}}></i>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={sidebarStyle}>
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200" 
              alt="Agent"
              style={agentImageStyle}
            />
            <h3 style={{color: '#1e3c72', marginBottom: '5px'}}>Rajesh Kumar</h3>
            <p style={{color: '#666', fontSize: '14px'}}>Senior Property Consultant</p>
          </div>
          
          <button 
            style={contactBtnStyle}
            onClick={() => setShowContactPopup(true)}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <i className="fas fa-phone-alt" style={{marginRight: '10px'}}></i>
            Get Contact Details
          </button>

          <div style={{textAlign: 'center', padding: '20px 0', borderTop: '1px solid #eee'}}>
            <div style={{fontWeight: 'bold', marginBottom: '5px'}}>Property ID: {property.id}</div>
            <div style={{color: '#666', fontSize: '14px'}}>Posted: Today</div>
          </div>
        </div>
      </div>

      {showContactPopup && (
        <ContactPopup 
          propertyId={property.id}
          onClose={() => setShowContactPopup(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetails;