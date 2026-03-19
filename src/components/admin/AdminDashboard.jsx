import React from 'react';

const AdminDashboard = () => {
  const dashboardStyle = {
    background: '#fff',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    color: '#1e3c72',
    marginBottom: '30px',
    fontSize: '24px'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  };

  const statCardStyle = {
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    color: '#fff',
    padding: '25px',
    borderRadius: '10px',
    textAlign: 'center'
  };

  const statValueStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  const statLabelStyle = {
    fontSize: '16px',
    opacity: 0.9
  };

  const recentActivityStyle = {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px'
  };

  const activityTitleStyle = {
    color: '#1e3c72',
    marginBottom: '20px',
    fontSize: '18px'
  };

  const activityItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
    borderBottom: '1px solid #ddd'
  };

  const stats = [
    { label: 'Total Properties', value: '156' },
    { label: 'Active Buyers', value: '89' },
    { label: 'Pending Sellers', value: '23' },
    { label: 'Total Inquiries', value: '345' }
  ];

  const recentActivities = [
    { action: 'New buyer inquiry', property: 'RE1001', time: '5 mins ago' },
    { action: 'Property listed for sale', property: 'RE1023', time: '1 hour ago' },
    { action: 'New seller registration', property: 'Seller: Raj Kumar', time: '2 hours ago' },
    { action: 'Property approved', property: 'RE1089', time: '3 hours ago' }
  ];

  return (
    <div style={dashboardStyle}>
      <h2 style={titleStyle}>Dashboard Overview</h2>
      
      <div style={statsGridStyle}>
        {stats.map((stat, index) => (
          <div key={index} style={statCardStyle}>
            <div style={statValueStyle}>{stat.value}</div>
            <div style={statLabelStyle}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={recentActivityStyle}>
        <h3 style={activityTitleStyle}>Recent Activity</h3>
        {recentActivities.map((activity, index) => (
          <div key={index} style={activityItemStyle}>
            <span>
              <strong>{activity.action}</strong> - {activity.property}
            </span>
            <span style={{color: '#666', fontSize: '14px'}}>{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;