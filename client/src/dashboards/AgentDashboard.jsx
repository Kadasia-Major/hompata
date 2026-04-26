import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaPlus, FaEdit, FaTrash, FaEye, FaChartBar, FaDollarSign,
  FaCalendarAlt, FaUsers, FaEnvelope, FaPhone, FaWhatsapp, FaStar,
  FaBell, FaSearch, FaFilter, FaDownload, FaHandshake, FaBriefcase, FaFileContract, FaMapMarkerAlt,
  FaCamera, FaShare, FaHeart, FaComments, FaAward, FaArrowUp, FaArrowDown, FaBuilding,
  FaMoneyBillWave
} from 'react-icons/fa';

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const agentStats = [
    { 
      title: 'Total Users', 
      value: '1,248', 
      change: '+12%', 
      trend: 'up',
      icon: FaUsers, 
      color: 'bg-blue-50', 
      iconColor: 'text-blue-600' 
    },
    { 
      title: 'Active Listings', 
      value: '842', 
      change: '+8%', 
      trend: 'up',
      icon: FaHome, 
      color: 'bg-green-50', 
      iconColor: 'text-green-600' 
    },
    { 
      title: 'Commission Earned', 
      value: 'KSh 186K', 
      change: '+12%', 
      trend: 'up',
      icon: FaMoneyBillWave, 
      color: 'bg-purple-50', 
      iconColor: 'text-purple-600' 
    },
    { 
      title: 'Properties Sold', 
      value: '6', 
      change: '+1', 
      trend: 'up',
      icon: FaAward, 
      color: 'bg-yellow-50', 
      iconColor: 'text-yellow-600' 
    }
  ];

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: FaChartBar },
    { id: 'listings', label: 'My Listings', icon: FaHome, badge: 8 },
    { id: 'add', label: 'Add Listing', icon: FaPlus },
    { id: 'clients', label: 'Clients', icon: FaUsers, badge: 24 },
    { id: 'commission', label: 'Commission', icon: FaDollarSign },
    { id: 'tours', label: 'Property Tours', icon: FaCalendarAlt, badge: 12 },
    { id: 'contracts', label: 'Contracts', icon: FaFileContract },
    { id: 'messages', label: 'Messages', icon: FaEnvelope, badge: 7 }
  ];

  const listings = [
    {
      id: 1,
      title: 'Modern 3BR Apartment',
      location: 'Kilimani, Nairobi',
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 2,
      price: 'KSh 8.5M',
      status: 'active',
      views: 245,
      inquiries: 18,
      commission: '2.5%',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      listed: '2023-10-15'
    },
    {
      id: 2,
      title: 'Luxury Villa',
      location: 'Karen, Nairobi',
      type: 'Villa',
      bedrooms: 5,
      bathrooms: 4,
      price: 'KSh 45M',
      status: 'featured',
      views: 512,
      inquiries: 32,
      commission: '3%',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400',
      listed: '2023-09-20'
    },
    {
      id: 3,
      title: 'Cozy Studio',
      location: 'Westlands, Nairobi',
      type: 'Studio',
      bedrooms: 1,
      bathrooms: 1,
      price: 'KSh 3.2M',
      status: 'active',
      views: 189,
      inquiries: 12,
      commission: '2%',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      listed: '2023-11-01'
    }
  ];

  const clients = [
    {
      id: 1,
      name: 'David Kimani',
      type: 'buyer',
      budget: 'KSh 10M',
      preferences: '3BR Apartment in Kilimani',
      status: 'active',
      contact: '+254 712 345 678',
      lastContact: '2 days ago',
      avatar: 'https://i.pravatar.cc/150?u=1'
    },
    {
      id: 2,
      name: 'Grace Achieng',
      type: 'seller',
      property: '2BR House',
      askingPrice: 'KSh 7.5M',
      status: 'listing',
      contact: '+254 723 456 789',
      lastContact: '1 week ago',
      avatar: 'https://i.pravatar.cc/150?u=2'
    },
    {
      id: 3,
      name: 'James Muriuki',
      type: 'renter',
      budget: 'KSh 50K/month',
      preferences: 'Modern Apartment',
      status: 'tour_scheduled',
      contact: '+254 734 567 890',
      lastContact: '3 days ago',
      avatar: 'https://i.pravatar.cc/150?u=3'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'featured': return 'bg-purple-100 text-purple-600';
      case 'sold': return 'bg-blue-100 text-blue-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getClientStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'listing': return 'bg-blue-100 text-blue-600';
      case 'tour_scheduled': return 'bg-purple-100 text-purple-600';
      case 'closed': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-20">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <FaBriefcase className="text-white text-lg" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">Hompata</span>
              <p className="text-xs text-gray-500">AGENT</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={activeTab === item.id ? 'text-white' : 'text-gray-400'} />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    activeTab === item.id ? 'bg-white text-green-500' : 'bg-green-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <FaHandshake className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">Real Estate Agent</p>
              <p className="text-xs text-gray-500">agent@hompata.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
              <p className="text-sm text-gray-500">Manage your listings and client relationships</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search listings, clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-4 py-2.5 w-80 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition">
                <FaBell className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Agent Stats */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {agentStats.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trend === 'up' ? FaArrowUp : FaArrowDown;
              return (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className={stat.iconColor} size={24} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      <TrendIcon size={12} />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Listings */}
          {activeTab === 'listings' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">My Listings</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600">
                    <FaPlus size={14} /> Add Listing
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <FaDownload size={14} /> Export
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.map((listing) => (
                    <div key={listing.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                      <div className="relative">
                        <img 
                          src={listing.image} 
                          alt={listing.title}
                          className="w-full h-48 object-cover"
                        />
                        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                          {listing.status.toUpperCase()}
                        </span>
                        <div className="absolute bottom-3 left-3 flex gap-2">
                          <span className="px-2 py-1 bg-black/70 text-white rounded text-xs">
                            {listing.views} views
                          </span>
                          <span className="px-2 py-1 bg-black/70 text-white rounded text-xs">
                            {listing.inquiries} inquiries
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{listing.title}</h4>
                        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                          <FaMapMarkerAlt size={12} /> {listing.location}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span>{listing.bedrooms} BR</span>
                          <span>{listing.bathrooms} BA</span>
                          <span>{listing.type}</span>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                          <p className="text-lg font-bold text-green-600">{listing.price}</p>
                          <p className="text-sm text-gray-500">{listing.commission} commission</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-1">
                            <FaEye size={14} /> View
                          </button>
                          <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-1">
                            <FaEdit size={14} /> Edit
                          </button>
                          <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-1">
                            <FaShare size={14} /> Share
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Clients */}
          {activeTab === 'clients' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Client Management</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600">
                    <FaPlus size={14} /> Add Client
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                    <FaDownload size={14} /> Export
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Budget/Property</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full" />
                            <div>
                              <p className="font-medium text-gray-900">{client.name}</p>
                              <p className="text-sm text-gray-500">{client.contact}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                            {client.type.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{client.budget || client.property}</p>
                            {client.preferences && <p className="text-sm text-gray-500">{client.preferences}</p>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getClientStatusColor(client.status)}`}>
                            {client.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{client.lastContact}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition">
                              <FaPhone size={16} />
                            </button>
                            <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition">
                              <FaWhatsapp size={16} />
                            </button>
                            <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                              <FaEnvelope size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Chart Section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Property Performance Chart */}
            <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Property Performance</h3>
                  <p className="text-sm text-gray-500">Views and engagement for the last 7 days</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-sm text-gray-600">Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-gray-600">Clicks</span>
                  </div>
                </div>
              </div>
              
              {/* Bar Chart */}
              <div className="flex items-end justify-between h-64 gap-4">
                {[
                  { day: 'Mon', views: 310, clicks: 155 },
                  { day: 'Tue', views: 465, clicks: 155 },
                  { day: 'Wed', views: 310, clicks: 77 },
                  { day: 'Thu', views: 465, clicks: 232 },
                  { day: 'Fri', views: 465, clicks: 310 },
                  { day: 'Sat', views: 620, clicks: 310 },
                  { day: 'Sun', views: 465, clicks: 232 }
                ].map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-1 items-end h-48">
                      <div 
                        className="flex-1 bg-blue-500 rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(item.views / 620) * 100}%` }}
                      ></div>
                      <div 
                        className="flex-1 bg-purple-500 rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${(item.clicks / 620) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Inquiries</h3>
                <button className="text-green-500 text-sm font-medium">View All →</button>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    name: 'Sarah Johnson',
                    message: "I'd like to schedule a viewing for the Oakwood Villa property.",
                    time: '2m ago',
                    avatar: 'https://i.pravatar.cc/150?u=1'
                  },
                  {
                    name: 'David Chen',
                    message: "Is the price negotiable for the downtown loft?",
                    time: '45m ago',
                    avatar: 'https://i.pravatar.cc/150?u=2'
                  },
                  {
                    name: 'Elena Rodriguez',
                    message: "What are the monthly maintenance fees?",
                    time: '2h ago',
                    avatar: 'https://i.pravatar.cc/150?u=3'
                  }
                ].map((inquiry, index) => (
                  <div key={index} className="flex gap-3 p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer">
                    <img 
                      src={inquiry.avatar} 
                      alt={inquiry.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-sm text-gray-900">{inquiry.name}</p>
                        <span className="text-xs text-gray-400">{inquiry.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{inquiry.message}</p>
                      <div className="flex gap-2 mt-2">
                        <button className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-medium">
                          <FaWhatsapp size={10} /> WhatsApp
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium">
                          <FaPhone size={10} /> Call
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overview Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New listing added</p>
                      <p className="text-xs text-gray-500">Modern 3BR Apartment - Kilimani</p>
                    </div>
                    <span className="text-xs text-gray-400">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Property tour scheduled</p>
                      <p className="text-xs text-gray-500">James Muriuki - Luxury Villa</p>
                    </div>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Commission received</p>
                      <p className="text-xs text-gray-500">KSh 212,500 - Villa sale</p>
                    </div>
                    <span className="text-xs text-gray-400">1 week ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Average Sale Price</span>
                    <span className="text-lg font-bold text-gray-900">KSh 12.5M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Commission Rate</span>
                    <span className="text-lg font-bold text-green-600">2.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Client Satisfaction</span>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" size={14} />
                      <span className="text-lg font-bold text-gray-900">4.8</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <FaArrowUp className="text-green-500" />
                      <span className="text-sm text-gray-600">23% increase in sales this quarter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
