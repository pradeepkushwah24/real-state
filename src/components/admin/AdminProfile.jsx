import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSave, 
  FaArrowLeft, FaUserShield, FaCalendarAlt, FaCheckCircle, 
  FaTimesCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    // Check password strength
    const password = formData.newPassword;
    
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    setPasswordChecks(checks);
    
    // Calculate strength (0-5)
    let strength = 0;
    if (checks.length) strength++;
    if (checks.uppercase) strength++;
    if (checks.lowercase) strength++;
    if (checks.number) strength++;
    if (checks.special) strength++;
    setPasswordStrength(strength);
    
    // Check password match
    if (formData.confirmPassword) {
      setPasswordMatch(formData.newPassword === formData.confirmPassword);
    } else {
      setPasswordMatch(true);
    }
  }, [formData.newPassword, formData.confirmPassword]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://real-state-backend-xb5z.onrender.com/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setAdmin(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.currentPassword) {
      toast.error('Please enter current password');
      return;
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordStrength < 3) {
      toast.error('Please choose a stronger password');
      return;
    }
    
    setUpdating(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://real-state-backend-xb5z.onrender.com/api/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Password updated successfully!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordStrength(0);
      } else {
        toast.error(data.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Connection error. Please check if backend is running.');
    } finally {
      setUpdating(false);
    }
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return 'Very Weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    if (passwordStrength === 4) return 'Strong';
    return 'Very Strong';
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return '#dc3545';
    if (passwordStrength === 1) return '#dc3545';
    if (passwordStrength === 2) return '#ffc107';
    if (passwordStrength === 3) return '#28a745';
    if (passwordStrength === 4) return '#28a745';
    return '#17a2b8';
  };

  const getStrengthWidth = () => {
    return (passwordStrength / 5) * 100;
  };

  const formatDate = (date) => {
    if (!date) return 'Not available';
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const colors = {
    dark: '#0a2a3a',
    accent: '#f9b234',
    light: '#f8f9fa',
    white: '#ffffff',
    gray: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107'
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: colors.dark,
      textDecoration: 'none',
      marginBottom: '20px',
      fontSize: '14px'
    },
    card: {
      background: colors.white,
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    header: {
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '2px solid #f0f0f0'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: colors.dark,
      marginBottom: '5px'
    },
    subtitle: {
      fontSize: '14px',
      color: colors.gray
    },
    profileInfo: {
      background: colors.light,
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '30px'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '15px'
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '10px',
      background: colors.white,
      borderRadius: '10px'
    },
    infoIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: `rgba(249,178,52,0.1)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    infoLabel: {
      fontSize: '12px',
      color: colors.gray,
      marginBottom: '2px'
    },
    infoValue: {
      fontSize: '16px',
      fontWeight: '500',
      color: colors.dark
    },
    formGroup: {
      marginBottom: '25px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: colors.dark,
      fontSize: '14px'
    },
    inputWrapper: {
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '12px 15px 12px 45px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    inputIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#94a3b8'
    },
    passwordToggle: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      color: '#94a3b8'
    },
    strengthBar: {
      marginTop: '8px',
      height: '4px',
      background: '#e2e8f0',
      borderRadius: '2px',
      overflow: 'hidden'
    },
    strengthFill: {
      width: `${getStrengthWidth()}%`,
      height: '100%',
      background: getStrengthColor(),
      transition: 'width 0.3s ease'
    },
    strengthText: {
      fontSize: '11px',
      marginTop: '5px',
      color: getStrengthColor(),
      fontWeight: '500'
    },
    checksGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px',
      marginTop: '10px'
    },
    checkItem: (isValid) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '11px',
      color: isValid ? colors.success : colors.gray
    }),
    matchStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '8px',
      fontSize: '12px'
    },
    button: {
      width: '100%',
      padding: '14px',
      background: colors.accent,
      color: colors.dark,
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      marginTop: '20px'
    },
    note: {
      background: '#f0f9ff',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '12px',
      color: colors.dark,
      marginTop: '15px'
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3>Profile not found</h3>
          <Link to="/admin" style={{ color: colors.accent }}>Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Link to="/admin" style={styles.backButton}>
        <FaArrowLeft /> Back to Dashboard
      </Link>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Profile Settings</h2>
          <p style={styles.subtitle}>Update your account information and password</p>
        </div>
        
        {/* Profile Information */}
        <div style={styles.profileInfo}>
          <div style={styles.infoGrid}>
            <div style={styles.infoRow}>
              <div style={styles.infoIcon}>
                <FaUser size={20} style={{ color: colors.accent }} />
              </div>
              <div>
                <div style={styles.infoLabel}>Full Name</div>
                <div style={styles.infoValue}>{admin.name || 'Admin User'}</div>
              </div>
            </div>
            
            <div style={styles.infoRow}>
              <div style={styles.infoIcon}>
                <FaEnvelope size={20} style={{ color: colors.accent }} />
              </div>
              <div>
                <div style={styles.infoLabel}>Email Address</div>
                <div style={styles.infoValue}>{admin.email || admin.username}</div>
              </div>
            </div>
            
            <div style={styles.infoRow}>
              <div style={styles.infoIcon}>
                <FaUserShield size={20} style={{ color: colors.accent }} />
              </div>
              <div>
                <div style={styles.infoLabel}>Role</div>
                <div style={styles.infoValue}>Administrator</div>
              </div>
            </div>
            
            <div style={styles.infoRow}>
              <div style={styles.infoIcon}>
                <FaCalendarAlt size={20} style={{ color: colors.accent }} />
              </div>
              <div>
                <div style={styles.infoLabel}>Account Since</div>
                <div style={styles.infoValue}>{formatDate(admin.created_at)}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Change Password Form */}
        <h3 style={{ fontSize: '18px', marginBottom: '20px', color: colors.dark }}>Change Password</h3>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Current Password</label>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.inputIcon} />
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                name="currentPassword"
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                style={styles.passwordToggle}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>New Password</label>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.inputIcon} />
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={styles.passwordToggle}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {formData.newPassword && (
              <>
                <div style={styles.strengthBar}>
                  <div style={styles.strengthFill}></div>
                </div>
                <div style={styles.strengthText}>
                  Password Strength: {getStrengthText()}
                </div>
                <div style={styles.checksGrid}>
                  <div style={styles.checkItem(passwordChecks.length)}>
                    {passwordChecks.length ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                    <span>At least 8 characters</span>
                  </div>
                  <div style={styles.checkItem(passwordChecks.uppercase)}>
                    {passwordChecks.uppercase ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                    <span>Uppercase letter</span>
                  </div>
                  <div style={styles.checkItem(passwordChecks.lowercase)}>
                    {passwordChecks.lowercase ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                    <span>Lowercase letter</span>
                  </div>
                  <div style={styles.checkItem(passwordChecks.number)}>
                    {passwordChecks.number ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                    <span>Number (0-9)</span>
                  </div>
                  <div style={styles.checkItem(passwordChecks.special)}>
                    {passwordChecks.special ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                    <span>Special character (!@#$%^&*)</span>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm New Password</label>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.inputIcon} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.passwordToggle}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {formData.confirmPassword && (
              <div style={styles.matchStatus}>
                {passwordMatch ? (
                  <>
                    <FaCheckCircle size={12} style={{ color: colors.success }} />
                    <span style={{ color: colors.success }}>Passwords match</span>
                  </>
                ) : (
                  <>
                    <FaTimesCircle size={12} style={{ color: colors.danger }} />
                    <span style={{ color: colors.danger }}>Passwords do not match</span>
                  </>
                )}
              </div>
            )}
          </div>
          
          <div style={styles.note}>
            <FaExclamationTriangle size={12} style={{ marginRight: '8px', color: colors.accent }} />
            <strong>Password Requirements:</strong> Minimum 8 characters with at least one uppercase, one lowercase, one number, and one special character.
          </div>
          
          <button
            type="submit"
            disabled={updating || !passwordMatch || (formData.newPassword && passwordStrength < 3)}
            style={{
              ...styles.button,
              opacity: (updating || (!passwordMatch && formData.confirmPassword) || (formData.newPassword && passwordStrength < 3)) ? 0.6 : 1,
              cursor: (updating || (!passwordMatch && formData.confirmPassword) || (formData.newPassword && passwordStrength < 3)) ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!updating && passwordMatch && (!formData.newPassword || passwordStrength >= 3)) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(249,178,52,0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {updating ? (
              <>
                <div className="spinner-small"></div>
                Updating...
              </>
            ) : (
              <>
                <FaSave /> Update Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;