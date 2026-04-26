import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaUsers, FaEye, FaEdit, FaTrash, FaCheck, FaTimes,
  FaChartBar, FaEnvelope, FaSearch, FaBell, FaCalendarAlt, FaFilter,
  FaDownload, FaFlag, FaExclamationTriangle, FaUserCheck, FaBan,
  FaComments, FaStar, FaThumbsUp, FaThumbsDown, FaArrowUp, FaArrowDown,
  FaPhone, FaWhatsapp, FaShieldAlt, FaBuilding, FaLock, FaCreditCard,
  FaCog, FaArrowRight, FaSignOutAlt, FaChevronLeft
} from 'react-icons/fa';

const SystemModeratorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const moderatorStats = [
    { 
      title: 'Total Users', 
      value: '12,540', 
      change: '+12.5%', 
      trend: 'up',
      icon: FaUsers, 
      color: 'bg-blue-50', 
      iconColor: 'text-blue-600' 
    },
    { 
      title: 'Total Properties', 
      value: '5,230', 
      change: '+8.2%', 
      trend: 'up',
      icon: FaBuilding, 
      color: 'bg-blue-50', 
      iconColor: 'text-blue-600' 
    },
    { 
      title: 'Active Listings', 
      value: '3,480', 
      change: '+5.4%', 
      trend: 'up',
      icon: FaEye, 
      color: 'bg-blue-50', 
      iconColor: 'text-blue-600' 
    },
    { 
      title: 'Pending Approvals', 
      value: '42', 
      change: '-2.1%', 
      trend: 'down',
      icon: FaCheck, 
      color: 'bg-red-50', 
      iconColor: 'text-red-600' 
    }
  ];

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: FaChartBar },
    { id: 'users', label: 'User Management', icon: FaUsers },
    { id: 'listings', label: 'Property Listings', icon: FaHome },
    { id: 'roles', label: 'Roles & Permissions', icon: FaLock },
    { id: 'payments', label: 'Payments & Revenue', icon: FaCreditCard }
  ];

  const analyticsItems = [
    { id: 'performance', label: 'Performance', icon: FaChartBar },
    { id: 'reports', label: 'Reports & Logs', icon: FaEnvelope },
    { id: 'settings', label: 'System Settings', icon: FaCog }
  ];

  const activityFeed = [
    {
      id: 1,
      user: 'Sarah Jenkins',
      action: 'approved property',
      target: '#HP-9021',
      time: '2 mins ago',
      avatar: 'https://i.pravatar.cc/150?u=1',
      type: 'approve'
    },
    {
      id: 2,
      user: 'Robert Fox',
      action: 'added new agent',
      target: 'Marcus Holloway',
      time: '15 mins ago',
      avatar: 'https://i.pravatar.cc/150?u=2',
      type: 'add'
    },
    {
      id: 3,
      user: 'System',
      action: 'payment received',
      target: '$1,200',
      time: '1 hour ago',
      avatar: null,
      type: 'payment'
    },
    {
      id: 4,
      user: 'Angela Yu',
      action: 'rejected property',
      target: '#HP-4451',
      time: '3 hours ago',
      avatar: 'https://i.pravatar.cc/150?u=4',
      type: 'reject'
    },
    {
      id: 5,
      user: 'David Kim',
      action: 'updated role for',
      target: 'Chris',
      time: '5 hours ago',
      avatar: 'https://i.pravatar.cc/150?u=5',
      type: 'update'
    }
  ];

  // Sparkline component
  const Sparkline = ({ trend, color }) => {
    const isUp = trend === 'up';
    const strokeColor = isUp ? '#22c55e' : '#ef4444';
    
    return (
      <svg width="60" height="24" viewBox="0 0 60 24" className="mt-2">
        <path
          d={isUp ? "M0 20 L15 15 L30 18 L45 8 L60 4" : "M0 4 L15 8 L30 6 L45 15 L60 20"}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 fixed h-full z-20 transition-all duration-300`}>
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaHome className="text-white text-lg" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-xl text-blue-600">Hompata</span>
            )}
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          <div className={`text-xs font-semibold text-gray-400 mb-2 ${sidebarCollapsed ? 'text-center' : 'px-4'}`}>
            {sidebarCollapsed ? 'MENU' : 'MAIN MENU'}
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className={isActive ? 'text-green-600' : 'text-gray-400'} size={18} />
                {!sidebarCollapsed && <span className="font-medium text-sm">{item.label}</span>}
              </button>
            );
          })}

          <div className={`text-xs font-semibold text-gray-400 mt-6 mb-2 ${sidebarCollapsed ? 'text-center' : 'px-4'}`}>
            {sidebarCollapsed ? 'ANALYTICS' : 'ANALYTICS'}
          </div>
          {analyticsItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-gray-600 hover:bg-gray-100 ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className="text-gray-400" size={18} />
                {!sidebarCollapsed && <span className="font-medium text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-100">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center gap-3 px-6 py-3 text-gray-500 hover:bg-gray-50 transition text-sm"
          >
            <FaChevronLeft className={`transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            {!sidebarCollapsed && <span>Collapse Sidebar</span>}
          </button>
          <div className="px-6 py-4 border-t border-gray-100">
            <button className={`flex items-center gap-3 text-red-500 hover:text-red-600 ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
              <FaSignOutAlt />
              {!sidebarCollapsed && <span className="text-sm font-medium">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-xl">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users, properties, invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-2.5 w-full bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            
            <div className="flex items-center gap-4 ml-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <button className="px-3 py-1.5 hover:bg-gray-100 rounded-lg">7D</button>
                <button className="px-3 py-1.5 hover:bg-gray-100 rounded-lg">30D</button>
                <button className="px-3 py-1.5 bg-gray-900 text-white rounded-lg">12M</button>
              </div>

              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition">
                <FaBell className="text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="font-semibold text-sm text-gray-900">Alexander Pierce</p>
                  <p className="text-xs text-gray-500">Super Administrator</p>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
                </div>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <FaCalendarAlt size={14} />
                Showing data for: <span className="font-semibold text-gray-700">March 1, 2024 - March 30, 2024</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">
                <FaDownload size={14} /> Export CSV
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600">
                <FaPlus size={14} /> Create Listing
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {moderatorStats.map((stat, index) => {
              const Icon = stat.icon;
              const isPositive = stat.trend === 'up';
              return (
                <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className={stat.iconColor} size={20} />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-xs text-gray-400 mt-2">vs. last 30 days</p>
                  <Sparkline trend={stat.trend} />
                </div>
              );
            })}
          </div>

          {/* Charts and Activity Section */}
          <div className="grid grid-cols-3 gap-6">
            {/* Revenue Analytics Chart */}
            <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
                  <p className="text-sm text-gray-500">Platform earnings over the last 12 months (USD)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">Gross Revenue</span>
                  <button className="p-1 hover:bg-gray-100 rounded-lg">
                    <FaEllipsisH className="text-gray-400" size={16} />
                  </button>
                </div>
              </div>
              
              {/* Line Chart */}
              <div className="h-64 relative">
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 pr-2">
                  <span>$120k</span>
                  <span>$90k</span>
                  <span>$60k</span>
                  <span>$30k</span>
                  <span>$0k</span>
                </div>
                <div className="ml-12 h-full">
                  <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,150 Q30,140 60,135 T120,120 T180,110 T240,100 T300,85 T360,75 T420,50 T500,25"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,150 Q30,140 60,135 T120,120 T180,110 T240,100 T300,85 T360,75 T420,50 T500,25 L500,200 L0,200 Z"
                      fill="url(#chartGradient)"
                    />
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
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>

            {/* System Activity */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">System Activity</h3>
                  <p className="text-sm text-gray-500">Latest events from across the platform</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {activity.avatar ? (
                      <img 
                        src={activity.avatar} 
                        alt={activity.user}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FaClock className="text-blue-600" size={14} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className={`font-semibold ${
                          activity.type === 'payment' ? 'text-green-600' : 'text-blue-600'
                        }`}>{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaArrowRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>&copy; 2024 Hompata SaaS. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gray-700">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700">Terms of Service</a>
              <a href="#" className="hover:text-gray-700">Help Center</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

// Missing icon import
const FaPlus = ({ size, className }) => (
  <svg 
    stroke="currentColor" 
    fill="currentColor" 
    strokeWidth="0" 
    viewBox="0 0 448 512" 
    height={size || "1em"} 
    width={size || "1em"}
    className={className}
  >
    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
  </svg>
);

const FaEllipsisH = ({ size, className }) => (
  <svg 
    stroke="currentColor" 
    fill="currentColor" 
    strokeWidth="0" 
    viewBox="0 0 512 512" 
    height={size || "1em"} 
    width={size || "1em"}
    className={className}
  >
    <path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-312 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path>
  </svg>
);

const FaClock = ({ size, className }) => (
  <svg 
    stroke="currentColor" 
    fill="currentColor" 
    strokeWidth="0" 
    viewBox="0 0 512 512" 
    height={size || "1em"} 
    width={size || "1em"}
    className={className}
  >
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v141.7l66 97.8c3.9 5.3.7 12.8-5.7 12.8h-54c-3.1 0-6-1.6-7.6-4.3z"></path>
  </svg>
);

export default SystemModeratorDashboard;
