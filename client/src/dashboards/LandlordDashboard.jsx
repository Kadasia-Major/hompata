import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaPlus, FaEye, FaChartBar, FaDollarSign,
  FaCalendarAlt, FaUsers, FaEnvelope, FaPhone, FaWhatsapp,
  FaSearch, FaFilter, FaDownload, FaBuilding, FaCog,
  FaMoneyBillWave, FaArrowUp, FaArrowDown, FaCommentDots,
  FaUserFriends, FaEllipsisH
} from 'react-icons/fa';

const LandlordDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const landlordStats = [
    { 
      title: 'Total Properties', 
      value: '48', 
      change: '+12%', 
      trend: 'up',
      icon: FaBuilding, 
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      title: 'Active Listings', 
      value: '32', 
      change: '+4.5%', 
      trend: 'up',
      icon: FaHome, 
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      title: 'Monthly Earnings', 
      value: '$124,500', 
      change: '+18.2%', 
      trend: 'up',
      icon: FaDollarSign, 
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    { 
      title: 'Total Inquiries', 
      value: '1,284', 
      change: '-2.1%', 
      trend: 'down',
      icon: FaCommentDots, 
      iconBg: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  ];

  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'properties', label: 'My Properties', icon: FaBuilding },
    { id: 'add', label: 'Add Property', icon: FaPlus },
    { id: 'inquiries', label: 'Inquiries', icon: FaEnvelope },
    { id: 'agents', label: 'Agents Management', icon: FaUserFriends },
    { id: 'earnings', label: 'Earnings', icon: FaMoneyBillWave },
    { id: 'management', label: 'Property Management', icon: FaHome },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  const inquiries = [
    {
      id: 1,
      name: 'Esther Howard',
      property: 'Skyline Penthouse',
      message: "I'm interested in viewing the property this weekend. Is Sunday...",
      time: '2M AGO',
      avatar: 'https://i.pravatar.cc/150?u=11'
    },
    {
      id: 2,
      name: 'Cameron Williamson',
      property: 'Evergreen Villa',
      message: "Is the monthly rent negotiable for a 2-year lease agreement?",
      time: '45M AGO',
      avatar: 'https://i.pravatar.cc/150?u=12'
    },
    {
      id: 3,
      name: 'Brooklyn Simmons',
      property: 'Industrial Loft',
      message: "Does the loft come with parking space or is that...",
      time: '1H AGO',
      avatar: 'https://i.pravatar.cc/150?u=13'
    }
  ];

  // Sparkline component
  const Sparkline = ({ trend }) => {
    const isUp = trend === 'up';
    return (
      <svg width="60" height="20" viewBox="0 0 60 20" className="mt-1">
        <path
          d={isUp ? "M0 18 L12 14 L24 16 L36 8 L48 6 L60 2" : "M0 2 L12 6 L24 4 L36 12 L48 14 L60 18"}
          fill="none"
          stroke={isUp ? '#22c55e' : '#ef4444'}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-20">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-white text-lg" />
            </div>
            <span className="font-bold text-xl text-green-600">Hompata</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${
                  isActive 
                    ? 'bg-green-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={isActive ? 'text-white' : 'text-gray-400'} size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, agents, or inquiries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-4 py-2.5 w-80 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-600">
                <FaCalendarAlt size={14} />
                <span>Jan 01, 2024 - Jul 31, 2024</span>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600">
                <FaPlus size={14} /> Add Property
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {landlordStats.map((stat, index) => {
              const Icon = stat.icon;
              const isPositive = stat.trend === 'up';
              return (
                <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {isPositive ? (
                          <FaArrowUp className="text-green-500" size={12} />
                        ) : (
                          <FaArrowDown className="text-red-500" size={12} />
                        )}
                        <span className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-400">vs last month</span>
                      </div>
                      <Sparkline trend={stat.trend} />
                    </div>
                    <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                      <Icon className={stat.iconColor} size={20} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts and Inquiries Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Earnings Performance Chart */}
            <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Earnings Performance</h3>
                  <p className="text-sm text-gray-500">Visualizing your portfolio's revenue growth over 6 months.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">Revenue</span>
                  <button className="p-1 hover:bg-gray-100 rounded-lg">
                    <FaEllipsisH className="text-gray-400" size={16} />
                  </button>
                </div>
              </div>
              
              {/* Line Chart */}
              <div className="h-64 relative">
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 pr-2">
                  <span>$6000</span>
                  <span>$5520</span>
                  <span>$4950</span>
                  <span>$4370</span>
                  <span>$3800</span>
                </div>
                <div className="ml-12 h-full">
                  <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Area under curve */}
                    <path
                      d="M0,80 Q50,120 100,140 T200,100 T300,60 T400,80 T500,40 T600,20 L600,200 L0,200 Z"
                      fill="url(#revenueGradient)"
                    />
                    {/* Line */}
                    <path
                      d="M0,80 Q50,120 100,140 T200,100 T300,60 T400,80 T500,40 T600,20"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Data points */}
                    <circle cx="0" cy="80" r="4" fill="#3b82f6" />
                    <circle cx="100" cy="140" r="4" fill="#3b82f6" />
                    <circle cx="200" cy="100" r="4" fill="#3b82f6" />
                    <circle cx="300" cy="60" r="4" fill="#3b82f6" />
                    <circle cx="400" cy="80" r="4" fill="#3b82f6" />
                    <circle cx="500" cy="40" r="4" fill="#3b82f6" />
                    <circle cx="600" cy="20" r="4" fill="#3b82f6" />
                  </svg>
                </div>
                <div className="ml-12 flex justify-between mt-2 text-xs text-gray-400">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Inquiries</h3>
                <button className="text-green-500 text-sm font-medium flex items-center gap-1">
                  View All <FaArrowUp className="rotate-45" size={12} />
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">You have 5 unread messages today.</p>
              
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      <img 
                        src={inquiry.avatar} 
                        alt={inquiry.name}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-gray-900">{inquiry.name}</p>
                          <span className="text-xs text-gray-400">{inquiry.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">Re: {inquiry.property}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{inquiry.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandlordDashboard;
