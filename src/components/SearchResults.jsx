import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from './PropertyCard';

const SearchResults = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({});
  const [properties, setProperties] = useState([
    {
      id: 'RE1001',
      title: 'Luxury Villa with Pool',
      price: '₹1.25 Cr',
      location: 'Golf Course Road, Gurugram',
      size: '3500 sq.ft',
      type: 'House',
      images: ['https://via.placeholder.com/400x300']
    },
    {
      id: 'RE1002',
      title: '3 BHK Modern Apartment',
      price: '₹85 Lakhs',
      location: 'Sector 62, Noida',
      size: '1850 sq.ft',
      type: 'Flat',
      images: ['https://via.placeholder.com/400x300']
    },
    {
      id: 'RE1003',
      title: 'Commercial Shop',
      price: '₹2.5 Cr',
      location: 'Connaught Place, Delhi',
      size: '1200 sq.ft',
      type: 'Commercial',
      images: ['https://via.placeholder.com/400x300']
    },
    {
      id: 'RE1004',
      title: 'Residential Plot',
      price: '₹45 Lakhs',
      location: 'Greater Noida',
      size: '200 sq.yd',
      type: 'Plot',
      images: ['https://via.placeholder.com/400x300']
    }
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterParams = {};
    for (let [key, value] of params.entries()) {
      filterParams[key] = value;
    }
    setFilters(filterParams);
  }, [location]);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  };

  const headerStyle = {
    marginBottom: '30px'
  };

  const titleStyle = {
    fontSize: '28px',
    color: '#1e3c72',
    marginBottom: '10px'
  };

  const filterBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '10px',
    marginBottom: '30px'
  };

  const resultCountStyle = {
    fontSize: '16px',
    color: '#666'
  };

  const sortStyle = {
    padding: '8px 16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px'
  };

  const noResultsStyle = {
    textAlign: 'center',
    padding: '60px',
    background: '#f8f9fa',
    borderRadius: '10px'
  };

  const noResultsIconStyle = {
    fontSize: '60px',
    color: '#ccc',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Search Results</h1>
        {Object.keys(filters).length > 0 && (
          <p style={{color: '#666'}}>
            {Object.entries(filters).map(([key, value]) => (
              <span key={key} style={{marginRight: '15px'}}>
                <strong>{key}:</strong> {value}
              </span>
            ))}
          </p>
        )}
      </div>

      <div style={filterBarStyle}>
        <span style={resultCountStyle}>
          Found {properties.length} properties
        </span>
        <select style={sortStyle}>
          <option>Sort by: Latest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Size: Small to Large</option>
        </select>
      </div>

      {properties.length > 0 ? (
        <div style={gridStyle}>
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div style={noResultsStyle}>
          <div style={noResultsIconStyle}>
            <i className="fas fa-search"></i>
          </div>
          <h3 style={{marginBottom: '10px'}}>No Properties Found</h3>
          <p style={{color: '#666'}}>Try adjusting your search filters</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;