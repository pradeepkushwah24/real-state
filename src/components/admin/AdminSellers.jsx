import React, { useState } from 'react';

const AdminSellers = () => {
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: 'Amit Kumar',
      propertyType: 'House',
      size: '2500 sq.ft',
      price: '₹1.5 Cr',
      location: 'Noida',
      status: 'pending',
      timestamp: '2024-03-02 11:45 AM',
      images: 4,
      videos: 1
    },
    {
      id: 2,
      name: 'Sneha Reddy',
      propertyType: 'Flat',
      size: '1800 sq.ft',
      price: '₹95 Lakhs',
      location: 'Gurugram',
      status: 'approved',
      timestamp: '2024-03-02 10:30 AM',
      images: 6,
      videos: 2
    },
    {
      id: 3,
      name: 'Rajesh Khanna',
      propertyType: 'Plot',
      size: '300 sq.yd',
      price: '₹75 Lakhs',
      location: 'Greater Noida',
      status: 'pending',
      timestamp: '2024-03-02 09:15 AM',
      images: 3,
      videos: 0
    },
    {
      id: 4,
      name: 'Pooja Malhotra',
      propertyType: 'Commercial',
      size: '1500 sq.ft',
      price: '₹2.2 Cr',
      location: 'Delhi',
      status: 'rejected',
      timestamp: '2024-03-01 04:20 PM',
      images: 5,
      videos: 1
    }
  ]);

  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const containerStyle = {
    background: '#fff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    color: '#1e3c72',
    fontSize: '24px',
    marginBottom: '20px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const thStyle = {
    textAlign: 'left',
    padding: '12px',
    background: '#f8f9fa',
    borderBottom: '2px solid #e0e0e0',
    color: '#333',
    fontWeight: 600
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
    color: '#666'
  };

  const statusBadgeStyle = (status) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    background: status === 'approved' ? '#d4edda' : 
                status === 'rejected' ? '#f8d7da' : '#fff3cd',
    color: status === 'approved' ? '#155724' : 
           status === 'rejected' ? '#721c24' : '#856404'
  });

  const actionBtnStyle = {
    padding: '4px 8px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 500
  };

  const viewBtnStyle = {
    ...actionBtnStyle,
    background: '#17a2b8',
    color: '#fff'
  };

  const approveBtnStyle = {
    ...actionBtnStyle,
    background: '#28a745',
    color: '#fff'
  };

  const rejectBtnStyle = {
    ...actionBtnStyle,
    background: '#dc3545',
    color: '#fff'
  };

  const modalOverlayStyle = {
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
  };

  const modalStyle = {
    background: '#fff',
    borderRadius: '10px',
    padding: '30px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative'
  };

  const modalCloseStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666'
  };

  const handleApprove = (id) => {
    setSellers(sellers.map(seller => 
      seller.id === id ? {...seller, status: 'approved'} : seller
    ));
    alert('Property approved and published successfully');
  };

  const handleReject = (id) => {
    setSellers(sellers.map(seller => 
      seller.id === id ? {...seller, status: 'rejected'} : seller
    ));
    alert('Property rejected');
  };

  const handleViewDetails = (seller) => {
    setSelectedSeller(seller);
    setShowDetails(true);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Sellers List</h2>

      <div style={{overflowX: 'auto'}}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Seller Name</th>
              <th style={thStyle}>Property Type</th>
              <th style={thStyle}>Size</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Media</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map(seller => (
              <tr key={seller.id}>
                <td style={tdStyle}>{seller.name}</td>
                <td style={tdStyle}>{seller.propertyType}</td>
                <td style={tdStyle}>{seller.size}</td>
                <td style={tdStyle}>{seller.price}</td>
                <td style={tdStyle}>{seller.location}</td>
                <td style={tdStyle}>
                  {seller.images} 📷 | {seller.videos} 🎥
                </td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(seller.status)}>
                    {seller.status}
                  </span>
                </td>
                <td style={tdStyle}>
                  <button 
                    style={viewBtnStyle}
                    onClick={() => handleViewDetails(seller)}
                    onMouseEnter={(e) => e.target.style.background = '#138496'}
                    onMouseLeave={(e) => e.target.style.background = '#17a2b8'}
                  >
                    View
                  </button>
                  {seller.status === 'pending' && (
                    <>
                      <button 
                        style={approveBtnStyle}
                        onClick={() => handleApprove(seller.id)}
                        onMouseEnter={(e) => e.target.style.background = '#218838'}
                        onMouseLeave={(e) => e.target.style.background = '#28a745'}
                      >
                        Approve
                      </button>
                      <button 
                        style={rejectBtnStyle}
                        onClick={() => handleReject(seller.id)}
                        onMouseEnter={(e) => e.target.style.background = '#c82333'}
                        onMouseLeave={(e) => e.target.style.background = '#dc3545'}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetails && selectedSeller && (
        <div style={modalOverlayStyle} onClick={() => setShowDetails(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <button style={modalCloseStyle} onClick={() => setShowDetails(false)}>×</button>
            
            <h3 style={{color: '#1e3c72', marginBottom: '20px'}}>
              Property Details - {selectedSeller.name}
            </h3>
            
            <div style={{marginBottom: '15px'}}>
              <strong>Property Type:</strong> {selectedSeller.propertyType}
            </div>
            <div style={{marginBottom: '15px'}}>
              <strong>Size:</strong> {selectedSeller.size}
            </div>
            <div style={{marginBottom: '15px'}}>
              <strong>Price:</strong> {selectedSeller.price}
            </div>
            <div style={{marginBottom: '15px'}}>
              <strong>Location:</strong> {selectedSeller.location}
            </div>
            <div style={{marginBottom: '15px'}}>
              <strong>Uploaded:</strong> {selectedSeller.timestamp}
            </div>
            <div style={{marginBottom: '15px'}}>
              <strong>Photos:</strong> {selectedSeller.images} files
            </div>
            <div style={{marginBottom: '15px'}}>
              <strong>Videos:</strong> {selectedSeller.videos} files
            </div>
            
            <div style={{marginTop: '20px', textAlign: 'right'}}>
              <button 
                style={{
                  padding: '8px 16px',
                  background: '#1e3c72',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSellers;