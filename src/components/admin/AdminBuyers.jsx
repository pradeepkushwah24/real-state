import React, { useState } from 'react';

const AdminBuyers = () => {
  const [selectedBuyers, setSelectedBuyers] = useState([]);
  const [buyers] = useState([
    {
      id: 1,
      name: 'Rahul Sharma',
      mobile: '9876543210',
      city: 'Delhi',
      propertyId: 'RE1001',
      timestamp: '2024-03-02 10:30 AM'
    },
    {
      id: 2,
      name: 'Priya Patel',
      mobile: '8765432109',
      city: 'Mumbai',
      propertyId: 'RE1002',
      timestamp: '2024-03-02 11:45 AM'
    },
    {
      id: 3,
      name: 'Amit Singh',
      mobile: '7654321098',
      city: 'Noida',
      propertyId: 'RE1003',
      timestamp: '2024-03-02 12:15 PM'
    },
    {
      id: 4,
      name: 'Neha Gupta',
      mobile: '6543210987',
      city: 'Gurugram',
      propertyId: 'RE1004',
      timestamp: '2024-03-02 02:20 PM'
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      mobile: '5432109876',
      city: 'Faridabad',
      propertyId: 'RE1005',
      timestamp: '2024-03-02 03:45 PM'
    }
  ]);

  const containerStyle = {
    background: '#fff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const titleStyle = {
    color: '#1e3c72',
    fontSize: '24px',
    margin: 0
  };

  const forwardActionsStyle = {
    display: 'flex',
    gap: '10px'
  };

  const emailBtnStyle = {
    padding: '8px 16px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background 0.3s ease'
  };

  const whatsappBtnStyle = {
    padding: '8px 16px',
    background: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background 0.3s ease'
  };

  const tableWrapperStyle = {
    overflowX: 'auto'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
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

  const checkboxStyle = {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  };

  const rowHoverStyle = {
    background: '#f5f5f5'
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
      setSelectedBuyers(selectedBuyers.filter(bId => bId !== id));
    } else {
      setSelectedBuyers([...selectedBuyers, id]);
    }
  };

  const handleForward = (type) => {
    const selectedData = buyers.filter(b => selectedBuyers.includes(b.id));
    console.log(`Forwarding via ${type}:`, selectedData);
    alert(`Selected buyers forwarded to ${type}`);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Buyers List</h2>
        {selectedBuyers.length > 0 && (
          <div style={forwardActionsStyle}>
            <button 
              style={emailBtnStyle}
              onClick={() => handleForward('email')}
              onMouseEnter={(e) => e.target.style.background = '#0056b3'}
              onMouseLeave={(e) => e.target.style.background = '#007bff'}
            >
              <i className="fas fa-envelope" style={{marginRight: '5px'}}></i>
              Forward to Email
            </button>
            <button 
              style={whatsappBtnStyle}
              onClick={() => handleForward('whatsapp')}
              onMouseEnter={(e) => e.target.style.background = '#128C7E'}
              onMouseLeave={(e) => e.target.style.background = '#25D366'}
            >
              <i className="fab fa-whatsapp" style={{marginRight: '5px'}}></i>
              Forward to WhatsApp
            </button>
          </div>
        )}
      </div>

      <div style={tableWrapperStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={selectedBuyers.length === buyers.length && buyers.length > 0}
                  style={checkboxStyle}
                />
              </th>
              <th style={thStyle}>Property ID</th>
              <th style={thStyle}>Buyer Name</th>
              <th style={thStyle}>Mobile</th>
              <th style={thStyle}>City</th>
              <th style={thStyle}>Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, index) => (
              <tr 
                key={buyer.id}
                style={selectedBuyers.includes(buyer.id) ? rowHoverStyle : {}}
              >
                <td style={tdStyle}>
                  <input 
                    type="checkbox"
                    checked={selectedBuyers.includes(buyer.id)}
                    onChange={() => handleSelect(buyer.id)}
                    style={checkboxStyle}
                  />
                </td>
                <td style={tdStyle}>{buyer.propertyId}</td>
                <td style={tdStyle}>{buyer.name}</td>
                <td style={tdStyle}>{buyer.mobile}</td>
                <td style={tdStyle}>{buyer.city}</td>
                <td style={tdStyle}>{buyer.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {buyers.length === 0 && (
        <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
          No buyers found
        </div>
      )}
    </div>
  );
};

export default AdminBuyers;