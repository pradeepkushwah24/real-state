import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaImage, FaVideo, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { submitSeller } from '../services/api';
import { toast } from 'react-toastify';

const SellProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    size: '',
    price: '',
    location: '',
    description: ''
  });
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name cannot exceed 50 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Enter a valid email address (e.g., name@example.com)';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(value.trim())) return 'Enter a valid 10-digit mobile number (starting with 6-9)';
        return '';
      
      case 'propertyType':
        if (!value) return 'Please select property type';
        return '';
      
      case 'size':
        if (!value.trim()) return 'Size is required';
        const sizeRegex = /^\d+(\s?(sq.ft|sq.yd|acres|sq.m))?$/i;
        if (!sizeRegex.test(value.trim())) return 'Enter valid size (e.g., 1500 sq.ft, 200 sq.yd)';
        return '';
      
      case 'price':
        if (!value.trim()) return 'Price is required';
        const priceRegex = /^[₹]?\s?[\d,]+(\s?(Lakhs|Cr|Crore|month|year))?$/i;
        if (!priceRegex.test(value.trim()) && !/^\d+$/.test(value.replace(/[^0-9]/g, ''))) {
          return 'Enter valid price (e.g., ₹75 Lakhs, ₹1.25 Cr, ₹35,000/month)';
        }
        return '';
      
      case 'location':
        if (!value.trim()) return 'Location is required';
        if (value.trim().length < 2) return 'Location must be at least 2 characters';
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.phone = validateField('phone', formData.phone);
    newErrors.propertyType = validateField('propertyType', formData.propertyType);
    newErrors.size = validateField('size', formData.size);
    newErrors.price = validateField('price', formData.price);
    newErrors.location = validateField('location', formData.location);
    
    // Photos validation
    if (photos.length === 0) {
      newErrors.photos = 'At least one photo is required';
    }
    
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, formData[name]);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone, allow only numbers
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 10) {
        setFormData({
          ...formData,
          [name]: numericValue
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    if (touched[name]) {
      const error = validateField(name, name === 'phone' ? value.replace(/[^0-9]/g, '') : value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setErrors({ ...errors, photos: 'Only image files are allowed (JPG, PNG, GIF)' });
      return;
    }
    
    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      setErrors({ ...errors, photos: 'Each image must be less than 5MB' });
      return;
    }
    
    if (photos.length + files.length > 6) {
      setErrors({ ...errors, photos: 'Maximum 6 photos allowed' });
      return;
    }
    
    setPhotos([...photos, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...previews]);
    
    if (errors.photos) {
      setErrors({ ...errors, photos: '' });
    }
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const invalidFiles = files.filter(file => !file.type.startsWith('video/'));
    if (invalidFiles.length > 0) {
      setErrors({ ...errors, videos: 'Only video files are allowed (MP4, MOV, AVI)' });
      return;
    }
    
    const largeFiles = files.filter(file => file.size > 50 * 1024 * 1024);
    if (largeFiles.length > 0) {
      setErrors({ ...errors, videos: 'Each video must be less than 50MB' });
      return;
    }
    
    if (videos.length + files.length > 2) {
      setErrors({ ...errors, videos: 'Maximum 2 videos allowed' });
      return;
    }
    
    setVideos([...videos, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setVideoPreviews([...videoPreviews, ...previews]);
    
    if (errors.videos) {
      setErrors({ ...errors, videos: '' });
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
    setVideoPreviews(videoPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allTouched = {
      name: true,
      email: true,
      phone: true,
      propertyType: true,
      size: true,
      price: true,
      location: true
    };
    setTouched(allTouched);
    
    if (!validateForm()) {
      const firstError = document.querySelector('.error-text');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setLoading(true);
    
    try {
      const submitData = {
        ...formData,
        photos: photoPreviews,
        videos: videoPreviews
      };
      await submitSeller(submitData);
      toast.success('Property submitted for approval!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit property');
    } finally {
      setLoading(false);
    }
  };

  const footerColors = {
    dark: '#0a2a3a',
    accent: '#f9b234',
    error: '#dc3545'
  };

  const styles = {
    errorText: {
      color: footerColors.error,
      fontSize: '11px',
      marginTop: '5px',
      display: 'block'
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: footerColors.dark,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '30px',
          fontSize: '16px'
        }}
      >
        <FaArrowLeft /> Back to Home
      </button>

      <div style={{
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${footerColors.dark}, ${footerColors.dark}dd)`,
          padding: '30px',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#fff', fontSize: '28px', marginBottom: '10px' }}>List Your Property</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>Get the best price for your property</p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
          {/* Personal Information */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: footerColors.dark, marginBottom: '20px' }}>Personal Information</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Your Name <span style={{ color: footerColors.error }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.name && touched.name ? footerColors.error : '#ddd'}`,
                  borderRadius: '10px',
                  fontSize: '14px'
                }}
              />
              {errors.name && touched.name && <div style={styles.errorText}>{errors.name}</div>}
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Email Address <span style={{ color: footerColors.error }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.email && touched.email ? footerColors.error : '#ddd'}`,
                  borderRadius: '10px',
                  fontSize: '14px'
                }}
              />
              {errors.email && touched.email && <div style={styles.errorText}>{errors.email}</div>}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Phone Number <span style={{ color: footerColors.error }}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="10"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${errors.phone && touched.phone ? footerColors.error : '#ddd'}`,
                  borderRadius: '10px',
                  fontSize: '14px'
                }}
              />
              {errors.phone && touched.phone && <div style={styles.errorText}>{errors.phone}</div>}
            </div>
          </div>

          {/* Property Details */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: footerColors.dark, marginBottom: '20px' }}>Property Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Property Type <span style={{ color: footerColors.error }}>*</span>
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${errors.propertyType && touched.propertyType ? footerColors.error : '#ddd'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    background: '#fff'
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="house">House / Villa</option>
                  <option value="apartment">Apartment / Flat</option>
                  <option value="plot">Plot / Land</option>
                  <option value="commercial">Commercial / Shop</option>
                </select>
                {errors.propertyType && touched.propertyType && <div style={styles.errorText}>{errors.propertyType}</div>}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Size (sq.ft) <span style={{ color: footerColors.error }}>*</span>
                </label>
                <input
                  type="text"
                  name="size"
                  placeholder="e.g., 1500 sq.ft"
                  value={formData.size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${errors.size && touched.size ? footerColors.error : '#ddd'}`,
                    borderRadius: '10px',
                    fontSize: '14px'
                  }}
                />
                {errors.size && touched.size && <div style={styles.errorText}>{errors.size}</div>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Price <span style={{ color: footerColors.error }}>*</span>
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="e.g., ₹75 Lakhs"
                  value={formData.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${errors.price && touched.price ? footerColors.error : '#ddd'}`,
                    borderRadius: '10px',
                    fontSize: '14px'
                  }}
                />
                {errors.price && touched.price && <div style={styles.errorText}>{errors.price}</div>}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Location <span style={{ color: footerColors.error }}>*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="City, Area"
                  value={formData.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${errors.location && touched.location ? footerColors.error : '#ddd'}`,
                    borderRadius: '10px',
                    fontSize: '14px'
                  }}
                />
                {errors.location && touched.location && <div style={styles.errorText}>{errors.location}</div>}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Description</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Photos Upload */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: footerColors.dark, marginBottom: '20px' }}>
              Upload Photos <span style={{ color: footerColors.error }}>*</span> (Max 6)
            </h3>
            <div style={{
              border: `2px dashed ${errors.photos ? footerColors.error : '#ddd'}`,
              borderRadius: '10px',
              padding: '30px',
              textAlign: 'center',
              background: '#f8f9fa'
            }}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
                id="photo-upload"
              />
              <label htmlFor="photo-upload" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: footerColors.accent,
                color: footerColors.dark,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                <FaImage /> Choose Photos
              </label>
              <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                {photos.length}/6 photos selected
              </p>
            </div>
            {errors.photos && <div style={styles.errorText}>{errors.photos}</div>}

            {photoPreviews.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                gap: '10px',
                marginTop: '20px'
              }}>
                {photoPreviews.map((preview, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <img src={preview} alt={`Preview ${idx + 1}`} style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }} />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: 'rgba(0,0,0,0.7)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '25px',
                        height: '25px',
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Videos Upload */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: footerColors.dark, marginBottom: '20px' }}>Upload Videos (Max 2) - Optional</h3>
            <div style={{
              border: '2px dashed #ddd',
              borderRadius: '10px',
              padding: '30px',
              textAlign: 'center',
              background: '#f8f9fa'
            }}>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoUpload}
                style={{ display: 'none' }}
                id="video-upload"
              />
              <label htmlFor="video-upload" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: footerColors.accent,
                color: footerColors.dark,
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}>
                <FaVideo /> Choose Videos
              </label>
              <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                {videos.length}/2 videos selected
              </p>
            </div>
            {errors.videos && <div style={styles.errorText}>{errors.videos}</div>}

            {videoPreviews.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '10px',
                marginTop: '20px'
              }}>
                {videoPreviews.map((preview, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <video src={preview} controls style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }} />
                    <button
                      type="button"
                      onClick={() => removeVideo(idx)}
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        background: 'rgba(0,0,0,0.7)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '25px',
                        height: '25px',
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              background: footerColors.accent,
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '600',
              color: footerColors.dark,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = footerColors.dark;
                e.currentTarget.style.color = footerColors.accent;
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = footerColors.accent;
                e.currentTarget.style.color = footerColors.dark;
              }
            }}
          >
            {loading ? 'Submitting...' : <><FaCheckCircle style={{ marginRight: '8px' }} /> Submit Property for Approval</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellProperty;