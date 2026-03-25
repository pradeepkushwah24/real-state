import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEye, FaMapMarkerAlt, FaCalendarAlt, FaImages, FaVideo, FaTrash, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setError('No token found. Please login again.');
        setLoading(false);
        return;
      }
      
      const response = await fetch('https://real-state-backend-xb5z.onrender.com/api/sellers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      console.log('Sellers API Response:', data);
      
      if (response.ok && data.success) {
        // ✅ Safe way - don't parse JSON if not needed
        const processedSellers = data.data.map(seller => ({
          ...seller,
          photos: seller.photos || [],
          videos: seller.videos || []
        }));
        setSellers(processedSellers);
      } else {
        setError(data.message || 'Failed to fetch sellers');
        toast.error(data.message || 'Failed to fetch sellers');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Network error. Please check if backend is running.');
      toast.error('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this seller request?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://real-state-backend-xb5z.onrender.com/api/sellers/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Seller approved successfully!');
        fetchSellers();
      } else {
        toast.error(data.message || 'Failed to approve');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Reject this seller request?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://real-state-backend-xb5z.onrender.com/api/sellers/${id}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Seller rejected');
        fetchSellers();
      } else {
        toast.error(data.message || 'Failed to reject');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this seller request?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://real-state-backend-xb5z.onrender.com/api/sellers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Seller deleted');
        fetchSellers();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const handleViewDetails = (seller) => {
    setSelectedSeller(seller);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: { background: '#fef3c7', color: '#92400e' },
      approved: { background: '#d1fae5', color: '#065f46' },
      rejected: { background: '#fee2e2', color: '#991b1b' }
    };
    const style = statusColors[status] || statusColors.pending;
    return {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      background: style.background,
      color: style.color,
      display: 'inline-block'
    };
  };

  const getTypeBadge = (type) => {
    const typeColors = {
      house: { background: '#1e3c72', color: '#fff' },
      apartment: { background: '#2a5298', color: '#fff' },
      plot: { background: '#28a745', color: '#fff' },
      commercial: { background: '#f9b234', color: '#1e3c72' }
    };
    const style = typeColors[type] || typeColors.house;
    return {
      padding: '4px 10px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '500',
      background: style.background,
      color: style.color,
      display: 'inline-block'
    };
  };

  // Filter sellers
  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.property_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || seller.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSellers.length / itemsPerPage);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={fetchSellers} style={{ marginTop: '10px', padding: '8px 16px', background: '#f9b234', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0a2a3a' }}>Seller Requests</h2>
          <p style={{ fontSize: '14px', color: '#666' }}>Total: {sellers.length} | Pending: {sellers.filter(s => s.status === 'pending').length}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px', width: '200px' }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '8px' }}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button onClick={fetchSellers} style={{ padding: '8px 12px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            <FaDownload /> Refresh
          </button>
        </div>
      </div>

      {sellers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
          No sellers found
        </div>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Size</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Location</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSellers.map((seller) => (
                  <tr key={seller.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px' }}><strong>{seller.name}</strong></td>
                    <td style={{ padding: '12px' }}><span style={getTypeBadge(seller.property_type)}>{seller.property_type}</span></td>
                    <td style={{ padding: '12px' }}>{seller.size}</td>
                    <td style={{ padding: '12px' }}><strong style={{ color: '#f9b234' }}>{seller.price}</strong></td>
                    <td style={{ padding: '12px' }}>{seller.location}</td>
                    <td style={{ padding: '12px' }}><span style={getStatusBadge(seller.status)}>{seller.status}</span></td>
                    <td style={{ padding: '12px' }}>{new Date(seller.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>
                      <button onClick={() => handleViewDetails(seller)} style={{ padding: '6px 10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' }}><FaEye /> View</button>
                      {seller.status === 'pending' && (
                        <>
                          <button onClick={() => handleApprove(seller.id)} style={{ padding: '6px 10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' }}><FaCheck /> Approve</button>
                          <button onClick={() => handleReject(seller.id)} style={{ padding: '6px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}><FaTimes /> Reject</button>
                        </>
                      )}
                      <button onClick={() => handleDelete(seller.id)} style={{ padding: '6px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginLeft: '5px' }}><FaTrash /> Del</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} style={{ padding: '6px 12px', background: '#f1f5f9', border: 'none', borderRadius: '6px' }}>First</button>
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} style={{ padding: '6px 12px', background: '#f1f5f9', border: 'none', borderRadius: '6px' }}>Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} style={{ padding: '6px 12px', background: '#f1f5f9', border: 'none', borderRadius: '6px' }}>Next</button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} style={{ padding: '6px 12px', background: '#f1f5f9', border: 'none', borderRadius: '6px' }}>Last</button>
            </div>
          )}
        </>
      )}

      {/* Details Modal */}
      {showModal && selectedSeller && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowModal(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', maxWidth: '500px', width: '90%', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ color: '#0a2a3a', marginBottom: '15px' }}>Property Details</h3>
            <p><strong>Seller:</strong> {selectedSeller.name}</p>
            <p><strong>Property Type:</strong> {selectedSeller.property_type}</p>
            <p><strong>Size:</strong> {selectedSeller.size}</p>
            <p><strong>Price:</strong> {selectedSeller.price}</p>
            <p><strong>Location:</strong> {selectedSeller.location}</p>
            <p><strong>Description:</strong> {selectedSeller.description || 'No description'}</p>
            <button onClick={() => setShowModal(false)} style={{ marginTop: '20px', padding: '10px 20px', background: '#f9b234', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSellers;