import React, { useState } from 'react';

const SellProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    propertyType: '',
    size: '',
    price: '',
    location: '',
    description: '',
    photos: [],
    videos: []
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);

  const containerStyle = {
    padding: '60px 0',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#1e3c72',
    marginBottom: '10px',
    fontSize: '36px'
  };

  const subtitleStyle = {
    textAlign: 'center',
    color: '#666',
    marginBottom: '40px'
  };

  const formStyle = {
    background: '#fff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const sectionStyle = {
    background: '#fff',
    borderRadius: '10px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const sectionHeadingStyle = {
    color: '#1e3c72',
    marginBottom: '20px',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '10px',
    fontSize: '20px'
  };

  const formRowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  };

  const formGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 500,
    color: '#333'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease'
  };

  const selectStyle = {
    ...inputStyle,
    background: '#fff',
    cursor: 'pointer'
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '100px'
  };

  const fileUploadStyle = {
    marginBottom: '20px',
    padding: '20px',
    border: '2px dashed #1e3c72',
    borderRadius: '5px',
    textAlign: 'center',
    background: '#f8f9fa'
  };

  const uploadBtnStyle = {
    display: 'inline-block',
    padding: '12px 24px',
    background: '#1e3c72',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    border: 'none',
    fontSize: '16px'
  };

  const fileCountStyle = {
    display: 'block',
    color: '#666',
    fontSize: '14px',
    marginTop: '10px'
  };

  const previewGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '15px',
    marginTop: '20px'
  };

  const previewItemStyle = {
    position: 'relative',
    paddingBottom: '100%',
    overflow: 'hidden',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const previewImageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const previewVideoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const submitBtnStyle = {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    
    if (type === 'photos') {
      if (files.length + formData.photos.length <= 6) {
        setFormData({
          ...formData,
          photos: [...formData.photos, ...files]
        });
        
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages([...previewImages, ...previews]);
      } else {
        alert('You can only upload up to 6 photos');
      }
    } else if (type === 'videos') {
      if (files.length + formData.videos.length <= 2) {
        setFormData({
          ...formData,
          videos: [...formData.videos, ...files]
        });
        
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewVideos([...previewVideos, ...previews]);
      } else {
        alert('You can only upload up to 2 videos');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const propertyData = {
      ...formData,
      type: 'SELLER',
      timestamp: new Date().toISOString(),
      id: 'RE' + Date.now()
    };
    
    console.log('Property Listing:', propertyData);
    alert('Your property has been submitted for approval!');
    
    // Reset form
    setFormData({
      name: '',
      propertyType: '',
      size: '',
      price: '',
      location: '',
      description: '',
      photos: [],
      videos: []
    });
    setPreviewImages([]);
    setPreviewVideos([]);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>List Your Property</h1>
      <p style={subtitleStyle}>Fill in the details below to list your property</p>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Personal Information Section */}
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Personal Information</h3>
          
          <div style={formGroupStyle}>
            <label style={labelStyle}>Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              required
              onFocus={(e) => e.target.style.borderColor = '#1e3c72'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>
        </div>

        {/* Property Details Section */}
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Property Details</h3>
          
          <div style={formRowStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Property Type *</label>
              <select 
                name="propertyType" 
                value={formData.propertyType} 
                onChange={handleChange} 
                style={selectStyle}
                required
              >
                <option value="">Select Type</option>
                <option value="house">House</option>
                <option value="flat">Flat/Apartment</option>
                <option value="plot">Plot/Land</option>
                <option value="commercial">Commercial Shop</option>
              </select>
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Size (sq.ft) *</label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={formRowStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Price *</label>
              <input
                type="text"
                name="price"
                placeholder="e.g., ₹50 Lakhs"
                value={formData.price}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              style={textareaStyle}
              placeholder="Describe your property..."
            ></textarea>
          </div>
        </div>

        {/* Photos Upload Section */}
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Upload Photos (Max 6)</h3>
          <div style={fileUploadStyle}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileUpload(e, 'photos')}
              id="photo-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="photo-upload" style={uploadBtnStyle}>
              <i className="fas fa-camera" style={{ marginRight: '10px' }}></i>
              Choose Photos
            </label>
            <span style={fileCountStyle}>{formData.photos.length}/6 photos uploaded</span>
          </div>
          
          {previewImages.length > 0 && (
            <div style={previewGridStyle}>
              {previewImages.map((src, index) => (
                <div key={index} style={previewItemStyle}>
                  <img src={src} alt={`Preview ${index + 1}`} style={previewImageStyle} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Videos Upload Section */}
        <div style={sectionStyle}>
          <h3 style={sectionHeadingStyle}>Upload Videos (Max 2)</h3>
          <div style={fileUploadStyle}>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => handleFileUpload(e, 'videos')}
              id="video-upload"
              style={{ display: 'none' }}
            />
            <label htmlFor="video-upload" style={uploadBtnStyle}>
              <i className="fas fa-video" style={{ marginRight: '10px' }}></i>
              Choose Videos
            </label>
            <span style={fileCountStyle}>{formData.videos.length}/2 videos uploaded</span>
          </div>
          
          {previewVideos.length > 0 && (
            <div style={previewGridStyle}>
              {previewVideos.map((src, index) => (
                <div key={index} style={previewItemStyle}>
                  <video src={src} style={previewVideoStyle} controls />
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          style={submitBtnStyle}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Submit Property
        </button>
      </form>
    </div>
  );
};

export default SellProperty;