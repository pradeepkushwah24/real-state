import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBuilding, FaTag, FaUser, FaBars, FaTimes, FaHeart, FaBell } from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;
  
  // Check if current page is Home page
  const isHomePage = location.pathname === '/';

  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/buy', label: 'Buy', icon: FaBuilding },
    { path: '/rent', label: 'Rent', icon: FaTag },
    { path: '/sell', label: 'Sell', icon: FaTag },
  ];

  const colors = {
    primary: '#1e3c72',
    accent: '#f9b234',
    white: '#ffffff',
    footerBg: '#0a2a3a',
    danger: '#dc3545',
    info: '#17a2b8',
    light: '#f8f9fa'
  };

  // Background logic: 
  // - Home page: transparent at top, footer color on scroll
  // - Other pages: always footer color
  const getBackground = () => {
    if (!isHomePage) {
      return colors.footerBg; // Always footer color for non-home pages
    }
    return isScrolled ? colors.footerBg : 'transparent'; // Home page: transparent at top, color on scroll
  };

  return (
    <>
      <header style={{
        background: getBackground(),
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background 0.3s ease',
        boxShadow: (isScrolled || !isHomePage) ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 20px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            gap: '8px'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              background: `linear-gradient(135deg, ${colors.accent}, #e5a01a)`,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3c72' }}>4P</span>
            </div>
            <div>
              <span style={{ 
                fontSize: '20px', 
                fontWeight: '800', 
                color: colors.white,
                textShadow: (isHomePage && !isScrolled) ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'
              }}>4PGR</span>
              <span style={{ 
                fontSize: '20px', 
                fontWeight: '800', 
                color: colors.accent,
                textShadow: (isHomePage && !isScrolled) ? '0 1px 2px rgba(0,0,0,0.5)' : 'none'
              }}> Realty</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav style={{ 
            display: 'flex', 
            gap: '4px', 
            alignItems: 'center',
            background: (isScrolled || !isHomePage) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.3)',
            padding: '3px',
            borderRadius: '50px',
          }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isItemActive = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    textDecoration: 'none',
                    color: isItemActive ? colors.accent : colors.white,
                    fontWeight: isItemActive ? '600' : '500',
                    fontSize: '13px',
                    padding: '6px 14px',
                    borderRadius: '50px',
                    transition: 'all 0.2s ease',
                    background: isItemActive ? `rgba(249,178,52,0.2)` : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isItemActive) {
                      e.currentTarget.style.background = `rgba(249,178,52,0.2)`;
                      e.currentTarget.style.color = colors.accent;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isItemActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = colors.white;
                    }
                  }}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Favorites */}
            <button
              style={{
                background: (isScrolled || !isHomePage) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.3)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: colors.white,
                position: 'relative'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = colors.danger}
              onMouseLeave={(e) => e.currentTarget.style.background = (isScrolled || !isHomePage) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.3)'}
            >
              <FaHeart size={14} />
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                background: colors.accent,
                color: '#1e3c72',
                fontSize: '9px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>3</span>
            </button>

            {/* Notifications */}
            <button
              style={{
                background: (isScrolled || !isHomePage) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.3)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: colors.white,
                position: 'relative'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = colors.info}
              onMouseLeave={(e) => e.currentTarget.style.background = (isScrolled || !isHomePage) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.3)'}
            >
              <FaBell size={14} />
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                background: colors.danger,
                color: colors.white,
                fontSize: '9px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>5</span>
            </button>

            {/* User Profile */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.accent}, #e5a01a)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: `1px solid ${colors.white}`,
                  boxShadow: (isHomePage && !isScrolled) ? '0 2px 5px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                <FaUser style={{ color: '#1e3c72', fontSize: '14px' }} />
              </div>
              
              {isProfileOpen && (
                <div style={{
                  position: 'absolute',
                  top: '45px',
                  right: '0',
                  width: '250px',
                  background: colors.white,
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  overflow: 'hidden',
                  zIndex: 1000
                }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${colors.primary}, #2a5298)`,
                    padding: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: colors.accent,
                      margin: '0 auto 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FaUser size={20} style={{ color: '#1e3c72' }} />
                    </div>
                    <h4 style={{ color: colors.white, fontSize: '14px' }}>Guest User</h4>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px' }}>Welcome to 4PGR Realty</p>
                  </div>
                  <div style={{ padding: '10px' }}>
                    <Link to="/login" style={{
                      display: 'block',
                      padding: '8px 12px',
                      color: colors.primary,
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '13px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = colors.light}>
                      Sign In
                    </Link>
                    <Link to="/register" style={{
                      display: 'block',
                      padding: '8px 12px',
                      color: colors.primary,
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '13px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = colors.light}>
                      Create Account
                    </Link>
                    <hr style={{ margin: '8px 0' }} />
                    <Link to="/dashboard" style={{
                      display: 'block',
                      padding: '8px 12px',
                      color: colors.primary,
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '13px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = colors.light}>
                      Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                background: (isScrolled || !isHomePage) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.3)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                fontSize: '18px',
                color: colors.white,
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 1000,
            }}
          />
          
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '280px',
            height: '100vh',
            background: colors.white,
            zIndex: 1001,
            padding: '20px',
            overflowY: 'auto'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '20px', 
              paddingBottom: '15px', 
              borderBottom: `1px solid ${colors.light}` 
            }}>
              <div>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: colors.primary }}>4PGR</span>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: colors.accent }}> Realty</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                style={{ 
                  background: colors.light, 
                  border: 'none', 
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  fontSize: '16px', 
                  cursor: 'pointer'
                }}
              >
                <FaTimes />
              </button>
            </div>
            
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      color: isActive(item.path) ? colors.accent : colors.primary,
                      fontWeight: isActive(item.path) ? '600' : '500',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: isActive(item.path) ? `rgba(249,178,52,0.1)` : colors.light,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px'
                    }}
                  >
                    <Icon size={14} /> {item.label}
                  </Link>
                );
              })}
            </nav>

            <div style={{
              marginTop: '20px',
              paddingTop: '15px',
              borderTop: `1px solid ${colors.light}`
            }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/login" style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '8px',
                  background: colors.primary,
                  color: colors.white,
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px'
                }}>
                  Sign In
                </Link>
                <Link to="/register" style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '8px',
                  background: 'transparent',
                  border: `1px solid ${colors.primary}`,
                  color: colors.primary,
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '13px'
                }}>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 1024px) {
          nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .favorites-btn, .notifications-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;