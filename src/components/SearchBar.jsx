import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: '',
    budget: '',
    size: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key]) params.append(key, searchParams[key]);
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} style={{
      background: 'rgba(255,255,255,0.95)',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px',
        '@media (maxWidth: 768px)': {
          gridTemplateColumns: '1fr',
          gap: '12px'
        }
      }}>
        <input
          type="text"
          name="location"
          placeholder="📍 Location (City, Area)"
          style={{
            padding: '14px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          value={searchParams.location}
          onChange={handleChange}
          onFocus={(e) => e.target.style.borderColor = '#f9b234'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        
        <select
          name="type"
          style={{
            padding: '14px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            fontSize: '14px',
            background: '#fff',
            cursor: 'pointer'
          }}
          value={searchParams.type}
          onChange={handleChange}
        >
          <option value="">🏠 Property Type</option>
          <option value="house">House / Villa</option>
          <option value="apartment">Apartment / Flat</option>
          <option value="plot">Plot / Land</option>
          <option value="commercial">Commercial / Shop</option>
        </select>
        
        <select
          name="budget"
          style={{
            padding: '14px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            fontSize: '14px',
            background: '#fff',
            cursor: 'pointer'
          }}
          value={searchParams.budget}
          onChange={handleChange}
        >
          <option value="">💰 Budget Range</option>
          <option value="0-25l">Below ₹25 Lakhs</option>
          <option value="25l-50l">₹25 - 50 Lakhs</option>
          <option value="50l-1cr">₹50 Lakhs - 1 Cr</option>
          <option value="1cr-2cr">₹1 Cr - 2 Cr</option>
          <option value="2cr+">Above ₹2 Cr</option>
        </select>
        
        <select
          name="size"
          style={{
            padding: '14px',
            border: '1px solid #ddd',
            borderRadius: '10px',
            fontSize: '14px',
            background: '#fff',
            cursor: 'pointer'
          }}
          value={searchParams.size}
          onChange={handleChange}
        >
          <option value="">📏 Area (sq.ft)</option>
          <option value="0-1000">Below 1000 sq.ft</option>
          <option value="1000-2000">1000 - 2000 sq.ft</option>
          <option value="2000-3000">2000 - 3000 sq.ft</option>
          <option value="3000+">Above 3000 sq.ft</option>
        </select>
        
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #f9b234, #f5af19)',
            border: 'none',
            borderRadius: '10px',
            padding: '14px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#1e3c72',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(249,178,52,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <FaSearch /> Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;