import React, { useState } from 'react';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: '',
    budget: '',
    size: ''
  });

  const formStyle = {
    background: 'rgba(255,255,255,0.95)',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '900px',
    margin: '0 auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    alignItems: 'end'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  };

  const selectStyle = {
    ...inputStyle,
    background: '#fff'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  };

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/search?${new URLSearchParams(searchParams)}`;
  };

  return (
    <form style={formStyle} onSubmit={handleSearch}>
      <div style={gridStyle}>
        <input
          type="text"
          name="location"
          placeholder="Location"
          style={inputStyle}
          value={searchParams.location}
          onChange={handleChange}
        />
        
        <select name="type" style={selectStyle} value={searchParams.type} onChange={handleChange}>
          <option value="">Property Type</option>
          <option value="house">House</option>
          <option value="flat">Flat/Apartment</option>
          <option value="plot">Plot/Land</option>
          <option value="commercial">Commercial</option>
        </select>
        
        <select name="budget" style={selectStyle} value={searchParams.budget} onChange={handleChange}>
          <option value="">Budget</option>
          <option value="0-25l">Below 25 Lakhs</option>
          <option value="25l-50l">25-50 Lakhs</option>
          <option value="50l-1cr">50 Lakhs - 1 Cr</option>
          <option value="1cr+">Above 1 Cr</option>
        </select>
        
        <select name="size" style={selectStyle} value={searchParams.size} onChange={handleChange}>
          <option value="">Size (sq.ft)</option>
          <option value="0-1000">Below 1000</option>
          <option value="1000-2000">1000-2000</option>
          <option value="2000-3000">2000-3000</option>
          <option value="3000+">Above 3000</option>
        </select>
        
        <button 
          type="submit" 
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;