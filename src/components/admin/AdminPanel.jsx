import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AdminPanel = () => {
  const panelStyle = {
    display: 'flex',
    minHeight: 'calc(100vh - 200px)',
    background: '#f8f9fa'
  };

  const sidebarStyle = {
    width: '250px',
    background: '#1e3c72',
    color: '#fff',
    padding: '30px 0'
  };

  const sidebarTitleStyle = {
    padding: '0 20px',
    marginBottom: '30px',
    fontSize: '20px',
    color: '#fff'
  };

  const navStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const linkStyle = {
    padding: '12px 20px',
    color: '#fff',
    textDecoration: 'none',
    opacity: 0.8,
    transition: 'all 0.3s ease'
  };

  const activeLinkStyle = {
    ...linkStyle,
    opacity: 1,
    background: 'rgba(255,255,255,0.2)',
    borderLeft: '3px solid #f9b234'
  };

  const contentStyle = {
    flex: 1,
    padding: '30px',
    background: '#f8f9fa'
  };

  return (
    <div style={panelStyle}>
      <div style={sidebarStyle}>
        <h2 style={sidebarTitleStyle}>Admin Panel</h2>
        <nav style={navStyle}>
          <NavLink 
            to="/admin" 
            end
            style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/buyers"
            style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
          >
            Buyers List
          </NavLink>
          <NavLink 
            to="/admin/sellers"
            style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
          >
            Sellers List
          </NavLink>
          <NavLink 
            to="/admin/properties"
            style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
          >
            Properties
          </NavLink>
        </nav>
      </div>
      
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;