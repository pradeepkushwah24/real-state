import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath, FaVectorSquare, FaHeart, FaShare, FaPhone } from 'react-icons/fa';
import ContactPopup from './ContactPopup';

const PropertyCard = ({ property }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    
    // Remove any existing ₹ symbol and extra spaces
    let cleanPrice = price.toString().replace(/[₹,]/g, '').trim();
    
    // Check if price is in Lakhs or Crores
    if (cleanPrice.toLowerCase().includes('lakh')) {
      return `₹${cleanPrice}`;
    }
    if (cleanPrice.toLowerCase().includes('cr')) {
      return `₹${cleanPrice}`;
    }
    
    // Try to parse as number
    const numPrice = parseFloat(cleanPrice);
    if (isNaN(numPrice)) return `₹${price}`;
    
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(2)} Cr`;
    }
    if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${numPrice.toLocaleString('en-IN')}`;
  };

  const imageUrl = !imageError && property.images && property.images[0]
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500';

  const getPurposeStyle = (purpose) => {
    if (purpose === 'sale') {
      return { background: '#28a745', color: '#fff' };
    }
    return { background: '#f9b234', color: '#1e3c72' };
  };

  const purposeText = property.purpose === 'sale' ? 'For Sale' : 'For Rent';

  // Footer Colors
  const colors = {
    dark: '#0a2a3a',
    accent: '#f9b234',
    light: '#f8f9fa',
    white: '#ffffff',
    gray: '#6c757d',
    success: '#28a745'
  };

  return (
    <>
      <div
        style={{
          background: colors.white,
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 5px 15px rgba(0,0,0,0.08)',
          transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
          <img
            src={imageUrl}
            alt={property.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
            onError={() => setImageError(true)}
          />
          
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              ...getPurposeStyle(property.purpose),
              padding: '5px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              {purposeText}
            </span>
            <span style={{
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              padding: '5px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '500'
            }}>
              ID: {property.id}
            </span>
          </div>
          
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ff4757';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FaHeart size={14} style={{ color: '#666' }} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div style={{ padding: '20px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: colors.dark,
            marginBottom: '10px',
            lineHeight: '1.4'
          }}>
            {property.title}
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '15px' }}>
            <FaMapMarkerAlt size={12} style={{ color: colors.accent }} />
            <span style={{ color: colors.gray, fontSize: '13px' }}>{property.location}</span>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderTop: '1px solid #eee',
            borderBottom: '1px solid #eee',
            marginBottom: '15px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: colors.light, padding: '5px 10px', borderRadius: '8px' }}>
              <FaBed size={14} style={{ color: colors.dark }} />
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#333' }}>{property.bedrooms || 3} Beds</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: colors.light, padding: '5px 10px', borderRadius: '8px' }}>
              <FaBath size={14} style={{ color: colors.dark }} />
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#333' }}>{property.bathrooms || 2} Baths</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: colors.light, padding: '5px 10px', borderRadius: '8px' }}>
              <FaVectorSquare size={14} style={{ color: colors.dark }} />
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#333' }}>{property.size}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: '20px', fontWeight: '800', color: colors.accent, letterSpacing: '-0.5px' }}>
                {formatPrice(property.price)}
              </span>
              {property.purpose === 'rent' && <span style={{ fontSize: '12px', color: colors.gray, marginLeft: '2px' }}>/month</span>}
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowContactPopup(true);
                }}
                style={{
                  background: colors.dark,
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.accent;
                  e.currentTarget.style.color = colors.dark;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.dark;
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FaPhone size={12} /> Contact
              </button>
              
              <Link
                to={`/property/${property.id}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'transparent',
                  border: `2px solid ${colors.dark}`,
                  color: colors.dark,
                  padding: '6px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.dark;
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = colors.dark;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Details
              </Link>
            </div>
          </div>
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