import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaBuilding, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('Please enter username and password');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://real-state-backend-xb5z.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        
        if (rememberMe) {
          localStorage.setItem('rememberAdmin', 'true');
        }
        
        toast.success('Login successful! Redirecting to dashboard...');
        
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
        
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f7fa',
      padding: '20px',
      margin: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    card: {
      background: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      width: '100%',
      maxWidth: '400px',
      overflow: 'hidden',
      margin: '0 auto'
    },
    header: {
      background: '#ffffff',
      padding: '30px 25px 15px',
      textAlign: 'center',
      borderBottom: '1px solid #eef2f6'
    },
    logoWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '15px'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      background: '#0a2a3a',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logoText: {
      fontSize: '22px',
      fontWeight: '700'
    },
    logoMain: {
      color: '#0a2a3a'
    },
    logoAccent: {
      color: '#f9b234'
    },
    title: {
      color: '#0a2a3a',
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '5px'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '12px'
    },
    form: {
      padding: '25px'
    },
    inputGroup: {
      marginBottom: '18px',
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#94a3b8',
      fontSize: '16px'
    },
    input: {
      width: '100%',
      padding: '12px 12px 12px 40px',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      outline: 'none',
      background: '#f8fafc'
    },
    passwordToggle: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      color: '#94a3b8',
      fontSize: '16px'
    },
    options: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '22px',
      fontSize: '13px'
    },
    checkbox: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      cursor: 'pointer',
      color: '#475569'
    },
    button: {
      width: '100%',
      padding: '12px',
      background: '#0a2a3a',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    footer: {
      textAlign: 'center',
      padding: '18px 25px 22px',
      borderTop: '1px solid #eef2f6',
      backgroundColor: '#ffffff'
    },
    websiteLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      color: '#0a2a3a',
      textDecoration: 'none',
      fontSize: '13px',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    demoText: {
      fontSize: '11px',
      color: '#94a3b8',
      marginTop: '12px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logoWrapper}>
            <div style={styles.logoIcon}>
              <FaBuilding size={22} style={{ color: '#f9b234' }} />
            </div>
            <div style={styles.logoText}>
              <span style={styles.logoMain}>4PGR</span>
              <span style={styles.logoAccent}> Realty</span>
            </div>
          </div>
          <h1 style={styles.title}>Admin Login</h1>
          <p style={styles.subtitle}>Access the 4PGR Real Estate Management Dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaUser style={styles.inputIcon} />
            <input
              type="text"
              name="username"
              placeholder="Username / Email"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#f9b234';
                e.target.style.background = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.background = '#f8fafc';
              }}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <FaLock style={styles.inputIcon} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#f9b234';
                e.target.style.background = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.background = '#f8fafc';
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          <div style={styles.options}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span>Remember me</span>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#f9b234';
                e.currentTarget.style.color = '#0a2a3a';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = '#0a2a3a';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
          >
            {loading ? (
              <>
                <div className="spinner-small"></div>
                Authenticating...
              </>
            ) : (
              <>
                <FaShieldAlt /> Login to Dashboard
              </>
            )}
          </button>
        </form>
        
        <div style={styles.footer}>
          <Link to="/" style={styles.websiteLink}>
            <FaArrowLeft size={11} /> Go to Website
          </Link>
          <p style={styles.demoText}>
            Demo: admin@4pgr.com / admin123
          </p>
        </div>
      </div>
      
      <style>{`
        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 480px) {
          .admin-card {
            margin: 0 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;