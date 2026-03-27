/* ================================================
   HGASYS - Service d'authentification
   Basé sur le backend authController.js
   ================================================ */

import api from './api';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  PROFILE: '/auth/profile',
  PASSWORD: '/auth/password',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY: '/auth/verify',
};

const authService = {
  /**
   * Connexion utilisateur
   * @param {Object} credentials - { email, password }
   * @returns {Promise} - { user, employee, token }
   */
  login: (credentials) => {
    return api.post(AUTH_ENDPOINTS.LOGIN, {
      email: credentials.email,
      password: credentials.password,
    });
  },

  /**
   * Inscription utilisateur
   * @param {Object} userData - { name, email, password, phone }
   * @returns {Promise} - { user, token }
   */
  register: (userData) => {
    return api.post(AUTH_ENDPOINTS.REGISTER, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
    });
  },

  /**
   * Déconnexion
   * @returns {Promise}
   */
  logout: () => {
    return api.post(AUTH_ENDPOINTS.LOGOUT);
  },

  /**
   * Récupérer l'utilisateur connecté
   * @returns {Promise} - { user, employee }
   */
  getMe: () => {
    return api.get(AUTH_ENDPOINTS.ME);
  },

  /**
   * Mettre à jour le profil
   * @param {Object} profileData - { name, phone, avatar }
   * @returns {Promise} - { user }
   */
  updateProfile: (profileData) => {
    return api.put(AUTH_ENDPOINTS.PROFILE, profileData);
  },

  /**
   * Changer le mot de passe
   * @param {Object} data - { currentPassword, newPassword }
   * @returns {Promise} - { token }
   */
  changePassword: (data) => {
    return api.put(AUTH_ENDPOINTS.PASSWORD, {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  },

  /**
   * Mot de passe oublié
   * @param {string} email
   * @returns {Promise}
   */
  forgotPassword: (email) => {
    return api.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
  },

  /**
   * Réinitialiser le mot de passe
   * @param {string} resetToken
   * @param {string} password
   * @returns {Promise} - { token }
   */
  resetPassword: (resetToken, password) => {
    return api.put(`${AUTH_ENDPOINTS.RESET_PASSWORD}/${resetToken}`, { password });
  },

  /**
   * Vérifier la validité du token
   * @returns {Promise} - { user, valid }
   */
  verifyToken: () => {
    return api.get(AUTH_ENDPOINTS.VERIFY);
  },
};

export default authService;