/* ================================================
   HGASYS - Service Utilisateurs
   Basé sur le modèle User du backend
   ================================================ */

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { buildQueryString } from '../utils/helpers';

const userService = {
  /**
   * Récupérer tous les utilisateurs avec pagination et filtres
   * @param {Object} params - { page, limit, search, role, isActive, sortBy, sortOrder }
   */
  getAll: (params = {}) => {
    const query = buildQueryString({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search,
      role: params.role,
      isActive: params.isActive,
      sortBy: params.sortBy || 'createdAt',
      sortOrder: params.sortOrder || 'desc',
    });
    return api.get(`${API_ENDPOINTS.USERS}${query}`);
  },

  /**
   * Récupérer un utilisateur par ID
   * @param {string} id - ID de l'utilisateur
   */
  getById: (id) => {
    return api.get(`${API_ENDPOINTS.USERS}/${id}`);
  },

  /**
   * Créer un nouvel utilisateur
   * @param {Object} data - Données de l'utilisateur
   */
  create: (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || 'employee',
      phone: data.phone,
      avatar: data.avatar,
      isActive: data.isActive !== undefined ? data.isActive : true,
    };
    return api.post(API_ENDPOINTS.USERS, userData);
  },

  /**
   * Mettre à jour un utilisateur
   * @param {string} id - ID de l'utilisateur
   * @param {Object} data - Données à mettre à jour
   */
  update: (id, data) => {
    const userData = {
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      avatar: data.avatar,
      isActive: data.isActive,
    };
    
    // Ne pas inclure le mot de passe s'il n'est pas modifié
    if (data.password) {
      userData.password = data.password;
    }
    
    return api.put(`${API_ENDPOINTS.USERS}/${id}`, userData);
  },

  /**
   * Supprimer un utilisateur
   * @param {string} id - ID de l'utilisateur
   */
  delete: (id) => {
    return api.delete(`${API_ENDPOINTS.USERS}/${id}`);
  },

  /**
   * Activer/Désactiver un utilisateur
   * @param {string} id - ID de l'utilisateur
   * @param {boolean} isActive - Statut d'activation
   */
  toggleActive: (id, isActive) => {
    return api.patch(`${API_ENDPOINTS.USERS}/${id}/status`, { isActive });
  },

  /**
   * Changer le rôle d'un utilisateur
   * @param {string} id - ID de l'utilisateur
   * @param {string} role - Nouveau rôle
   */
  changeRole: (id, role) => {
    return api.patch(`${API_ENDPOINTS.USERS}/${id}/role`, { role });
  },

  /**
   * Réinitialiser le mot de passe d'un utilisateur (admin)
   * @param {string} id - ID de l'utilisateur
   * @param {string} newPassword - Nouveau mot de passe
   */
  resetPassword: (id, newPassword) => {
    return api.patch(`${API_ENDPOINTS.USERS}/${id}/reset-password`, { 
      password: newPassword 
    });
  },

  /**
   * Récupérer les statistiques des utilisateurs
   */
  getStats: () => {
    return api.get(`${API_ENDPOINTS.USERS}/stats`);
  },

  /**
   * Récupérer les utilisateurs par rôle
   * @param {string} role - Rôle à filtrer
   */
  getByRole: (role) => {
    return api.get(`${API_ENDPOINTS.USERS}?role=${role}`);
  },

  /**
   * Uploader un avatar
   * @param {string} id - ID de l'utilisateur
   * @param {FormData} formData - Données de l'image
   */
  uploadAvatar: (id, formData) => {
    return api.post(`${API_ENDPOINTS.USERS}/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Supprimer l'avatar d'un utilisateur
   * @param {string} id - ID de l'utilisateur
   */
  deleteAvatar: (id) => {
    return api.delete(`${API_ENDPOINTS.USERS}/${id}/avatar`);
  },
};

export default userService;