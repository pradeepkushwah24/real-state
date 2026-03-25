import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBuilding, FaUsers, FaUserTie, FaEye, FaEnvelope, 
  FaPhone, FaMapMarkerAlt, FaArrowRight, FaHome, 
  FaUserCheck, FaChartLine, FaCalendarAlt, FaClock, FaGlobe,
  FaUserCircle
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalBuyers: 0,
    pendingSellers: 0
  });
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://real-state-backend-xb5z.onrender.com/api/admin/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setAdmin(data.data);
        console.log('Admin Data:', data.data);
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setError('No token found. Please login again.');
        setLoading(false);
        return;
      }
      
      const response = await fetch('https://real-state-backend-xb5z.onrender.com/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      } else {
        setError(data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Network error. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Not yet logged in';
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const colors = {
    dark: '#0a2a3a',
    accent: '#f9b234',
    light: '#f8f9fa',
    white: '#ffffff',
    gray: '#6c757d',
    success: '#28a745'
  };

  const styles = {
    container: {
      padding: '20px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '40px'
    },
    statCard: {
      background: colors.white,
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    },
    statIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px'
    },
    statValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: colors.dark,
      marginBottom: '8px'
    },
    statLabel: {
      fontSize: '14px',
      color: colors.gray,
      marginBottom: '8px'
    },
    statTrend: {
      fontSize: '12px',
      color: colors.success,
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    recentActivity: {
      background: colors.white,
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      marginBottom: '30px'
    },
    activityItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '15px 0',
      borderBottom: '1px solid #f0f0f0',
      cursor: 'pointer'
    },
    activityIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: colors.light,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: colors.dark,
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    // Bottom Bar - Last Login Info (No Background)
    bottomBar: {
      marginTop: '30px',
      paddingTop: '20px',
      borderTop: '1px solid #e9ecef',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px'
    },
    loginInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap'
    },
    loginInfoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '13px',
      color: colors.gray
    },
    userEmail: {
      fontWeight: '600',
      color: colors.dark
    },
    errorBox: {
      background: '#fee2e2',
      color: '#991b1b',
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center',
      marginBottom: '20px'
    }
  };

  const statCards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: FaBuilding,
      color: colors.dark,
      bg: 'rgba(10,42,58,0.1)',
      trend: '+12% from last month',
      link: '/admin/properties'
    },
    {
      title: 'Total Buyers',
      value: stats.totalBuyers,
      icon: FaUsers,
      color: colors.success,
      bg: 'rgba(40,167,69,0.1)',
      trend: '+8% from last month',
      link: '/admin/buyers'
    },
    {
      title: 'Pending Sellers',
      value: stats.pendingSellers,
      icon: FaUserTie,
      color: colors.accent,
      bg: 'rgba(249,178,52,0.1)',
      trend: 'Awaiting approval',
      link: '/admin/sellers'
    }
  ];

  const recentActivities = [
    { icon: FaEye, text: 'New property viewed', time: '5 minutes ago', color: '#17a2b8', link: '/admin/properties' },
    { icon: FaEnvelope, text: 'New inquiry received', time: '1 hour ago', color: '#28a745', link: '/admin/buyers' },
    { icon: FaPhone, text: 'Call scheduled with client', time: '2 hours ago', color: colors.accent, link: '/admin/buyers' },
    { icon: FaMapMarkerAlt, text: 'Site visit completed', time: '3 hours ago', color: colors.dark, link: '/admin/properties' }
  ];

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
          <p>{error}</p>
          <button 
            onClick={fetchDashboardData}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              background: colors.accent,
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link to={stat.link} key={index} style={{ textDecoration: 'none' }}>
              <div 
                style={styles.statCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ ...styles.statIcon, background: stat.bg }}>
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.title}</div>
                <div style={styles.statTrend}>
                  <FaChartLine size={10} /> {stat.trend}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div style={styles.recentActivity}>
        <div style={styles.sectionTitle}>
          <span>📋 Recent Activity</span>
          <Link to="/admin/activity" style={{ fontSize: '13px', color: colors.accent, textDecoration: 'none' }}>
            View All <FaArrowRight size={10} />
          </Link>
        </div>
        {recentActivities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <Link to={activity.link} key={index} style={{ textDecoration: 'none' }}>
              <div 
                style={styles.activityItem}
                onMouseEnter={(e) => e.currentTarget.style.background = colors.light}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ ...styles.activityIcon, background: `${activity.color}10` }}>
                  <Icon size={18} style={{ color: activity.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', color: '#333' }}>{activity.text}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>{activity.time}</div>
                </div>
                <FaArrowRight size={12} style={{ color: '#ccc' }} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Bar - User Email & Last Login Info (No Background Color) */}
      <div style={styles.bottomBar}>
        <div style={styles.loginInfo}>
          <div style={styles.loginInfoItem}>
            <FaUserCircle size={16} style={{ color: colors.accent }} />
            <span>Logged in as:</span>
            <span style={styles.userEmail}>{admin?.email || 'admin@4pgr.com'}</span>
          </div>
          <div style={styles.loginInfoItem}>
            <FaClock size={14} style={{ color: colors.accent }} />
            <span>Last Login:</span>
            <span>{formatDate(admin?.last_login)}</span>
          </div>
          <div style={styles.loginInfoItem}>
            <FaGlobe size={14} style={{ color: colors.accent }} />
            <span>IP:</span>
            <span>{admin?.last_login_ip || '127.0.0.1'}</span>
          </div>
        </div>
        <div style={styles.loginInfoItem}>
          <FaCalendarAlt size={14} style={{ color: colors.gray }} />
          <span>Account since: {formatDate(admin?.created_at)}</span>
        </div>
      </div>

      <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(10,42,58,0.1);
          border-top-color: #f9b234;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;