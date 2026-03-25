import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FaSearch, FaFilter } from 'react-icons/fa'
import PropertyCard from './PropertyCard'
import { getProperties } from '../services/api'

const SearchResults = () => {
  const location = useLocation()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const filterParams = {}
    for (let [key, value] of params.entries()) {
      filterParams[key] = value
    }
    setFilters(filterParams)
    loadProperties(filterParams)
  }, [location.search])

  const loadProperties = async (filterParams) => {
    setLoading(true)
    try {
      const response = await getProperties()
      let data = response.data.data || []
      
      if (filterParams.location) {
        data = data.filter(p => p.location.toLowerCase().includes(filterParams.location.toLowerCase()))
      }
      if (filterParams.type) {
        data = data.filter(p => p.type === filterParams.type)
      }
      if (filterParams.budget) {
        // Apply budget filter logic
      }
      if (filterParams.size) {
        // Apply size filter logic
      }
      
      setProperties(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', color: '#1e3c72', marginBottom: '10px' }}>
          Search Results
        </h1>
        <p style={{ color: '#666' }}>
          Found {properties.length} properties matching your criteria
        </p>
      </div>

      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            background: 'transparent',
            border: '1px solid #1e3c72',
            padding: '10px 20px',
            borderRadius: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div style={{
          background: '#fff',
          padding: '25px',
          borderRadius: '15px',
          marginBottom: '30px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <input
              type="text"
              placeholder="📍 Location"
              value={filters.location || ''}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
            <select
              value={filters.type || ''}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="plot">Plot</option>
            </select>
            <select
              value={filters.budget || ''}
              onChange={(e) => setFilters({...filters, budget: e.target.value})}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
            >
              <option value="">Budget</option>
              <option value="0-25l">Below 25 Lakhs</option>
              <option value="25l-50l">25-50 Lakhs</option>
              <option value="50l-1cr">50 Lakhs - 1 Cr</option>
            </select>
            <button
              onClick={() => loadProperties(filters)}
              style={{
                background: 'linear-gradient(135deg, #f9b234, #f5af19)',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <FaSearch style={{ marginRight: '8px' }} /> Apply Filters
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div className="spinner" style={{ margin: '0 auto' }}></div>
        </div>
      ) : properties.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <h3>No properties found</h3>
          <p>Try adjusting your search criteria</p>
          <Link to="/" style={{ color: '#f9b234', textDecoration: 'none' }}>Back to Home</Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults