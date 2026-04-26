import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const PropertyCard = ({ property, featured = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleWhatsAppClick = () => {
    const message = `Hello, I am interested in this property:
🏠 ${property.title}
💰 ${formatPrice(property.price)}
📍 ${property.area}, ${property.county}
Please provide more details.`

    const url = `https://wa.me/254712345678?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group ${
        featured ? 'ring-2 ring-green-500 ring-opacity-50' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {property.images && property.images.length > 0 ? (
          <>
            <img
              src={property.images[0].image_url}
              alt={property.title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-gray-200 w-full h-full"></div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-6xl text-gray-400">🏠</span>
          </div>
        )}

        {/* Overlay with badges */}
        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
          {featured && (
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              ⭐ Featured
            </span>
          )}
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
              property.type === 'rent' 
                ? 'bg-blue-500 text-white' 
                : 'bg-purple-500 text-white'
            }`}>
              {property.type === 'rent' ? 'For Rent' : 'For Sale'}
            </span>
          </div>
        </div>

        {/* Hover overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300">
            <Link
              to={`/property/${property.id}`}
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              View Details
            </Link>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{property.area}, {property.county}</span>
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>{property.bedrooms} Beds</span>
          </div>
          
          {property.bedrooms >= 2 && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>{property.bedrooms - 1} Baths</span>
            </div>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(property.price)}
            </div>
            <div className="text-xs text-gray-500">
              per {property.type === 'rent' ? 'month' : 'total'}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              title="Contact via WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.297-.347.446-.521.151-.172.1-.288.05-.447-.05-.149-.099-.705-.347-1.344-.673-.639-.326-1.077-.497-1.344-.497-.267 0-.521.149-.673.297-.149.149-.596.596-.795.795-.199.199-.398.223-.673.074-.275-.149-1.164-.596-2.224-1.163-1.06-.567-1.784-.997-2.03-1.223-.247-.223-.247-.497-.149-.673.099-.174.199-.347.297-.521.099-.174.199-.347.297-.521.099-.174.149-.347.05-.447-.099-.099-.447-.447-1.06-1.164-1.06-.613 0-1.164.497-1.361.673-.199.174-.398.223-.673.074-.275-.149-1.164-.596-2.224-1.163-1.06-.567-1.784-.997-2.03-1.223-.247-.223-.247-.497-.149-.673.099-.174.199-.347.297-.521z"/>
              </svg>
            </button>
            
            <Link
              to={`/property/${property.id}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              title="View details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
