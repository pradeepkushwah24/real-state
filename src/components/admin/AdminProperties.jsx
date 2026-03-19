import React, { useState } from 'react';

const AdminProperties = () => {
  const [properties, setProperties] = useState([
    {
      id: 'RE1001',
      title: 'Luxury Villa with Pool',
      price: '₹1.25 Cr',
      location: 'Golf Course Road, Gurugram',
      type: 'House',
      status: 'active',
      views: 245,
      inquiries: 12,
      postedDate: '2024-03-01'
    },
    {
      id: 'RE1002',
      title: '3 BHK Modern Apartment',
      price: '₹85 Lakhs',
      location: 'Sector 62, Noida',
      type: 'Flat',
      status: 'active',
      views: 189,
      inquiries: 8,
      postedDate: '2024-03-01'
    },
    {
      id: 'RE1003',
      title: 'Commercial Shop',
      price: '₹2.5 Cr',
      location: 'Connaught Place, Delhi',
      type: 'Commercial',
      status: 'inactive',
      views: 67,
      inquiries: 3,
      postedDate: '2024-02-28'
    },
    {
      id: 'RE1004',
      title: 'Residential Plot',
      price: '₹45 Lakhs',
      location: 'Greater Noida',
      type: 'Plot',
      status: 'active',
      views: 156,
      inquiries: 15,
      postedDate: '2024-02-29'
    },
    {
      id: 'RE1005',
      title: '5 BHK Luxury Farmhouse',
      price: '₹3.8 Cr',
      location: 'Sohna Road, Gurugram',
      type: 'House',
      status: 'active',
      views: 312,
      inquiries: 24,
      postedDate: '2024-02-27'
    }
  ]);

  const [filter, setFilter] = useState('all');

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
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px'
  };

  const titleStyle = {
    color: '#1e3c72',
    fontSize: '24px',
    margin: 0
  };

  const filterBarStyle = {
    display: 'flex',
    gap: '10px'
  };

  const filterBtnStyle = (active) => ({
    padding: '8px 16px',
    background: active ? '#1e3c72' : '#f8f9fa',
    color: active ? '#fff' : '#333',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'all 0.3s ease'
  });

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

  const statusBadgeStyle = (status) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    background: status === 'active' ? '#d4edda' : '#f8d7da',
    color: status === 'active' ? '#155724' : '#721c24'
  });

  const actionBtnStyle = {
    padding: '4px 8px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    background: '#17a2b8',
    color: '#fff'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const statCardStyle = {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center'
  };

  const statValueStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1e3c72',
    marginBottom: '5px'
  };

  const statLabelStyle = {
    color: '#666',
    fontSize: '14px'
  };

  const filteredProperties = properties.filter(prop => 
    filter === 'all' ? true : prop.status === filter
  );

  const stats = {
    total: properties.length,
    active: properties.filter(p => p.status === 'active').length,
    inactive: properties.filter(p => p.status === 'inactive').length,
    totalInquiries: properties.reduce((sum, p) => sum + p.inquiries, 0),
    totalViews: properties.reduce((sum, p) => sum + p.views, 0)
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Published Properties</h2>
        
        <div style={filterBarStyle}>
          <button 
            style={filterBtnStyle(filter === 'all')}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            style={filterBtnStyle(filter === 'active')}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            style={filterBtnStyle(filter === 'inactive')}
            onClick={() => setFilter('inactive')}
          >
            Inactive
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.total}</div>
          <div style={statLabelStyle}>Total Properties</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.active}</div>
          <div style={statLabelStyle}>Active Properties</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.totalViews}</div>
          <div style={statLabelStyle}>Total Views</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.totalInquiries}</div>
          <div style={statLabelStyle}>Total Inquiries</div>
        </div>
      </div>

      <div style={{overflowX: 'auto'}}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Property ID</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Views</th>
              <th style={thStyle}>Inquiries</th>
              <th style={thStyle}>Posted Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map(property => (
              <tr key={property.id}>
                <td style={tdStyle}>{property.id}</td>
                <td style={tdStyle}>{property.title}</td>
                <td style={tdStyle}>{property.type}</td>
                <td style={tdStyle}>{property.price}</td>
                <td style={tdStyle}>{property.location}</td>
                <td style={tdStyle}>
                  <span style={statusBadgeStyle(property.status)}>
                    {property.status}
                  </span>
                </td>
                <td style={tdStyle}>{property.views}</td>
                <td style={tdStyle}>{property.inquiries}</td>
                <td style={tdStyle}>{property.postedDate}</td>
                <td style={tdStyle}>
                  <button 
                    style={actionBtnStyle}
                    onClick={() => window.open(`/property/${property.id}`, '_blank')}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProperties.length === 0 && (
        <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
          No properties found
        </div>
      )}
    </div>
  );
};

export default AdminProperties;