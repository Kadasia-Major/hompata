import React, { useState } from 'react'
import { FaMapMarkerAlt, FaBed, FaBath, FaRuler, FaTrash, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([
    {
      id: 1,
      title: 'Modern Family House',
      location: 'Kilimani, Nairobi',
      price: 25000000,
      bedrooms: 4,
      bathrooms: 3,
      area: '450 sqm',
      type: 'House',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500',
      savedDate: '2024-01-15'
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
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500',
      savedDate: '2024-01-14'
    },
    {
      id: 3,
      title: 'Spacious 3BR Apartment',
      location: 'Karen, Nairobi',
      price: 150000,
      bedrooms: 3,
      bathrooms: 2,
      area: '280 sqm',
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c52f56?w=500',
      savedDate: '2024-01-12'
    }
  ])

  const handleRemove = (id) => {
    setSavedProperties(prev => prev.filter(prop => prop.id !== id))
  }

  const handleContactAgent = (propertyId) => {
    // Handle contact logic
    alert(`Contacting agent for property ${propertyId}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Saved Properties</h1>
          <p className="text-gray-600">
            You have <span className="font-semibold">{savedProperties.length}</span> saved properties
          </p>
        </div>

        {savedProperties.length > 0 ? (
          <div className="space-y-4">
            {savedProperties.map(property => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="grid md:grid-cols-5 gap-4 p-6">
                  {/* Image */}
                  <div className="md:col-span-1">
                    <div className="w-full h-48 md:h-full rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{property.title}</h3>

                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <FaMapMarkerAlt size={16} />
                      <span>{property.location}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <FaBed /> {property.bedrooms} Beds
                      </div>
                      <div className="flex items-center gap-2">
                        <FaBath /> {property.bathrooms} Baths
                      </div>
                      <div className="flex items-center gap-2">
                        <FaRuler /> {property.area}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">
                      Saved on {formatDate(property.savedDate)}
                    </p>
                  </div>

                  {/* Price and Actions */}
                  <div className="md:col-span-2 flex flex-col justify-between">
                    <div>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        KSh {(property.price / 1000000).toFixed(1)}M
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        {property.type === 'House' ? 'For Sale' : property.type === 'Apartment' ? 'For Rent' : 'For Sale'}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/property/${property.id}`}
                        className="flex-1 border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition flex items-center justify-center gap-2"
                      >
                        View Details <FaArrowRight />
                      </Link>
                      <button
                        onClick={() => handleRemove(property.id)}
                        className="w-12 h-12 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition flex items-center justify-center"
                        title="Remove from saved"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Saved Properties Yet</h2>
            <p className="text-gray-600 mb-6">
              Start saving properties you like, and they'll appear here for easy access.
            </p>
            <Link
              to="/buy"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Browse Properties
            </Link>
          </div>
        )}

        {/* Comparison Info */}
        {savedProperties.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h3>
            <p className="text-blue-800">
              Save your favorite properties to compare them later. You can view details, check prices, and contact agents directly from your saved list.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedProperties
