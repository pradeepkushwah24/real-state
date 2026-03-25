import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash, FaBuilding, FaBed, FaBath, FaVectorSquare, FaMapMarkerAlt, FaSearch, FaDownload, FaFilter, FaTimes, FaPlus, FaUpload, FaImage, FaLink, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageInputType, setImageInputType] = useState('url');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    price: '',
    location: '',
    size: '',
    type: 'house',
    purpose: 'sale',
    bedrooms: '',
    bathrooms: '',
    description: '',
    images: [],
    status: 'active'
  });
  const [imageUrls, setImageUrls] = useState(['']);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedPreviews, setUploadedPreviews] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setError('No token found. Please login again.');
        setLoading(false);
        return;
      }
      
      const response = await fetch('https://real-state-backend-xb5z.onrender.com/api/admin-properties', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setProperties(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch properties');
        toast.error(data.message || 'Failed to fetch properties');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Network error. Please check if backend is running.');
      toast.error('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://real-state-backend-xb5z.onrender.com/admin-properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Property deleted successfully');
        fetchProperties();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const generatePropertyId = () => {
    const prefix = '4PGR';
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}${randomNum}`;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title required';
    }
    if (!formData.price.trim()) {
      newErrors.price = 'Price required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location required';
    }
    if (!formData.size.trim()) {
      newErrors.size = 'Size required';
    }
    
    if (imageInputType === 'url') {
      const validUrls = imageUrls.filter(url => url.trim() !== '');
      if (validUrls.length === 0) {
        newErrors.images = 'At least one image required';
      }
    } else {
      if (uploadedPreviews.length === 0) {
        newErrors.images = 'At least one image required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      toast.error('Only image files allowed');
      return;
    }
    
    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      toast.error('Each image must be less than 5MB');
      return;
    }
    
    if (uploadedFiles.length + files.length > 6) {
      toast.error('Maximum 6 images allowed');
      return;
    }
    
    setUploading(true);
    
    try {
      for (const file of files) {
        const previewUrl = URL.createObjectURL(file);
        setUploadedPreviews(prev => [...prev, previewUrl]);
      }
      
      setUploadedFiles([...uploadedFiles, ...files]);
      setFormData({
        ...formData,
        images: [...formData.images, ...uploadedPreviews]
      });
      
      if (errors.images) {
        setErrors({ ...errors, images: null });
      }
      
      toast.success(`${files.length} image(s) selected`);
    } catch (error) {
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleImageUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    setFormData({
      ...formData,
      images: newUrls.filter(url => url.trim() !== '')
    });
    
    if (value.trim() && errors.images) {
      setErrors({ ...errors, images: null });
    }
  };

  const addImageUrl = () => {
    if (imageUrls.length < 6) {
      setImageUrls([...imageUrls, '']);
    } else {
      toast.warning('Maximum 6 images allowed');
    }
  };

  const removeImageUrl = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
  };

  const removeUploadedImage = (index) => {
    const newPreviews = uploadedPreviews.filter((_, i) => i !== index);
    setUploadedPreviews(newPreviews);
    if (newPreviews.length > 0 && errors.images) {
      setErrors({ ...errors, images: null });
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors');
      return;
    }
    
    const allImages = imageInputType === 'url' 
      ? imageUrls.filter(url => url.trim() !== '')
      : uploadedPreviews;
    
    const propertyId = formData.id || generatePropertyId();
    const submitData = {
      ...formData,
      id: propertyId,
      images: allImages
    };
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://real-state-backend-xb5z.onrender.com/api/admin-properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Property added successfully!');
        setShowAddModal(false);
        setFormData({
          id: '',
          title: '',
          price: '',
          location: '',
          size: '',
          type: 'house',
          purpose: 'sale',
          bedrooms: '',
          bathrooms: '',
          description: '',
          images: [],
          status: 'active'
        });
        setImageUrls(['']);
        setUploadedFiles([]);
        setUploadedPreviews([]);
        setImageInputType('url');
        setErrors({});
        fetchProperties();
      } else {
        toast.error(data.message || 'Failed to add property');
      }
    } catch (error) {
      toast.error('Connection error');
    }
  };

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: { background: '#d1fae5', color: '#065f46' },
      inactive: { background: '#fee2e2', color: '#991b1b' }
    };
    const style = statusStyles[status] || statusStyles.active;
    return {
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '600',
      background: style.background,
      color: style.color,
      display: 'inline-block'
    };
  };

  const getTypeBadge = (type) => {
    const typeStyles = {
      house: { background: '#1e3c72', color: '#fff' },
      apartment: { background: '#2a5298', color: '#fff' },
      plot: { background: '#28a745', color: '#fff' },
      commercial: { background: '#f9b234', color: '#1e3c72' }
    };
    const style = typeStyles[type] || typeStyles.house;
    return {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '500',
      background: style.background,
      color: style.color,
      display: 'inline-block'
    };
  };

  const colors = {
    dark: '#0a2a3a',
    accent: '#f9b234',
    light: '#f8f9fa',
    white: '#ffffff',
    gray: '#6c757d',
    error: '#dc3545'
  };

  const styles = {
    container: {
      background: colors.white,
      borderRadius: '12px',
      padding: '0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      width: '100%',
      overflowX: 'auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      borderBottom: '1px solid #e2e8f0',
      flexWrap: 'wrap',
      gap: '10px'
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: colors.dark,
      margin: 0
    },
    stats: {
      fontSize: '12px',
      color: colors.gray,
      marginTop: '2px'
    },
    addButton: {
      padding: '6px 12px',
      background: colors.accent,
      color: colors.dark,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontWeight: '600',
      fontSize: '12px'
    },
    filters: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    searchInput: {
      padding: '6px 10px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '12px',
      width: '180px',
      outline: 'none'
    },
    filterSelect: {
      padding: '6px 10px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '12px',
      background: colors.white,
      cursor: 'pointer'
    },
    refreshBtn: {
      padding: '6px 10px',
      background: '#f1f5f9',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '12px'
    },
    tableWrapper: {
      overflowX: 'auto',
      width: '100%'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '900px'
    },
    th: {
      textAlign: 'left',
      padding: '10px 12px',
      background: '#f8fafc',
      borderBottom: '1px solid #e2e8f0',
      fontWeight: '600',
      color: colors.dark,
      fontSize: '12px'
    },
    td: {
      padding: '10px 12px',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '12px',
      color: '#334155'
    },
    btnView: {
      padding: '4px 8px',
      background: '#3b82f6',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '5px',
      fontSize: '11px'
    },
    btnDelete: {
      padding: '4px 8px',
      background: '#ef4444',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px',
      padding: '15px',
      borderTop: '1px solid #e2e8f0',
      flexWrap: 'wrap'
    },
    pageBtn: {
      padding: '4px 8px',
      background: '#f1f5f9',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      background: colors.white,
      borderRadius: '12px',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '85vh',
      overflow: 'auto',
      padding: '20px'
    },
    modalTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: colors.dark,
      marginBottom: '15px'
    },
    imageTypeToggle: {
      display: 'flex',
      gap: '8px',
      marginBottom: '15px',
      borderBottom: '1px solid #e2e8f0',
      paddingBottom: '8px'
    },
    toggleBtn: (isActive) => ({
      padding: '5px 12px',
      background: isActive ? colors.accent : 'transparent',
      color: isActive ? colors.dark : colors.gray,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontWeight: isActive ? '600' : '500',
      fontSize: '12px'
    }),
    formGroup: {
      marginBottom: '12px'
    },
    label: {
      display: 'block',
      marginBottom: '4px',
      fontWeight: '500',
      color: colors.dark,
      fontSize: '12px'
    },
    required: {
      color: colors.error,
      marginLeft: '3px'
    },
    errorText: {
      color: colors.error,
      fontSize: '10px',
      marginTop: '3px',
      display: 'block'
    },
    input: {
      width: '100%',
      padding: '8px 10px',
      border: `1px solid ${errors.title || errors.price || errors.location || errors.size ? colors.error : '#e2e8f0'}`,
      borderRadius: '6px',
      fontSize: '12px',
      outline: 'none'
    },
    select: {
      width: '100%',
      padding: '8px 10px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '12px',
      background: colors.white
    },
    textarea: {
      width: '100%',
      padding: '8px 10px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '12px',
      resize: 'vertical',
      minHeight: '60px'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px',
      marginBottom: '12px'
    },
    uploadArea: {
      border: `2px dashed ${errors.images ? colors.error : '#e2e8f0'}`,
      borderRadius: '8px',
      padding: '15px',
      textAlign: 'center',
      background: colors.light,
      cursor: 'pointer'
    },
    uploadIcon: {
      fontSize: '24px',
      color: colors.accent,
      marginBottom: '5px'
    },
    imageUrlRow: {
      display: 'flex',
      gap: '8px',
      marginBottom: '8px',
      alignItems: 'center'
    },
    addImageBtn: {
      padding: '4px 10px',
      background: '#f1f5f9',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px',
      marginTop: '5px'
    },
    previewGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
      gap: '8px',
      marginTop: '10px'
    },
    previewItem: {
      position: 'relative',
      aspectRatio: '1',
      borderRadius: '6px',
      overflow: 'hidden',
      border: '1px solid #e2e8f0'
    },
    previewImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    removePreviewBtn: {
      position: 'absolute',
      top: '2px',
      right: '2px',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: 'rgba(0,0,0,0.7)',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      fontSize: '10px'
    },
    modalButtons: {
      display: 'flex',
      gap: '10px',
      marginTop: '15px'
    },
    submitBtn: {
      flex: 1,
      padding: '8px',
      background: colors.accent,
      color: colors.dark,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '13px'
    },
    cancelBtn: {
      flex: 1,
      padding: '8px',
      background: '#f1f5f9',
      color: colors.gray,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '13px'
    },
    errorBox: {
      background: '#fee2e2',
      color: '#991b1b',
      padding: '15px',
      borderRadius: '8px',
      textAlign: 'center',
      margin: '15px'
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorBox}>
          <FaExclamationTriangle size={20} style={{ marginBottom: '8px' }} />
          <strong>Error:</strong> {error}
          <br />
          <button onClick={fetchProperties} style={{ marginTop: '8px', padding: '5px 12px', background: colors.accent, border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Properties</h2>
          <p style={styles.stats}>Total: {properties.length}</p>
        </div>
        
        <div style={styles.filters}>
          <button onClick={() => setShowAddModal(true)} style={styles.addButton}>
            <FaPlus size={10} /> Add
          </button>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button onClick={fetchProperties} style={styles.refreshBtn}>
            <FaDownload size={10} /> Refresh
          </button>
        </div>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Beds</th>
              <th style={styles.th}>Baths</th>
              <th style={styles.th}>Size</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
             </tr>
          </thead>
          <tbody>
            {currentProperties.map((property) => (
              <tr key={property.id}>
                <td style={styles.td}>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{property.id?.slice(-6)}</span>
                 </td>
                <td style={styles.td}>
                  <strong style={{ fontSize: '12px' }}>{property.title?.slice(0, 25)}{property.title?.length > 25 ? '...' : ''}</strong>
                 </td>
                <td style={styles.td}>
                  <span style={getTypeBadge(property.type)}>{property.type?.slice(0, 3)}</span>
                 </td>
                <td style={styles.td}>
                  <strong style={{ color: colors.accent, fontSize: '12px' }}>{property.price?.slice(0, 12)}</strong>
                 </td>
                <td style={styles.td}>
                  <FaMapMarkerAlt size={10} style={{ marginRight: '3px', color: colors.accent }} />
                  <span style={{ fontSize: '11px' }}>{property.location?.slice(0, 20)}</span>
                 </td>
                <td style={styles.td}>
                  <FaBed size={10} style={{ marginRight: '3px' }} /> {property.bedrooms || 0}
                 </td>
                <td style={styles.td}>
                  <FaBath size={10} style={{ marginRight: '3px' }} /> {property.bathrooms || 0}
                 </td>
                <td style={styles.td}>{property.size?.slice(0, 12)}</td>
                <td style={styles.td}>
                  <span style={getStatusBadge(property.status)}>{property.status}</span>
                 </td>
                <td style={styles.td}>
                  <button style={styles.btnView} onClick={() => window.open(`/property/${property.id}`, '_blank')}>
                    <FaEye size={10} /> View
                  </button>
                  <button style={styles.btnDelete} onClick={() => handleDelete(property.id)}>
                    <FaTrash size={10} /> Del
                  </button>
                 </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button style={styles.pageBtn} onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>First</button>
          <button style={styles.pageBtn} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
          <span style={{ fontSize: '11px' }}>{currentPage} / {totalPages}</span>
          <button style={styles.pageBtn} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
          <button style={styles.pageBtn} onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
        </div>
      )}

      {/* Add Property Modal - Compact */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Add Property</h3>
            
            <div style={styles.imageTypeToggle}>
              <button onClick={() => setImageInputType('url')} style={styles.toggleBtn(imageInputType === 'url')}>
                <FaLink size={10} /> URL
              </button>
              <button onClick={() => setImageInputType('upload')} style={styles.toggleBtn(imageInputType === 'upload')}>
                <FaUpload size={10} /> Upload
              </button>
            </div>
            
            <form onSubmit={handleAddProperty}>
              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>ID</label>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <input
                      type="text"
                      placeholder="Auto"
                      value={formData.id}
                      onChange={(e) => setFormData({...formData, id: e.target.value})}
                      style={styles.input}
                    />
                    <button type="button" onClick={() => setFormData({...formData, id: generatePropertyId()})} style={{ padding: '0 8px', background: colors.light, border: '1px solid #e2e8f0', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>Gen</button>
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Title <span style={styles.required}>*</span></label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={{ ...styles.input, borderColor: errors.title ? colors.error : '#e2e8f0' }} />
                  {errors.title && <span style={styles.errorText}>{errors.title}</span>}
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Price <span style={styles.required}>*</span></label>
                  <input type="text" required placeholder="₹1.25 Cr" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} style={{ ...styles.input, borderColor: errors.price ? colors.error : '#e2e8f0' }} />
                  {errors.price && <span style={styles.errorText}>{errors.price}</span>}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Location <span style={styles.required}>*</span></label>
                  <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={{ ...styles.input, borderColor: errors.location ? colors.error : '#e2e8f0' }} />
                  {errors.location && <span style={styles.errorText}>{errors.location}</span>}
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Size <span style={styles.required}>*</span></label>
                  <input type="text" required placeholder="3500 sq.ft" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} style={{ ...styles.input, borderColor: errors.size ? colors.error : '#e2e8f0' }} />
                  {errors.size && <span style={styles.errorText}>{errors.size}</span>}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} style={styles.select}>
                    <option value="house">House</option>
                    <option value="apartment">Apt</option>
                    <option value="plot">Plot</option>
                    <option value="commercial">Comm</option>
                  </select>
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Purpose</label>
                  <select value={formData.purpose} onChange={(e) => setFormData({...formData, purpose: e.target.value})} style={styles.select}>
                    <option value="sale">Sale</option>
                    <option value="rent">Rent</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} style={styles.select}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Beds</label>
                  <input type="number" min="0" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} style={styles.input} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Baths</label>
                  <input type="number" min="0" value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} style={styles.input} />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={styles.textarea} placeholder="Optional" />
              </div>

              {/* Image Input */}
              {imageInputType === 'url' ? (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Images <span style={styles.required}>*</span></label>
                  {imageUrls.map((url, index) => (
                    <div key={index} style={styles.imageUrlRow}>
                      <input type="text" placeholder="Image URL" value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} style={{ ...styles.input, flex: 1 }} />
                      {index > 0 && <button type="button" onClick={() => removeImageUrl(index)} style={{ padding: '4px 8px', background: '#fee2e2', border: 'none', borderRadius: '4px', cursor: 'pointer' }}><FaTimes size={10} /></button>}
                    </div>
                  ))}
                  <button type="button" onClick={addImageUrl} style={styles.addImageBtn}>+ Add URL</button>
                  {errors.images && <span style={styles.errorText}>{errors.images}</span>}
                </div>
              ) : (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Upload <span style={styles.required}>*</span></label>
                  <div style={styles.uploadArea} onClick={() => document.getElementById('image-upload-input').click()}>
                    <div style={styles.uploadIcon}><FaImage /></div>
                    <p style={{ fontSize: '11px' }}>Click to upload</p>
                    <input id="image-upload-input" type="file" accept="image/*" multiple onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
                  </div>
                  {uploading && <p style={{ fontSize: '11px', textAlign: 'center' }}>Uploading...</p>}
                  {uploadedPreviews.length > 0 && (
                    <div style={styles.previewGrid}>
                      {uploadedPreviews.map((preview, idx) => (
                        <div key={idx} style={styles.previewItem}>
                          <img src={preview} alt="" style={styles.previewImage} />
                          <button type="button" onClick={() => removeUploadedImage(idx)} style={styles.removePreviewBtn}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.images && <span style={styles.errorText}>{errors.images}</span>}
                </div>
              )}

              <div style={styles.modalButtons}>
                <button type="button" onClick={() => setShowAddModal(false)} style={styles.cancelBtn}>Cancel</button>
                <button type="submit" style={styles.submitBtn}>Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProperties;