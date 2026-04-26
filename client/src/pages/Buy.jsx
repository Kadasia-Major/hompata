import React, { useState, useMemo } from 'react'
import { FaSearch, FaFilter, FaMapMarkerAlt, FaBed, FaBath, FaRuler } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Buy = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 50000000])
  const [showFilters, setShowFilters] = useState(false)

  const properties = [
    {
      id: 1,
      title: 'Modern Family House',
      location: 'Kilimani, Nairobi',
      price: 25000000,
      bedrooms: 4,
      bathrooms: 3,
      area: '450 sqm',
      type: 'House',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500'
    },
    {
      id: 2,
      title: 'Luxury Apartment with Pool',
      location: 'Westlands, Nairobi',
      price: 18500000,
      bedrooms: 3,
      bathrooms: 2,
      area: '280 sqm',
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500'
    },
    {
      id: 3,
      title: 'Cozy Starter Home',
      location: 'Ruiru, Kiambu',
      price: 8500000,
      bedrooms: 2,
      bathrooms: 1,
      area: '150 sqm',
      type: 'House',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500'
    },
    {
      id: 4,
      title: 'Executive Apartment',
      location: 'Karen, Nairobi',
      price: 35000000,
      bedrooms: 5,
      bathrooms: 4,
      area: '600 sqm',
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c52f56?w=500'
    }
  ]

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prop.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === 'all' || prop.type === selectedType
      const matchesPrice = prop.price >= priceRange[0] && prop.price <= priceRange[1]
      
      return matchesSearch && matchesType && matchesPrice
    })
  }, [searchTerm, selectedType, priceRange])

  return (
    <div className="min-h-screen bg-gray-50 -mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Properties for Sale</h1>
          <p className="text-xl text-gray-600">Find your perfect property from our extensive collection</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <FaFilter /> Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Property Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Types</option>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Land">Land</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Max Price: KSh {(priceRange[1] / 1000000).toFixed(1)}M
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="1000000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Reset Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedType('all')
                    setPriceRange([0, 50000000])
                    setSearchTerm('')
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <FaMapMarkerAlt size={16} />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <div className="text-2xl font-bold text-green-600 mb-4">
                    KSh {(property.price / 1000000).toFixed(1)}M
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-gray-600 text-sm">
                    <div className="flex items-center justify-center gap-1">
                      <FaBed /> {property.bedrooms}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <FaBath /> {property.bathrooms}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <FaRuler /> {property.area}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">No properties found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Buy
