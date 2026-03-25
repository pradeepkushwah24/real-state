import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaMapMarkerAlt, FaBed, FaBath, FaVectorSquare, FaFilter, FaTimes, FaHome, FaBuilding, FaStore, FaTree, FaArrowRight, FaStar, FaEye, FaHeart, FaShareAlt } from 'react-icons/fa'
import PropertyCard from './PropertyCard'
import { getProperties } from '../services/api'

const BuyProperty = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  })

  // Footer Colors
  const colors = {
    dark: '#0a2a3a',
    accent: '#f9b234',
    light: '#f8f9fa',
    white: '#ffffff',
    gray: '#6c757d',
    success: '#28a745',
    danger: '#dc3545'
  }

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      const response = await getProperties('sale')
      let data = response.data.data || []
      data = data.filter(p => p.purpose === 'sale')
      setProperties(data)
      setFilteredProperties(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    let filtered = [...properties]
    
    if (filters.location) {
      filtered = filtered.filter(p => p.location?.toLowerCase().includes(filters.location.toLowerCase()))
    }
    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type)
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms))
    }
    
    // Apply sorting
    filtered = applySorting(filtered)
    setFilteredProperties(filtered)
  }

  const applySorting = (data) => {
    const sorted = [...data]
    switch(sortBy) {
      case 'price_low':
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      case 'price_high':
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      case 'views':
        return sorted.sort((a, b) => (b.views || 0) - (a.views || 0))
      default:
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    let filtered = [...filteredProperties]
    filtered = applySorting(filtered)
    setFilteredProperties(filtered)
  }

  const handleCategoryFilter = (category) => {
    setActiveCategory(category)
    let filtered = [...properties]
    
    if (category !== 'all') {
      filtered = filtered.filter(p => p.type === category)
    }
    
    if (filters.location) {
      filtered = filtered.filter(p => p.location?.toLowerCase().includes(filters.location.toLowerCase()))
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms))
    }
    
    filtered = applySorting(filtered)
    setFilteredProperties(filtered)
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: ''
    })
    setFilteredProperties(properties)
    setActiveCategory('all')
    setSortBy('latest')
  }

  const categories = [
    { id: 'all', name: 'All Properties', icon: FaHome, count: properties.length },
    { id: 'house', name: 'Houses & Villas', icon: FaBuilding, count: properties.filter(p => p.type === 'house').length },
    { id: 'apartment', name: 'Apartments', icon: FaBuilding, count: properties.filter(p => p.type === 'apartment').length },
    { id: 'plot', name: 'Plots & Land', icon: FaTree, count: properties.filter(p => p.type === 'plot').length },
    { id: 'commercial', name: 'Commercial', icon: FaStore, count: properties.filter(p => p.type === 'commercial').length }
  ]

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px',
      background: colors.light,
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '42px',
      fontWeight: '800',
      color: colors.dark,
      marginBottom: '15px',
      letterSpacing: '-0.5px'
    },
    titleAccent: {
      color: colors.accent,
      position: 'relative',
      display: 'inline-block'
    },
    subtitle: {
      color: colors.gray,
      fontSize: '18px',
      maxWidth: '600px',
      margin: '0 auto'
    },
    filterBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '15px',
      padding: '15px 0'
    },
    filterToggle: {
      background: colors.white,
      border: `1px solid ${colors.accent}`,
      padding: '12px 28px',
      borderRadius: '50px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      color: colors.dark,
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },
    categories: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginBottom: '30px',
      justifyContent: 'center'
    },
    categoryBtn: (isActive) => ({
      padding: '10px 24px',
      background: isActive ? colors.accent : colors.white,
      color: isActive ? colors.dark : colors.gray,
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      boxShadow: isActive ? '0 4px 12px rgba(249,178,52,0.3)' : '0 2px 4px rgba(0,0,0,0.05)',
      fontSize: '14px'
    }),
    filtersPanel: {
      background: colors.white,
      padding: '30px',
      borderRadius: '20px',
      marginBottom: '30px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
    },
    filterGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e9ecef',
      borderRadius: '12px',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.3s ease',
      background: colors.white
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e9ecef',
      borderRadius: '12px',
      fontSize: '14px',
      background: colors.white,
      cursor: 'pointer'
    },
    filterActions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '20px'
    },
    applyBtn: {
      padding: '12px 28px',
      background: colors.accent,
      color: colors.dark,
      border: 'none',
      borderRadius: '50px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease'
    },
    clearBtn: {
      padding: '12px 28px',
      background: 'transparent',
      color: colors.gray,
      border: `1px solid ${colors.gray}`,
      borderRadius: '50px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease'
    },
    resultsInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '15px',
      padding: '15px 0',
      borderBottom: `1px solid #e9ecef`
    },
    resultsCount: {
      fontSize: '15px',
      color: colors.gray
    },
    sortSelect: {
      padding: '10px 20px',
      border: `2px solid #e9ecef`,
      borderRadius: '50px',
      fontSize: '14px',
      background: colors.white,
      cursor: 'pointer',
      outline: 'none'
    },
    propertyGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '30px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '80px 40px',
      background: colors.white,
      borderRadius: '24px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
    },
    emptyIcon: {
      fontSize: '80px',
      color: colors.gray,
      marginBottom: '20px',
      opacity: 0.5
    },
    featuredBadge: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: colors.accent,
      color: colors.dark,
      padding: '5px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      zIndex: 1
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          Properties for <span style={styles.titleAccent}>Sale</span>
        </h1>
        <p style={styles.subtitle}>
          Discover your perfect home from our curated collection of premium listings
        </p>
      </div>

      {/* Categories */}
      <div style={styles.categories}>
        {categories.map(cat => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryFilter(cat.id)}
              style={styles.categoryBtn(activeCategory === cat.id)}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Icon size={14} style={{ marginRight: '8px' }} />
              {cat.name} ({cat.count})
            </button>
          )
        })}
      </div>

      {/* Filter Bar */}
      <div style={styles.filterBar}>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={styles.filterToggle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.accent
            e.currentTarget.style.color = colors.dark
            e.currentTarget.style.borderColor = colors.accent
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = colors.white
            e.currentTarget.style.color = colors.dark
            e.currentTarget.style.borderColor = colors.accent
          }}
        >
          <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {(filters.location || filters.type || filters.bedrooms) && (
          <button onClick={clearFilters} style={styles.clearBtn}>
            <FaTimes /> Clear Filters
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div style={styles.filtersPanel}>
          <div style={styles.filterGrid}>
            <input
              type="text"
              placeholder="📍 Search by location..."
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = colors.accent}
              onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
            />
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              style={styles.select}
            >
              <option value="">🏠 All Property Types</option>
              <option value="house">🏡 House / Villa</option>
              <option value="apartment">🏢 Apartment / Flat</option>
              <option value="plot">🌳 Plot / Land</option>
              <option value="commercial">🏪 Commercial / Shop</option>
            </select>
            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              style={styles.select}
            >
              <option value="">🛏️ Any Bedrooms</option>
              <option value="1">1+ BHK</option>
              <option value="2">2+ BHK</option>
              <option value="3">3+ BHK</option>
              <option value="4">4+ BHK</option>
            </select>
          </div>
          <div style={styles.filterActions}>
            <button onClick={clearFilters} style={styles.clearBtn}>
              <FaTimes /> Reset All
            </button>
            <button onClick={handleFilter} style={styles.applyBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(249,178,52,0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <FaSearch /> Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div style={styles.resultsInfo}>
        <div style={styles.resultsCount}>
          <FaHome style={{ marginRight: '8px', color: colors.accent }} />
          <strong>{filteredProperties.length}</strong> properties found
          {activeCategory !== 'all' && <span> in {activeCategory}</span>}
        </div>
        <select value={sortBy} onChange={handleSortChange} style={styles.sortSelect}>
          <option value="latest">✨ Latest Listings</option>
          <option value="price_low">💰 Price: Low to High</option>
          <option value="price_high">💰 Price: High to Low</option>
          <option value="views">👁️ Most Viewed</option>
        </select>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🏠</div>
          <h3 style={{ color: colors.dark, marginBottom: '10px' }}>No properties found</h3>
          <p style={{ color: colors.gray, marginBottom: '20px' }}>Try adjusting your filters or search criteria</p>
          <button onClick={clearFilters} style={styles.applyBtn}>
            <FaTimes /> Clear All Filters
          </button>
        </div>
      ) : (
        <div style={styles.propertyGrid}>
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(10,42,58,0.1);
          border-top-color: #f9b234;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .property-grid {
            grid-template-columns: 1fr !important;
          }
          .categories {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 10px;
          }
          .filter-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default BuyProperty