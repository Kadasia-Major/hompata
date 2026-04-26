import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaHome, FaPlus, FaEnvelope, FaChartBar, FaDollarSign, 
  FaCog, FaSignOutAlt, FaSearch, FaBell, FaCalendarAlt,
  FaEye, FaEdit, FaTrash, FaPhone, FaWhatsapp, FaComment,
  FaArrowUp, FaArrowDown, FaFilter, FaDownload
} from 'react-icons/fa'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')

  // Stats data
  const stats = [
    { 
      title: 'Total Listings', 
      value: '42', 
      change: '+4%', 
      trend: 'up',
      icon: FaHome, 
      color: 'bg-blue-50', 
      iconColor: 'text-blue-600' 
    },
    { 
      title: 'Active Listings', 
      value: '38', 
      change: '-2%', 
      trend: 'down',
      icon: FaChartBar, 
      color: 'bg-purple-50', 
      iconColor: 'text-purple-600' 
    },
    { 
      title: 'Leads Received', 
      value: '156', 
      change: '+12%', 
      trend: 'up',
      icon: FaEnvelope, 
      color: 'bg-green-50', 
      iconColor: 'text-green-600' 
    },
    { 
      title: 'Monthly Earnings', 
      value: '$14,250', 
      change: '+8%', 
      trend: 'up',
      icon: FaDollarSign, 
      color: 'bg-yellow-50', 
      iconColor: 'text-yellow-600' 
    }
  ]

  // Chart data (Property Performance)
  const chartData = [
    { day: 'Mon', views: 310, clicks: 155 },
    { day: 'Tue', views: 465, clicks: 155 },
    { day: 'Wed', views: 310, clicks: 77 },
    { day: 'Thu', views: 465, clicks: 232 },
    { day: 'Fri', views: 465, clicks: 310 },
    { day: 'Sat', views: 620, clicks: 310 },
    { day: 'Sun', views: 465, clicks: 232 }
  ]

  // Recent inquiries
  const recentInquiries = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?u=1',
      message: "I'd like to schedule a viewing for the Oakwood Villa property. Is it available this weekend?",
      time: '2m ago',
      method: 'WhatsApp'
    },
    {
      id: 2,
      name: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?u=2',
      message: "Is the price negotiable for the downtown loft? I'm interested but need to discuss terms.",
      time: '45m ago',
      method: 'WhatsApp'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      avatar: 'https://i.pravatar.cc/150?u=3',
      message: "What are the monthly maintenance fees for the coastal breeze retreat?",
      time: '2h ago',
      method: 'WhatsApp'
    },
    {
      id: 4,
      name: 'Kevin Smith',
      avatar: 'https://i.pravatar.cc/150?u=4',
      message: "Could you send me the floor plan and more photos of the garden estate?",
      time: '3h ago',
      method: 'WhatsApp'
    }
  ]

  // Top performing properties
  const topProperties = [
    {
      id: 1,
      title: 'Serene Oakwood Villa',
      location: 'Beverly Hills, CA',
      price: '$2,450,000',
      views: '1.2k',
      days: 24,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Modern Skyline Loft',
      location: 'Downtown Los Angeles',
      price: '$890,000',
      views: '2.4k',
      days: 55,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Coastal Breeze Retreat',
      location: 'Malibu, CA',
      price: '$4,120,000',
      views: '890',
      days: 12,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      status: 'Active'
    },
    {
      id: 4,
      title: 'Sunset Garden Estate',
      location: 'Pasadena, CA',
      price: '$1,750,000',
      views: '2.1k',
      days: 38,
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400',
      status: 'Active'
    }
  ]

  // Leads table data
  const leadsData = [
    {
      id: 1,
      initials: 'RM',
      name: 'Robert Miller',
      property: 'Oakwood Villa',
      status: 'New',
      method: 'Website Form',
      date: 'Oct 28, 2023',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      initials: 'JA',
      name: 'Jessica Alba',
      property: 'Skyline Loft',
      status: 'Contacted',
      method: 'WhatsApp',
      date: 'Oct 27, 2023',
      color: 'bg-pink-500'
    },
    {
      id: 3,
      initials: 'MB',
      name: 'Michael Bay',
      property: 'Malibu Retreat',
      status: 'Closed',
      method: 'Direct Call',
      date: 'Oct 25, 2023',
      color: 'bg-blue-600'
    },
    {
      id: 4,
      initials: 'LP',
      name: 'Linda Parker',
      property: 'Pasadena Estate',
      status: 'Contacted',
      method: 'Email',
      date: 'Oct 24, 2023',
      color: 'bg-green-500'
    },
    {
      id: 5,
      initials: 'TW',
      name: 'Thomas Wayne',
      property: 'Oakwood Villa',
      status: 'New',
      method: 'Zillow Referral',
      date: 'Oct 24, 2023',
      color: 'bg-purple-500'
    }
  ]

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'properties', label: 'My Properties', icon: FaHome },
    { id: 'add', label: 'Add Property', icon: FaPlus },
    { id: 'leads', label: 'Leads / Inquiries', icon: FaEnvelope, badge: 12 },
    { id: 'messaging', label: 'Messaging Center', icon: FaComment },
    { id: 'analytics', label: 'Performance Analytics', icon: FaChartBar },
    { id: 'commission', label: 'Commission Tracking', icon: FaDollarSign },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-20">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FaHome className="text-white text-lg" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">Hompata</span>
              <p className="text-xs text-gray-500">SYSTEM ADMIN</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={activeTab === item.id ? 'text-white' : 'text-gray-400'} />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                    activeTab === item.id ? 'bg-white text-blue-500' : 'bg-green-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer">
            <img 
              src="https://i.pravatar.cc/150?u=admin" 
              alt="Admin" 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900">Marcus Wright</p>
              <p className="text-xs text-gray-500">System Admin</p>
            </div>
            <FaSignOutAlt className="text-gray-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, leads, docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-4 py-2.5 w-80 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Date Range */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl">
                <FaCalendarAlt className="text-gray-500" />
                <span className="text-sm text-gray-600">Oct 1 - Oct 31, 2023</span>
              </div>

              {/* Create Button */}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition">
                <FaPlus size={14} />
                Create Property
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition">
                <FaBell className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const TrendIcon = stat.trend === 'up' ? FaArrowUp : FaArrowDown
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
              )
            })}
          </div>

          {/* Middle Section - Chart & Inquiries */}
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
                {chartData.map((item, index) => (
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
                <button className="text-blue-500 text-sm font-medium">View All →</button>
              </div>
              
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer">
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
                      <p className="text-sm text-gray-600 line-clamp-2">{inquiry.message}</p>
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

          {/* Top Performing Properties */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Top Performing Properties</h3>
                <p className="text-sm text-gray-500">Last 30 Days</p>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                Manage All Properties
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              {topProperties.map((property) => (
                <div key={property.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition">
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      {property.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-900 mb-1">{property.title}</h4>
                    <p className="text-sm text-gray-500 mb-3">{property.location}</p>
                    <p className="text-xl font-bold text-blue-600 mb-3">{property.price}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <FaEye size={14} /> {property.views}
                      </span>
                      <span>{property.days} days</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-1">
                        <FaEdit size={14} />
                      </button>
                      <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition flex items-center justify-center gap-1">
                        <FaComment size={14} />
                      </button>
                      <button className="flex-1 py-2 border border-gray-200 rounded-lg text-red-500 hover:bg-red-50 transition flex items-center justify-center gap-1">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Lead Management</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <FaFilter size={14} /> Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <FaDownload size={14} /> Export CSV
                </button>
              </div>
            </div>
            
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Property Interest</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Lead Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact Method</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date Received</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leadsData.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${lead.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                          {lead.initials}
                        </div>
                        <span className="font-medium text-gray-900">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{lead.property}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'New' ? 'bg-blue-100 text-blue-600' :
                        lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaComment size={14} className="text-gray-400" />
                        {lead.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{lead.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition">
                          <FaWhatsapp size={16} />
                        </button>
                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition">
                          <FaPhone size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
                          •••
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <p>© 2023 Hompata Real Estate Solutions. All rights reserved.</p>
              <div className="flex gap-6">
                <Link to="/" className="hover:text-gray-700">Help Center</Link>
                <Link to="/" className="hover:text-gray-700">Privacy Policy</Link>
                <Link to="/" className="hover:text-gray-700">Terms of Service</Link>
                <Link to="/" className="hover:text-gray-700">API Documentation</Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default Admin
