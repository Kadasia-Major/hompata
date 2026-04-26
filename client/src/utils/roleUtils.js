// Role-based access control utilities

export const USER_ROLES = {
  SYSTEM_ADMIN: 'system_admin',
  SYSTEM_MODERATOR: 'system_moderator',
  LANDLORD: 'landlord',
  AGENT: 'agent'
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.SYSTEM_ADMIN]: {
    canManageUsers: true,
    canManageSystem: true,
    canManageAllListings: true,
    canViewAnalytics: true,
    canManageModerators: true,
    canManageSettings: true,
    canDeleteContent: true,
    canBanUsers: true
  },
  [USER_ROLES.SYSTEM_MODERATOR]: {
    canManageUsers: false,
    canManageSystem: false,
    canManageAllListings: true,
    canViewAnalytics: true,
    canManageModerators: false,
    canManageSettings: false,
    canDeleteContent: true,
    canBanUsers: false,
    canApproveListings: true,
    canFlagContent: true,
    canHandleReports: true
  },
  [USER_ROLES.LANDLORD]: {
    canManageUsers: false,
    canManageSystem: false,
    canManageAllListings: false,
    canViewAnalytics: false,
    canManageModerators: false,
    canManageSettings: false,
    canDeleteContent: false,
    canBanUsers: false,
    canManageOwnListings: true,
    canManageTenants: true,
    canCollectRent: true,
    canViewOwnAnalytics: true
  },
  [USER_ROLES.AGENT]: {
    canManageUsers: false,
    canManageSystem: false,
    canManageAllListings: false,
    canViewAnalytics: false,
    canManageModerators: false,
    canManageSettings: false,
    canDeleteContent: false,
    canBanUsers: false,
    canManageOwnListings: true,
    canManageClients: true,
    canScheduleTours: true,
    canEarnCommission: true,
    canViewOwnAnalytics: true
  }
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch (error) {
    return {};
  }
};

export const getCurrentUserRole = () => {
  const user = getCurrentUser();
  return user?.role;
};

export const hasPermission = (permission) => {
  const userRole = getCurrentUserRole();
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions ? permissions[permission] : false;
};

export const canAccessRoute = (route) => {
  const userRole = getCurrentUserRole();
  
  const routePermissions = {
    '/admin': [USER_ROLES.SYSTEM_ADMIN],
    '/dashboard': [USER_ROLES.SYSTEM_MODERATOR, USER_ROLES.LANDLORD, USER_ROLES.AGENT],
    '/admin/users': [USER_ROLES.SYSTEM_ADMIN],
    '/admin/moderators': [USER_ROLES.SYSTEM_ADMIN],
    '/moderation': [USER_ROLES.SYSTEM_MODERATOR],
    '/landlord': [USER_ROLES.LANDLORD],
    '/agent': [USER_ROLES.AGENT]
  };
  
  const allowedRoles = routePermissions[route] || [];
  return allowedRoles.includes(userRole);
};

export const getRoleDisplayName = (role) => {
  const roleNames = {
    [USER_ROLES.SYSTEM_ADMIN]: 'System Administrator',
    [USER_ROLES.SYSTEM_MODERATOR]: 'System Moderator',
    [USER_ROLES.LANDLORD]: 'Landlord',
    [USER_ROLES.AGENT]: 'Real Estate Agent'
  };
  
  return roleNames[role] || 'Unknown Role';
};

export const getRoleColor = (role) => {
  const roleColors = {
    [USER_ROLES.SYSTEM_ADMIN]: 'red',
    [USER_ROLES.SYSTEM_MODERATOR]: 'purple',
    [USER_ROLES.LANDLORD]: 'blue',
    [USER_ROLES.AGENT]: 'green'
  };
  
  return roleColors[role] || 'gray';
};
