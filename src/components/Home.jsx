import React, { useState } from 'react';
import SearchBar from './SearchBar';
import PropertyCard from './PropertyCard';

const Home = () => {
  const [featuredProperties] = useState([
    {
      id: 'RE1001',
      title: 'Luxury Villa with Pool',
      price: '₹1.25 Cr',
      location: 'Golf Course Road, Gurugram',
      size: '3500 sq.ft',
      type: 'House',
      images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500']
    },
    {
      id: 'RE1002',
      title: '3 BHK Modern Apartment',
      price: '₹85 Lakhs',
      location: 'Sector 62, Noida',
      size: '1850 sq.ft',
      type: 'Flat',
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500']
    },
    {
      id: 'RE1003',
      title: 'Commercial Shop',
      price: '₹2.5 Cr',
      location: 'Connaught Place, Delhi',
      size: '1200 sq.ft',
      type: 'Commercial',
      images: ['https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?w=500']
    },
    {
      id: 'RE1004',
      title: 'Residential Plot',
      price: '₹45 Lakhs',
      location: 'Greater Noida',
      size: '200 sq.yd',
      type: 'Plot',
      images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500']
    },
    {
      id: 'RE1005',
      title: 'Modern Farmhouse',
      price: '₹2.8 Cr',
      location: 'Sohna Road, Gurugram',
      size: '5000 sq.ft',
      type: 'House',
      images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500']
    },
    {
      id: 'RE1006',
      title: 'Office Space',
      price: '₹1.8 Cr',
      location: 'Cyber City, Gurugram',
      size: '2000 sq.ft',
      type: 'Commercial',
      images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500']
    }
  ]);

  const heroStyle = {
    background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff'
  };

  const categoriesStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    marginTop: '30px'
  };

  const categoryCardStyle = {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    cursor: 'pointer'
  };

  const categoryImageStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    marginBottom: '10px',
    objectFit: 'cover'
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={{ maxWidth: '800px', padding: '0 20px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Find Your Dream Property</h1>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>Search from thousands of properties across India</p>
          <SearchBar />
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', color: '#1e3c72' }}>
            Browse by Category
          </h2>
          <div style={categoriesStyle}>
            {[
              { name: 'House', img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=200' },
              { name: 'Apartment', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200' },
              { name: 'Commercial', img: 'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?w=200' },
              { name: 'Plot', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200' },
              { name: 'Farmhouse', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=200' },
              { name: 'Office', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200' }
            ].map(cat => (
              <div key={cat.name} style={categoryCardStyle}>
                <img src={cat.img} alt={cat.name} style={categoryImageStyle} />
                <h3>{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', color: '#1e3c72' }}>
            Featured Properties
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Background */}
      <section style={{
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Want to Sell Your Property?</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
            List your property with us and reach thousands of potential buyers
          </p>
          <button 
            className="btn btn-primary"
            style={{ fontSize: '18px', padding: '15px 40px' }}
            onClick={() => window.location.href = '/sell'}
          >
            List Your Property
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;