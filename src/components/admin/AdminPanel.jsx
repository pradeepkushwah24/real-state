import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, FaUsers, FaUserTie, FaBuilding, 
  FaSignOutAlt, FaUserShield, FaUserCircle 
} from 'react-icons/fa';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('admin');
    
    if (!token || !adminData) {
      navigate('/admin/login');
      return;
    }
    
    setAdmin(JSON.parse(adminData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    localStorage.removeItem('rememberAdmin');
    navigate('/admin/login');
  };

  const colors = {
    dark: '#0a2a3a',
    accent: '#f9b234',
    light: '#f8f9fa',
    white: '#ffffff',
    gray: '#6c757d'
  };

  const styles = {
    panel: {
      display: 'flex',
      minHeight: '100vh',
      background: colors.light,
      margin: 0,
      padding: 0
    },
    sidebar: {
      width: '280px',
      background: colors.dark,
      color: '#fff',
      padding: '30px 0',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto',
      zIndex: 100
    },
    sidebarHeader: {
      padding: '0 20px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      marginBottom: '20px'
    },
    logo: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px'
    },
    adminInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginTop: '15px'
    },
    adminAvatar: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      background: colors.accent,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    adminName: {
      fontSize: '14px',
      fontWeight: 'bold'
    },
    adminRole: {
      fontSize: '11px',
      opacity: 0.7
    },
    nav: {
      display: 'flex',
      flexDirection: 'column'
    },
    navLink: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 20px',
      color: isActive ? colors.accent : 'rgba(255,255,255,0.8)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      background: isActive ? 'rgba(249,178,52,0.1)' : 'transparent',
      borderLeft: isActive ? '3px solid #f9b234' : '3px solid transparent',
      cursor: 'pointer'
    }),
    content: {
      flex: 1,
      marginLeft: '280px',
      padding: '30px',
      background: colors.light,
      minHeight: '100vh'
    },
    logoutBtn: {
      marginTop: '30px',
      padding: '12px 20px',
      background: 'rgba(255,255,255,0.1)',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      width: 'calc(100% - 40px)',
      marginLeft: '20px',
      transition: 'all 0.3s ease',
      fontSize: '14px'
    }
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: FaTachometerAlt, end: true },
    { path: '/admin/buyers', label: 'Buyers', icon: FaUsers, end: false },
    { path: '/admin/sellers', label: 'Sellers', icon: FaUserTie, end: false },
    { path: '/admin/properties', label: 'Properties', icon: FaBuilding, end: false },
    { path: '/admin/profile', label: 'Profile Settings', icon: FaUserCircle, end: false }
  ];

  if (!admin) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={styles.panel}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <span>4PGR</span>
            <span style={{ color: colors.accent }}> Admin</span>
          </div>
          <div style={styles.adminInfo}>
            <div style={styles.adminAvatar}>
              <FaUserShield size={20} style={{ color: colors.dark }} />
            </div>
            <div>
              <div style={styles.adminName}>{admin.name || admin.username}</div>
              <div style={styles.adminRole}>Administrator</div>
            </div>
          </div>
        </div>
        
        <nav style={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                style={({ isActive }) => styles.navLink(isActive)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <FaSignOutAlt size={16} />
          <span>Logout</span>
        </button>
      </div>
      
      {/* Main Content */}
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;