import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, FaShieldAlt, FaDatabase, FaCog, FaChartBar, 
  FaHome, FaPlus, FaEnvelope, FaDollarSign, FaSignOutAlt,
  FaSearch, FaBell, FaCalendarAlt, FaEye, FaEdit, FaTrash,
  FaPhone, FaWhatsapp, FaComment, FaArrowUp, FaArrowDown,
  FaFilter, FaDownload, FaUserShield, FaLock, FaKey,
  FaServer
} from 'react-icons/fa';

const SystemAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Test render
  console.log('SystemAdminDashboard rendering...');

  // System stats
  const systemStats = [
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
      title: 'System Health', 
      value: '99.8%', 
      change: 'Stable', 
      trend: 'up',
      icon: FaServer, 
      color: 'bg-purple-50', 
      iconColor: 'text-purple-600' 
    },
    { 
      title: 'Revenue', 
      value: 'KSh 2.4M', 
      change: '+15%', 
      trend: 'up',
      icon: FaDollarSign, 
      color: 'bg-yellow-50', 
      iconColor: 'text-yellow-600' 
    }
  ];

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'users', label: 'Users', icon: FaUsers },
    { id: 'moderators', label: 'Moderators', icon: FaUserShield },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'database', label: 'Database', icon: FaDatabase },
    { id: 'analytics', label: 'System Analytics', icon: FaChartBar },
    { id: 'settings', label: 'System Settings', icon: FaCog }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">System Admin Dashboard</h1>
        <p className="text-gray-600 mb-4">Dashboard component is working!</p>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-semibold mb-4">Test Information</h2>
          <div className="text-left space-y-2">
            <p><strong>Component:</strong> SystemAdminDashboard</p>
            <p><strong>Active Tab:</strong> {activeTab}</p>
            <p><strong>Status:</strong> ✅ Rendering Successfully</p>
          </div>
          <div className="mt-4 space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Test Tab Change
            </button>
            <button 
              onClick={() => window.location.href = '/login'}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAdminDashboard;
