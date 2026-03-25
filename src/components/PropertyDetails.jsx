import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaMapMarkerAlt, FaBed, FaBath, FaVectorSquare, FaPhone, FaEnvelope, FaCheck, FaArrowLeft, FaHeart, FaShare, FaImages, FaVideo, FaChevronLeft, FaChevronRight, FaWhatsapp, FaCalendarAlt, FaUser, FaClock, FaBuilding, FaRulerCombined, FaParking, FaSwimmingPool, FaShieldAlt, FaWifi, FaSnowflake, FaCouch, FaUtensils, FaStar, FaHome } from 'react-icons/fa'
import { getProperty } from '../services/api'
import ContactPopup from './ContactPopup'

const PropertyDetails = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showContactPopup, setShowContactPopup] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    loadProperty()
    window.scrollTo(0, 0)
  }, [id])

  const loadProperty = async () => {
    try {
      const response = await getProperty(id)
      setProperty(response.data.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (!price) return 'Price on Request'
    
    let cleanPrice = price.toString().replace(/[₹,]/g, '').trim()
    
    if (cleanPrice.toLowerCase().includes('lakh')) {
      return `₹${cleanPrice}`
    }
    if (cleanPrice.toLowerCase().includes('cr')) {
      return `₹${cleanPrice}`
    }
    
    const numPrice = parseFloat(cleanPrice)
    if (isNaN(numPrice)) return `₹${price}`
    
    if (numPrice >= 10000000) {
      return `₹${(numPrice / 10000000).toFixed(2)} Cr`
    }
    if (numPrice >= 100000) {
      return `₹${(numPrice / 100000).toFixed(2)} Lakhs`
    }
    return `₹${numPrice.toLocaleString('en-IN')}`
  }

  const nextImage = () => {
    if (property?.images) {
      setSelectedImage((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property?.images) {
      setSelectedImage((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

  const features = [
    { icon: FaSwimmingPool, name: 'Swimming Pool', available: true },
    { icon: FaParking, name: 'Car Parking', available: true },
    { icon: FaShieldAlt, name: '24/7 Security', available: true },
    { icon: FaWifi, name: 'High Speed WiFi', available: true },
    { icon: FaSnowflake, name: 'Air Conditioning', available: true },
    { icon: FaCouch, name: 'Furnished', available: true },
    { icon: FaUtensils, name: 'Modular Kitchen', available: true },
    { icon: FaBuilding, name: 'Lift', available: true }
  ]

  const colors = {
    dark: '#0a2a3a',
    accent: '#f9b234',
    light: '#f8f9fa',
    white: '#ffffff',
    gray: '#6c757d',
    success: '#28a745'
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2 style={{ color: colors.dark }}>Property not found</h2>
        <Link to="/" style={{ color: colors.accent, textDecoration: 'none', marginTop: '20px', display: 'inline-block' }}>
          Back to Home
        </Link>
      </div>
    )
  }

  const images = property.images || [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
  ]

  const videos = property.videos || [
    'https://www.w3schools.com/html/mov_bbb.mp4'
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Back Button */}
      <Link to="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        color: colors.dark,
        textDecoration: 'none',
        marginBottom: '30px',
        padding: '10px 20px',
        background: colors.light,
        borderRadius: '50px',
        transition: 'all 0.3s ease',
        fontSize: '14px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = colors.accent
        e.currentTarget.style.color = colors.dark
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.light
        e.currentTarget.style.color = colors.dark
      }}>
        <FaArrowLeft /> Back to Home
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Left Column - Images & Videos */}
        <div>
          {/* Main Image */}
          <div style={{ position: 'relative' }}>
            <img
              src={images[selectedImage]}
              alt={property.title}
              style={{
                width: '100%',
                height: '450px',
                objectFit: 'cover',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.5)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.accent}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.5)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#fff'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = colors.accent}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Grid - 6 Photos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginTop: '15px' }}>
            {images.slice(0, 6).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx)}
                style={{
                  cursor: 'pointer',
                  border: selectedImage === idx ? `3px solid ${colors.accent}` : '2px solid transparent',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <img
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '80px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Videos Section - 2 Videos */}
          {videos.length > 0 && (
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ color: colors.dark, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
                <FaVideo style={{ color: colors.accent }} /> Property Videos
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                {videos.slice(0, 2).map((video, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedVideo(video)
                      setShowVideoModal(true)
                    }}
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      aspectRatio: '16/9',
                      background: colors.dark
                    }}
                  >
                    <video
                      src={video}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.7
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(0,0,0,0.6)',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.accent,
                      fontSize: '24px'
                    }}>
                      ▶
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Property Info */}
        <div>
          {/* Title & Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: colors.dark, margin: 0, lineHeight: '1.3' }}>{property.title}</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setIsLiked(!isLiked)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaHeart style={{ color: isLiked ? '#ff4757' : colors.gray }} />
              </button>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaShare style={{ color: colors.gray }} />
              </button>
            </div>
          </div>

          {/* Location & Purpose */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaMapMarkerAlt style={{ color: colors.accent }} />
              <span style={{ color: colors.gray }}>{property.location}</span>
            </div>
            <span style={{
              background: property.purpose === 'sale' ? colors.success : colors.accent,
              color: property.purpose === 'sale' ? '#fff' : colors.dark,
              padding: '5px 15px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {property.purpose === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
            <span style={{
              background: colors.light,
              color: colors.gray,
              padding: '5px 12px',
              borderRadius: '20px',
              fontSize: '12px'
            }}>
              ID: {property.id}
            </span>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '25px' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: colors.accent }}>
              {formatPrice(property.price)}
            </span>
            {property.purpose === 'rent' && <span style={{ fontSize: '14px', color: colors.gray }}>/month</span>}
          </div>

          {/* Key Specs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
            padding: '20px',
            background: colors.light,
            borderRadius: '16px',
            marginBottom: '25px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <FaBed size={22} style={{ color: colors.accent, marginBottom: '8px' }} />
              <div><strong>{property.bedrooms || 3}</strong> Bedrooms</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaBath size={22} style={{ color: colors.accent, marginBottom: '8px' }} />
              <div><strong>{property.bathrooms || 2}</strong> Bathrooms</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaVectorSquare size={22} style={{ color: colors.accent, marginBottom: '8px' }} />
              <div><strong>{property.size}</strong></div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ marginBottom: '12px', color: colors.dark, fontSize: '18px', fontWeight: '600' }}>Description</h3>
            <p style={{ color: colors.gray, lineHeight: '1.7', fontSize: '14px' }}>
              {property.description || 'This beautiful property offers modern amenities and prime location. Perfect for families seeking comfort and convenience. Located in a peaceful neighborhood with easy access to schools, hospitals, and shopping centers.'}
            </p>
          </div>

          {/* Features */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ marginBottom: '15px', color: colors.dark, fontSize: '18px', fontWeight: '600' }}>Key Features</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaCheck style={{ color: colors.success, fontSize: '11px' }} />
                    <Icon size={13} style={{ color: colors.dark }} />
                    <span style={{ fontSize: '13px', color: colors.gray }}>{feature.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Contact Buttons */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <button
              onClick={() => setShowContactPopup(true)}
              style={{
                flex: 1,
                background: colors.accent,
                color: colors.dark,
                border: 'none',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(249,178,52,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <FaPhone /> Contact Agent
            </button>
            <button
              style={{
                flex: 1,
                background: colors.dark,
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(10,42,58,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <FaWhatsapp /> WhatsApp
            </button>
          </div>

          {/* Additional Info */}
          <div style={{ padding: '15px', background: colors.light, borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', color: colors.gray }}>Property ID</span>
              <span style={{ fontSize: '12px', fontWeight: '500', color: colors.dark }}>{property.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '12px', color: colors.gray }}>Posted on</span>
              <span style={{ fontSize: '12px', fontWeight: '500', color: colors.dark }}>{new Date(property.created_at).toLocaleDateString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: colors.gray }}>Total Views</span>
              <span style={{ fontSize: '12px', fontWeight: '500', color: colors.dark }}>{property.views || 0} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div
          onClick={() => setShowVideoModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <div style={{ maxWidth: '90%', maxHeight: '90%' }} onClick={(e) => e.stopPropagation()}>
            <video
              src={selectedVideo}
              controls
              autoPlay
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '80vh',
                borderRadius: '12px'
              }}
            />
            <button
              onClick={() => setShowVideoModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {showContactPopup && (
        <ContactPopup
          propertyId={property.id}
          onClose={() => setShowContactPopup(false)}
        />
      )}

      <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(10,42,58,0.1);
          border-top-color: #f9b234;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .property-details-grid {
            grid-template-columns: 1fr !important;
          }
          .thumbnail-grid {
            grid-templateColumns: repeat(4, 1fr) !important;
          }
          .video-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default PropertyDetails