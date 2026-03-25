import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaWhatsapp, FaTrash, FaEye, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminBuyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBuyers, setSelectedBuyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setError('Please login again');
        setLoading(false);
        return;
      }
      
      const response = await fetch('https://real-state-backend-xb5z.onrender.com/api/buyers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setBuyers(data.data || []);
      } else {
        setError(data.message || 'Failed to fetch buyers');
        toast.error(data.message || 'Failed to fetch buyers');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Network error. Please check backend.');
      toast.error('Network error. Please check backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this buyer?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://real-state-backend-xb5z.onrender.com/api/buyers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Buyer deleted');
        fetchBuyers();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedBuyers(buyers.map(b => b.id));
    } else {
      setSelectedBuyers([]);
    }
  };

  const handleSelect = (id) => {
    if (selectedBuyers.includes(id)) {
      setSelectedBuyers(selectedBuyers.filter(b => b !== id));
    } else {
      setSelectedBuyers([...selectedBuyers, id]);
    }
  };

  const handleForward = (type) => {
    const selected = buyers.filter(b => selectedBuyers.includes(b.id));
    toast.success(`Forwarding ${selected.length} buyers via ${type}`);
  };

  // Filter buyers
  const filteredBuyers = buyers.filter(buyer =>
    buyer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buyer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    buyer.phone?.includes(searchTerm) ||
    buyer.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBuyers = filteredBuyers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBuyers.length / itemsPerPage);

  const styles = {
    container: {
      background: '#fff',
      borderRadius: '16px',
      padding: '0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      width: '100%',
      overflowX: 'auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      borderBottom: '1px solid #e2e8f0',
      flexWrap: 'wrap',
      gap: '15px'
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1e3c72',
      margin: 0
    },
    stats: {
      fontSize: '14px',
      color: '#64748b',
      marginTop: '4px'
    },
    searchBox: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    },
    searchInput: {
      padding: '8px 12px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      width: '250px',
      outline: 'none'
    },
    refreshBtn: {
      padding: '8px 12px',
      background: '#f1f5f9',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    },
    forwardActions: {
      display: 'flex',
      gap: '10px'
    },
    tableWrapper: {
      overflowX: 'auto',
      width: '100%'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '800px'
    },
    th: {
      textAlign: 'left',
      padding: '12px 16px',
      background: '#f8fafc',
      borderBottom: '2px solid #e2e8f0',
      fontWeight: '600',
      color: '#1e3c72',
      fontSize: '13px'
    },
    td: {
      padding: '12px 16px',
      borderBottom: '1px solid #e2e8f0',
      fontSize: '14px',
      color: '#334155'
    },
    btnEmail: {
      padding: '6px 12px',
      background: '#3b82f6',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px'
    },
    btnWhatsapp: {
      padding: '6px 12px',
      background: '#25D366',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px'
    },
    btnDelete: {
      padding: '6px 10px',
      background: '#ef4444',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginLeft: '8px',
      fontSize: '12px'
    },
    btnView: {
      padding: '6px 10px',
      background: '#10b981',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '12px'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      padding: '20px',
      borderTop: '1px solid #e2e8f0',
      flexWrap: 'wrap'
    },
    pageBtn: {
      padding: '6px 12px',
      background: '#f1f5f9',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '13px'
    },
    errorBox: {
      background: '#fee2e2',
      color: '#991b1b',
      padding: '15px',
      borderRadius: '8px',
      margin: '20px',
      textAlign: 'center'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px',
      color: '#64748b'
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorBox}>
          <strong>Error:</strong> {error}
          <br />
          <button 
            onClick={fetchBuyers}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              background: '#f9b234',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
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
          <h2 style={styles.title}>Buyers List</h2>
          <p style={styles.stats}>Total: {buyers.length} buyers</p>
        </div>
        
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by name, email, phone, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={fetchBuyers} style={styles.refreshBtn}>
            <FaDownload /> Refresh
          </button>
        </div>
        
        {selectedBuyers.length > 0 && (
          <div style={styles.forwardActions}>
            <button style={styles.btnEmail} onClick={() => handleForward('email')}>
              <FaEnvelope /> Email ({selectedBuyers.length})
            </button>
            <button style={styles.btnWhatsapp} onClick={() => handleForward('whatsapp')}>
              <FaWhatsapp /> WhatsApp ({selectedBuyers.length})
            </button>
          </div>
        )}
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={selectedBuyers.length === buyers.length && buyers.length > 0}
                />
              </th>
              <th style={styles.th}>Property ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Mobile</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBuyers.map((buyer) => (
              <tr key={buyer.id}>
                <td style={styles.td}>
                  <input
                    type="checkbox"
                    checked={selectedBuyers.includes(buyer.id)}
                    onChange={() => handleSelect(buyer.id)}
                  />
                </td>
                <td style={styles.td}>
                  <span style={{
                    background: '#f1f5f9',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}>
                    {buyer.property_id || 'N/A'}
                  </span>
                </td>
                <td style={styles.td}>
                  <strong>{buyer.name}</strong>
                </td>
                <td style={styles.td}>
                  <a href={`tel:${buyer.phone}`} style={{ color: '#1e3c72', textDecoration: 'none' }}>
                    <FaPhone size={12} style={{ marginRight: '4px' }} /> {buyer.phone}
                  </a>
                </td>
                <td style={styles.td}>
                  {buyer.email?.length > 25 ? buyer.email.substring(0, 22) + '...' : buyer.email}
                </td>
                <td style={styles.td}>
                  <FaMapMarkerAlt size={12} style={{ marginRight: '4px', color: '#f9b234' }} />
                  {buyer.city}
                </td>
                <td style={styles.td}>
                  <FaCalendarAlt size={12} style={{ marginRight: '4px', color: '#64748b' }} />
                  {new Date(buyer.created_at).toLocaleDateString()}
                </td>
                <td style={styles.td}>
                  <button style={styles.btnView} onClick={() => alert('View: ' + buyer.name)}>
                    <FaEye /> View
                  </button>
                  <button style={styles.btnDelete} onClick={() => handleDelete(buyer.id)}>
                    <FaTrash /> Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {currentBuyers.length === 0 && (
          <div style={styles.emptyState}>
            <p>No buyers found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button style={styles.pageBtn} onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            First
          </button>
          <button style={styles.pageBtn} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button style={styles.pageBtn} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
          <button style={styles.pageBtn} onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBuyers;