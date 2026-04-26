// Mock authentication for testing different user roles

export const mockUsers = {
  system_admin: {
    id: 1,
    name: 'System Administrator',
    email: 'admin@hompata.com',
    password: 'admin123',
    role: 'system_admin',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  },
  system_moderator: {
    id: 2,
    name: 'System Moderator',
    email: 'moderator@hompata.com',
    password: 'moderator123',
    role: 'system_moderator',
    avatar: 'https://i.pravatar.cc/150?u=moderator'
  },
  landlord: {
    id: 3,
    name: 'John Kamau',
    email: 'landlord@hompata.com',
    password: 'landlord123',
    role: 'landlord',
    avatar: 'https://i.pravatar.cc/150?u=landlord'
  },
  agent: {
    id: 4,
    name: 'Sarah Agent',
    email: 'agent@hompata.com',
    password: 'agent123',
    role: 'agent',
    avatar: 'https://i.pravatar.cc/150?u=agent'
  }
};

export const mockLogin = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const user = Object.values(mockUsers).find(
    u => u.email === email && u.password === password
  );
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return {
      token: `mock-token-${user.role}-${Date.now()}`,
      user: userWithoutPassword
    };
  }
  
  throw new Error('Invalid credentials');
};

export const getMockUserByRole = (role) => {
  return mockUsers[role];
};

// Quick login functions for testing
export const quickLogin = (role) => {
  const user = mockUsers[role];
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('token', `mock-token-${user.role}-${Date.now()}`);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return true;
  }
  return false;
};
