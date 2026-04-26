import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SystemAdminDashboard from '../dashboards/SystemAdminDashboard';
import SystemModeratorDashboard from '../dashboards/SystemModeratorDashboard';
import LandlordDashboard from '../dashboards/LandlordDashboard';
import AgentDashboard from '../dashboards/AgentDashboard';

const RoleBasedDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      const parsedUser = userData ? JSON.parse(userData) : null;
      setUser(parsedUser);
      console.log('RoleBasedDashboard - User loaded:', parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const testLogin = (role = 'system_admin') => {
    const testUsers = {
      system_admin: {
        id: 1,
        name: 'System Administrator',
        email: 'admin@hompata.com',
        role: 'system_admin',
        avatar: 'https://i.pravatar.cc/150?u=admin'
      },
      system_moderator: {
        id: 2,
        name: 'System Moderator',
        email: 'moderator@hompata.com',
        role: 'system_moderator',
        avatar: 'https://i.pravatar.cc/150?u=moderator'
      },
      landlord: {
        id: 3,
        name: 'John Kamau',
        email: 'landlord@hompata.com',
        role: 'landlord',
        avatar: 'https://i.pravatar.cc/150?u=landlord'
      },
      agent: {
        id: 4,
        name: 'Sarah Agent',
        email: 'agent@hompata.com',
        role: 'agent',
        avatar: 'https://i.pravatar.cc/150?u=agent'
      }
    };
    
    const testUser = testUsers[role];
    localStorage.setItem('user', JSON.stringify(testUser));
    localStorage.setItem('token', `mock-token-${role}-${Date.now()}`);
    setUser(testUser);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const userRole = user?.role;

  if (!user || !userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access the dashboard.</p>
          
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/login'}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Go to Login
            </button>
            
            <div className="border-t pt-3">
              <p className="text-sm text-gray-500 mb-3">Quick Login for Testing:</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => testLogin('system_admin')}
                  className="bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition"
                >
                  Admin
                </button>
                <button 
                  onClick={() => testLogin('system_moderator')}
                  className="bg-purple-500 text-white py-2 px-3 rounded text-sm hover:bg-purple-600 transition"
                >
                  Moderator
                </button>
                <button 
                  onClick={() => testLogin('landlord')}
                  className="bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition"
                >
                  Landlord
                </button>
                <button 
                  onClick={() => testLogin('agent')}
                  className="bg-green-500 text-white py-2 px-3 rounded text-sm hover:bg-green-600 transition"
                >
                  Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (userRole) {
      case 'system_admin':
        return <SystemAdminDashboard />;
      case 'system_moderator':
        return <SystemModeratorDashboard />;
      case 'landlord':
        return <LandlordDashboard />;
      case 'agent':
        return <AgentDashboard />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Role</h2>
              <p className="text-gray-600">Your user role is not recognized.</p>
              <button 
                onClick={() => window.location.href = '/login'}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Go to Login
              </button>
            </div>
          </div>
        );
    }
  };

  return renderDashboard();
};

export default RoleBasedDashboard;
