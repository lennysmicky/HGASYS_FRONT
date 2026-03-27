/* ================================================
   HGASYS - Role-Based Access Control
   ================================================ */

import { ROLES, PERMISSIONS } from './constants';

/**
 * Vérifie si un utilisateur a un rôle spécifique
 */
export const hasRole = (user, role) => {
  if (!user || !user.role) return false;
  
  if (Array.isArray(role)) {
    return role.includes(user.role);
  }
  
  return user.role === role;
};

/**
 * Vérifie si un utilisateur a une permission spécifique
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  
  const userPermissions = PERMISSIONS[user.role] || [];
  
  if (Array.isArray(permission)) {
    return permission.some(p => userPermissions.includes(p));
  }
  
  return userPermissions.includes(permission);
};

/**
 * Vérifie si un utilisateur a toutes les permissions spécifiées
 */
export const hasAllPermissions = (user, permissions) => {
  if (!user || !user.role) return false;
  if (!Array.isArray(permissions)) return hasPermission(user, permissions);
  
  const userPermissions = PERMISSIONS[user.role] || [];
  return permissions.every(p => userPermissions.includes(p));
};

/**
 * Vérifie si un utilisateur est admin
 */
export const isAdmin = (user) => {
  return hasRole(user, ROLES.ADMIN);
};

/**
 * Vérifie si un utilisateur est manager ou admin
 */
export const isManagerOrAdmin = (user) => {
  return hasRole(user, [ROLES.ADMIN, ROLES.MANAGER]);
};

/**
 * Récupère toutes les permissions d'un utilisateur
 */
export const getUserPermissions = (user) => {
  if (!user || !user.role) return [];
  return PERMISSIONS[user.role] || [];
};

/**
 * Vérifie si un utilisateur peut accéder à une route
 */
export const canAccessRoute = (user, routePermission) => {
  if (!routePermission) return true;
  return hasPermission(user, routePermission);
};

/**
 * Filtre les éléments de menu selon les permissions
 */
export const filterMenuByPermissions = (menuItems, user) => {
  if (!user) return [];
  
  return menuItems.reduce((acc, item) => {
    // Vérifier la permission de l'item principal
    if (item.permission && !hasPermission(user, item.permission)) {
      return acc;
    }
    
    // Copier l'item
    const filteredItem = { ...item };
    
    // Filtrer les enfants si présents
    if (item.children) {
      filteredItem.children = item.children.filter(child => {
        if (!child.permission) return true;
        return hasPermission(user, child.permission);
      });
      
      // Ne pas inclure si aucun enfant visible
      if (filteredItem.children.length === 0 && !item.path) {
        return acc;
      }
    }
    
    acc.push(filteredItem);
    return acc;
  }, []);
};

/**
 * Vérifie si un utilisateur peut effectuer une action sur une ressource
 */
export const canPerformAction = (user, resource, action) => {
  const permission = `${resource}:${action}`;
  return hasPermission(user, permission);
};

/**
 * Retourne le label du rôle
 */
export const getRoleLabel = (role) => {
  const labels = {
    [ROLES.ADMIN]: 'Administrateur',
    [ROLES.MANAGER]: 'Manager',
    [ROLES.EMPLOYEE]: 'Employé',
  };
  
  return labels[role] || role;
};

/**
 * Retourne la couleur du badge du rôle
 */
export const getRoleBadgeColor = (role) => {
  const colors = {
    [ROLES.ADMIN]: 'danger',
    [ROLES.MANAGER]: 'warning',
    [ROLES.EMPLOYEE]: 'primary',
  };
  
  return colors[role] || 'secondary';
};

export default {
  hasRole,
  hasPermission,
  hasAllPermissions,
  isAdmin,
  isManagerOrAdmin,
  getUserPermissions,
  canAccessRoute,
  filterMenuByPermissions,
  canPerformAction,
  getRoleLabel,
  getRoleBadgeColor,
};