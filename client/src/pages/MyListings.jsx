import React, { useState } from 'react'
import { FaMapMarkerAlt, FaBed, FaBath, FaRuler, FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const MyListings = () => {
  const [listings, setListings] = useState([
    {
      id: 'L001',
      title: 'Modern Family House',
      location: 'Kilimani, Nairobi',
      price: 25000000,
      bedrooms: 4,
      bathrooms: 3,
      area: '450 sqm',
      type: 'House',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500',
      views: 245,
      inquiries: 12,
      listedDate: '2024-01-10'
    },
    {
      id: 'L002',
      title: 'Spacious Apartment',
      location: 'Westlands, Nairobi',
      price: 15000000,
      bedrooms: 3,
      bathrooms: 2,
      area: '280 sqm',
      type: 'Apartment',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500',
      views: 89,
      inquiries: 5,
      listedDate: '2024-01-05'
    },
    {
      id: 'L003',
      title: 'Investment Property',
      location: 'Karen, Nairobi',
      price: 35000000,
      bedrooms: 5,
      bathrooms: 4,
      area: '600 sqm',
      type: 'House',
      status: 'Sold',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c52f56?w=500',
      views: 512,
      inquiries: 45,
      listedDate: '2023-12-15'
    }
  ])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(prev => prev.filter(listing => listing.id !== id))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Sold':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: listings.length,
    active: listings.filter(l => l.status === 'Active').length,
    totalViews: listings.reduce((sum, l) => sum + l.views, 0),
    totalInquiries: listings.reduce((sum, l) => sum + l.inquiries, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Listings</h1>
            <p className="text-gray-600">Manage your property listings</p>
          </div>
          <Link
            to="/list-property"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-semibold"
          >
            <FaPlus /> Add New Property
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm mb-2">Total Listings</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm mb-2">Active Listings</p>
            <p className="text-3xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm mb-2">Total Views</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalViews}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm mb-2">Inquiries</p>
            <p className="text-3xl font-bold text-orange-600">{stats.totalInquiries}</p>
          </div>
        </div>

        {/* Listings Table */}
        {listings.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Property</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Details</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Activity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {listings.map(listing => (
                    <tr key={listing.id} className="hover:bg-gray-50 transition">
                      {/* Property Name */}
                      <td className="px-6 py-4">
                        <div className="flex gap-4">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-20 h-20 rounded object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 text-sm md:text-base">
                              {listing.title}
                            </p>
                            <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                              <FaMapMarkerAlt size={12} />
                              <span>{listing.location}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <p className="font-bold text-green-600">
                          KSh {(listing.price / 1000000).toFixed(1)}M
                        </p>
                      </td>

                      {/* Details */}
                      <td className="px-6 py-4">
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FaBed size={14} /> {listing.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaBath size={14} /> {listing.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaRuler size={14} /> {listing.area}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(listing.status)}`}>
                          {listing.status}
                        </span>
                      </td>

                      {/* Activity */}
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">
                            <span className="font-semibold">{listing.views}</span> views
                          </p>
                          <p className="text-gray-600">
                            <span className="font-semibold">{listing.inquiries}</span> inquiries
                          </p>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="View listing"
                          >
                            <FaEye />
                          </button>
                          <button
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded transition"
                            title="Edit listing"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(listing.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete listing"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Listings Yet</h2>
            <p className="text-gray-600 mb-6">
              Start listing your properties to reach potential buyers and renters.
            </p>
            <Link
              to="/list-property"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              List Your First Property
            </Link>
          </div>
        )}

        {/* Tips Section */}
        {listings.length > 0 && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">📸 Tips for Better Listings</h3>
              <ul className="text-blue-800 text-sm space-y-2">
                <li>• Use high-quality, well-lit photos</li>
                <li>• Include detailed property descriptions</li>
                <li>• Highlight unique features and amenities</li>
                <li>• Keep information up-to-date</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-2">⚡ How to Get More Views</h3>
              <ul className="text-green-800 text-sm space-y-2">
                <li>• Respond quickly to inquiries</li>
                <li>• Verify your contact information</li>
                <li>• Offer virtual tours when possible</li>
                <li>• Update listings regularly</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyListings
