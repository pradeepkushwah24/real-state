import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaBed, FaBath, FaVectorSquare, FaArrowRight, FaShieldAlt, FaHandshake, FaClock, FaBuilding, FaHome, FaStore, FaTree, FaPhone } from 'react-icons/fa';
import PropertyCard from './PropertyCard';
import SearchBar from './SearchBar';
import { getProperties } from '../services/api';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const response = await getProperties();
      const data = response.data.data || [];
      setProperties(data);
      setFeatured(data.slice(0, 6));
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Luxury Villas', icon: FaHome, count: 124, color: '#1e3c72', bg: 'rgba(30,60,114,0.1)' },
    { name: 'Modern Apartments', icon: FaBuilding, count: 256, color: '#2a5298', bg: 'rgba(42,82,152,0.1)' },
    { name: 'Commercial Spaces', icon: FaStore, count: 89, color: '#f9b234', bg: 'rgba(249,178,52,0.1)' },
    { name: 'Plots & Land', icon: FaTree, count: 67, color: '#28a745', bg: 'rgba(40,167,69,0.1)' }
  ];

  const stats = [
    { value: '1000+', label: 'Properties Sold', icon: FaBuilding },
    { value: '500+', label: 'Happy Clients', icon: FaHandshake },
    { value: '50+', label: 'Cities Covered', icon: FaMapMarkerAlt },
    { value: '24/7', label: 'Support', icon: FaClock }
  ];

  // Responsive styles
  const responsiveStyles = {
    hero: {
      background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '650px',
      display: 'flex',
      alignItems: 'center',
      padding: '100px 20px',
      '@media (maxWidth: 768px)': {
        minHeight: '500px',
        padding: '80px 15px',
      }
    },
    heroTitle: {
      fontSize: '52px',
      marginTop:"60px",
      fontWeight: '800',
      color: '#fff',
      marginBottom: '20px',
      '@media (maxWidth: 768px)': {
        fontSize: '32px'
      },
      '@media (maxWidth: 480px)': {
        fontSize: '28px'
      }
    },
    heroText: {
      fontSize: '18px',
      color: '#ddd',
      marginBottom: '40px',
      lineHeight: '1.6',
      '@media (maxWidth: 768px)': {
        fontSize: '16px'
      }
    },
    sectionTitle: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#1e3c72',
      marginTop: '10px',
      '@media (maxWidth: 768px)': {
        fontSize: '28px'
      },
      '@media (maxWidth: 480px)': {
        fontSize: '24px'
      }
    },
    categoryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px',
      '@media (maxWidth: 768px)': {
        gap: '20px'
      },
      '@media (maxWidth: 480px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px'
      }
    },
    propertyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '30px',
      '@media (maxWidth: 768px)': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      },
      '@media (maxWidth: 480px)': {
        gridTemplateColumns: '1fr',
        gap: '20px'
      }
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '20px',
      marginTop: '60px',
      '@media (maxWidth: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '15px'
      },
      '@media (maxWidth: 480px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px'
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={responsiveStyles.hero}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={responsiveStyles.heroTitle}>
              Find Your <span style={{ color: '#f9b234' }}>Dream Property</span>
            </h1>
            <p style={responsiveStyles.heroText}>
              Discover the perfect home among 1000+ listings across India. Buy, Rent or Sell with 4PGR Realty.
            </p>
            <SearchBar />
            
            <div style={responsiveStyles.statsGrid}>
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} style={{ textAlign: 'center', padding: '10px' }}>
                    <Icon size={32} style={{ color: '#f9b234', marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', '@media (maxWidth: 768px)': { fontSize: '22px' } }}>{stat.value}</h3>
                    <p style={{ color: '#ddd', fontSize: '14px' }}>{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: '#f9b234', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>Categories</span>
            <h2 style={responsiveStyles.sectionTitle}>Browse by Property Type</h2>
            <p style={{ color: '#666', maxWidth: '600px', margin: '15px auto 0', fontSize: '16px' }}>Find the perfect property that matches your needs</p>
          </div>
          
          <div style={responsiveStyles.categoryGrid}>
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div key={idx} style={{
                  background: cat.bg,
                  borderRadius: '20px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <Icon size={48} style={{ color: cat.color, marginBottom: '20px' }} />
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>{cat.name}</h3>
                  <p style={{ color: '#666' }}>{cat.count} Properties</p>
                  <Link to={`/search?type=${cat.name.toLowerCase().split(' ')[0]}`} style={{
                    color: '#f9b234',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '15px',
                    fontWeight: '500'
                  }}>
                    Explore <FaArrowRight size={12} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: '#f9b234', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>Featured Listings</span>
            <h2 style={responsiveStyles.sectionTitle}>Properties for Sale</h2>
            <p style={{ color: '#666', maxWidth: '600px', margin: '15px auto 0', fontSize: '16px' }}>Handpicked properties at the best prices</p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div className="spinner" style={{ margin: '0 auto', width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #f9b234', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
          ) : (
            <>
              {featured.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '20px' }}>
                  <FaHome size={60} style={{ color: '#ccc', marginBottom: '20px' }} />
                  <h3>No properties found</h3>
                  <p>Check back later for new listings</p>
                </div>
              ) : (
                <div style={responsiveStyles.propertyGrid}>
                  {featured.map(property => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </>
          )}

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link to="/buy" style={{
              background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
              color: '#fff',
              padding: '14px 40px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(30,60,114,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              View All Properties <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: '#f9b234', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>Why Choose Us</span>
            <h2 style={responsiveStyles.sectionTitle}>We Make Real Estate Simple</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            '@media (maxWidth: 768px)': {
              gap: '30px'
            }
          }}>
            {[
              { icon: FaShieldAlt, title: 'Trust & Transparency', desc: '100% verified properties with complete documentation' },
              { icon: FaHandshake, title: 'Expert Guidance', desc: 'Professional agents to help you make right decisions' },
              { icon: FaClock, title: 'Fast Processing', desc: 'Quick documentation and legal verification' },
              { icon: FaPhone, title: '24/7 Support', desc: 'Round the clock assistance for all your queries' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} style={{ textAlign: 'center', padding: '30px', borderRadius: '20px', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(249,178,52,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}>
                    <Icon size={40} style={{ color: '#f9b234' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{item.title}</h3>
                  <p style={{ color: '#666', fontSize: '15px' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
        padding: '80px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: '42px', fontWeight: '700', color: '#fff', marginBottom: '20px', '@media (maxWidth: 768px)': { fontSize: '32px' }, '@media (maxWidth: 480px)': { fontSize: '28px' } }}>
            Ready to Find Your Dream Property?
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px', '@media (maxWidth: 768px)': { fontSize: '16px' } }}>
            Get in touch with our experts today and start your journey to finding the perfect home.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/sell" style={{
              background: '#f9b234',
              color: '#1e3c72',
              padding: '14px 40px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              List Your Property
            </Link>
            <Link to="/buy" style={{
              background: 'transparent',
              color: '#fff',
              padding: '14px 40px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              border: '2px solid #fff',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#1e3c72';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#fff';
            }}>
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .container {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;