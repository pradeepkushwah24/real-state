import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = {
    header: {
      background: isScrolled ? 'rgba(255,255,255,0.98)' : '#ffffff',
      boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: '1px solid rgba(249,178,52,0.1)'
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isScrolled ? '8px 20px' : '12px 20px',
      maxWidth: '1400px',
      margin: '0 auto',
      transition: 'padding 0.3s ease',
      '@media (max-width: 768px)': {
        padding: '10px 15px'
      }
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      gap: '4px'
    },
    logoIcon: {
      fontSize: '24px',
      color: '#f9b234',
      transition: 'transform 0.3s ease'
    },
    logoText: {
      fontSize: '22px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.5px',
      '@media (max-width: 480px)': {
        fontSize: '18px'
      }
    },
    logoSpan: {
      color: '#f9b234',
      fontWeight: '800',
      fontSize: '22px',
      '@media (max-width: 480px)': {
        fontSize: '18px'
      }
    },

    // Desktop Navigation
    nav: {
      display: 'flex',
      gap: '5px',
      alignItems: 'center',
      '@media (max-width: 1024px)': {
        display: isMobileMenuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#fff',
        padding: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        gap: '10px',
        animation: 'slideDown 0.3s ease'
      }
    },
    navItem: {
      position: 'relative',
      listStyle: 'none',
      width: '100%'
    },
    navLink: (isActive) => ({
      textDecoration: 'none',
      color: isActive ? '#1e3c72' : '#4a5568',
      fontWeight: isActive ? '600' : '500',
      fontSize: '14px',
      padding: '8px 12px',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      background: isActive ? 'rgba(249,178,52,0.08)' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer',
      border: 'none',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      whiteSpace: 'nowrap',
      '@media (max-width: 1024px)': {
        fontSize: '16px',
        padding: '12px 15px',
        width: '100%'
      }
    }),
    activeIndicator: {
      position: 'absolute',
      bottom: '-2px',
      left: '12px',
      right: '12px',
      height: '2px',
      background: 'linear-gradient(90deg, #f9b234, #f5af19)',
      borderRadius: '2px 2px 0 0',
      '@media (max-width: 1024px)': {
        display: 'none'
      }
    },

    // Right Section
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    // Search Box - Desktop
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      background: '#f5f7fa',
      borderRadius: '50px',
      padding: '3px 3px 3px 12px',
      border: '1px solid #e0e7ff',
      transition: 'all 0.3s ease',
      '@media (max-width: 768px)': {
        display: 'none' // Hide on mobile
      }
    },
    searchInput: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      padding: '6px 0',
      width: '160px',
      fontSize: '13px',
      color: '#333',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    },
    searchButton: {
      background: 'linear-gradient(135deg, #f9b234, #f5af19)',
      border: 'none',
      borderRadius: '50px',
      padding: '6px 12px',
      color: '#1e3c72',
      fontWeight: '600',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },

    // Admin Button
    adminButton: {
      background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      color: '#fff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '50px',
      fontWeight: '600',
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 10px rgba(30,60,114,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      textDecoration: 'none',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      '@media (max-width: 480px)': {
        padding: '6px 12px',
        fontSize: '12px'
      }
    },

    // User Avatar
    userMenu: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    avatar: {
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #f9b234, #f5af19)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1e3c72',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '14px',
      '@media (max-width: 480px)': {
        width: '32px',
        height: '32px',
        fontSize: '12px'
      }
    },

    // Mobile Menu Button
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      fontSize: '22px',
      color: '#1e3c72',
      cursor: 'pointer',
      padding: '5px',
      '@media (max-width: 1024px)': {
        display: 'block'
      }
    },

    // Mobile Search
    mobileSearch: {
      display: 'none',
      '@media (max-width: 768px)': {
        display: 'flex',
        alignItems: 'center',
        background: '#f5f7fa',
        borderRadius: '50px',
        padding: '5px 5px 5px 15px',
        border: '1px solid #e0e7ff',
        margin: '10px 15px'
      }
    },

    // Icons
    icon: {
      fontSize: '14px',
      '@media (max-width: 1024px)': {
        fontSize: '16px'
      }
    },

    // Animation
    '@keyframes slideDown': {
      from: {
        opacity: 0,
        transform: 'translateY(-10px)'
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)'
      }
    }
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: 'fa-home' },
    { path: '/properties', label: 'Properties', icon: 'fa-building' },
    { path: '/sell', label: 'Sell', icon: 'fa-tag' },
    { path: '/about', label: 'About', icon: 'fa-info-circle' },
    { path: '/contact', label: 'Contact', icon: 'fa-phone' }
  ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🏠</span>
          <span style={styles.logoText}>AKPS</span>
          <span style={styles.logoSpan}>Realty</span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <div key={item.path} style={styles.navItem}>
              <Link 
                to={item.path} 
                style={styles.navLink(isActive(item.path))}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'rgba(249,178,52,0.1)';
                    e.currentTarget.style.color = '#f9b234';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#4a5568';
                  }
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className={`fas ${item.icon}`} style={styles.icon}></i>
                <span>{item.label}</span>
              </Link>
              {isActive(item.path) && <span style={styles.activeIndicator}></span>}
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div style={styles.rightSection}>
          {/* Desktop Search */}
          <div style={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search..." 
              style={styles.searchInput}
            />
            <button style={styles.searchButton}>
              <i className="fas fa-search" style={{fontSize: '11px'}}></i>
              <span>Go</span>
            </button>
          </div>

          {/* Admin Button */}
          <Link 
            to="/admin" 
            style={styles.adminButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(30,60,114,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(30,60,114,0.2)';
            }}
          >
            <i className="fas fa-user-shield" style={{fontSize: '12px'}}></i>
            <span className="admin-text">Admin</span>
          </Link>

          {/* User Avatar */}
          <div style={styles.userMenu}>
            <div 
              style={styles.avatar}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(249,178,52,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className="fas fa-user" style={{fontSize: '14px'}}></i>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Search (visible only on mobile) */}
      {isMobileMenuOpen && (
        <div style={styles.mobileSearch}>
          <input 
            type="text" 
            placeholder="Search properties..." 
            style={{...styles.searchInput, width: '100%'}}
          />
          <button style={styles.searchButton}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      )}

      {/* Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          * {
            font-family: 'Inter', 'Segoe UI', sans-serif;
          }

          @media (max-width: 1024px) {
            .admin-text {
              display: none;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;