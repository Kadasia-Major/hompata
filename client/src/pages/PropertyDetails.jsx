import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  FaBed, 
  FaBath, 
  FaRuler, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp, 
  FaHeart, 
  FaRegHeart, 
  FaShare, 
  FaChevronLeft, 
  FaChevronRight,
  FaCheck,
  FaTimes
} from 'react-icons/fa'

const PropertyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - replace with API call
  useEffect(() => {
    const mockProperty = {
      id: id,
      title: 'Modern Luxury Villa in Kilimani',
      price: 25000000,
      location: 'Kilimani, Nairobi',
      county: 'Nairobi',
      propertyType: 'House',
      bedrooms: 4,
      bathrooms: 3,
      area: '450 sqm',
      plotSize: '1000 sqm',
      yearBuilt: 2020,
      description: 'Beautiful modern luxury villa featuring contemporary architecture, spacious rooms, and premium finishes. Perfect for families looking for comfort and style.',
      amenities: [
        'Swimming Pool',
        'Garden',
        'Garage',
        'Security System',
        'Backup Power',
        'Borehole',
        'Paved Driveway'
      ],
      images: [
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200',
        'https://images.unsplash.com/photo-1512917774080-9991f1c52f56?w=1200',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200'
      ],
      agent: {
        name: 'John Smith',
        phone: '+254712345678',
        email: 'john.smith@realestate.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
      },
      features: [
        { name: 'Modern Architecture', available: true },
        { name: 'Excellent Location', available: true },
        { name: 'Good Finishing', available: true },
        { name: 'Spacious Rooms', available: true },
        { name: 'Secure Area', available: true }
      ]
    }
    
    setProperty(mockProperty)
    setLoading(false)
  }, [id])

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property?.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property?.images.length - 1 ? 0 : prev + 1
    )
  }

  const handleWhatsApp = () => {
    const message = `Hello, I am interested in: ${property?.title}. Price: KSh ${property?.price}. Location: ${property?.location}`
    window.open(`https://wa.me/254712345678?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-96 md:h-[600px] bg-gray-900 group">
        <img
          src={property.images[currentImageIndex]}
          alt="Property"
          className="w-full h-full object-cover"
        />
        
        {/* Image Navigation */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition z-10"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition z-10"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Image Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {property.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-2 rounded-full transition ${
                idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="bg-white hover:bg-gray-100 text-gray-900 p-3 rounded-full transition shadow-lg"
          >
            {isSaved ? <FaHeart size={20} className="text-red-500" /> : <FaRegHeart size={20} />}
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-900 p-3 rounded-full transition shadow-lg"
          >
            <FaShare size={20} />
          </button>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-4 -mt-20 relative z-20">
        <div className="grid grid-cols-4 gap-3">
          {property.images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-20 rounded-lg overflow-hidden border-2 transition ${
                idx === currentImageIndex ? 'border-green-500' : 'border-transparent'
              }`}
            >
              <img src={image} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
                <FaMapMarkerAlt className="text-green-600" />
                <span>{property.location}</span>
              </div>
              <div className="text-3xl font-bold text-green-600">
                KSh {property.price.toLocaleString()}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8 bg-white p-6 rounded-lg shadow">
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaBed size={20} />
                  <span>Bedrooms</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaBath size={20} />
                  <span>Bathrooms</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaRuler size={20} />
                  <span>Area</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.area}</p>
              </div>
              <div>
                <div className="text-gray-600 mb-2">
                  <span>Year Built</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.yearBuilt}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 font-semibold border-b-2 transition ${
                    activeTab === 'overview'
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`py-4 font-semibold border-b-2 transition ${
                    activeTab === 'features'
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Features
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
                <p className="text-gray-700 leading-7 mb-6">{property.description}</p>

                <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <div className="space-y-3">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      {feature.available ? (
                        <FaCheck className="text-green-600" />
                      ) : (
                        <FaTimes className="text-gray-400" />
                      )}
                      <span className={feature.available ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Agent Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Agent Contact</h3>
              <img
                src={property.agent.image}
                alt={property.agent.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-center text-lg font-bold text-gray-900 mb-2">
                {property.agent.name}
              </h4>
              <p className="text-center text-gray-600 mb-6">Real Estate Agent</p>

              <div className="space-y-3">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                >
                  <FaPhone size={18} />
                  Call
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="w-full bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition"
                >
                  <FaEnvelope size={18} />
                  Email
                </a>
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition"
                >
                  <FaWhatsapp size={18} />
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Request Info Card */}
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Interested in this property?</h3>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-3">
                Schedule a Tour
              </button>
              <button className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
                Request More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
