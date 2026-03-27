/* ================================================
   HGASYS - Auth Context
   ================================================ */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { 
  TOKEN_KEY, 
  USER_KEY, 
  MESSAGES 
} from '../utils/constants';
import { 
  getStorage, 
  setStorage, 
  removeStorage 
} from '../utils/helpers';
import { hasPermission, hasRole } from '../utils/rbac';
import authService from '../services/authService';

// Création du contexte
const AuthContext = createContext(null);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialisation au chargement
  useEffect(() => {
    initializeAuth();
  }, []);

  // Initialiser l'authentification depuis le storage
  const initializeAuth = async () => {
    try {
      const storedToken = getStorage(TOKEN_KEY);
      const storedUser = getStorage(USER_KEY);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        setIsAuthenticated(true);

        // Vérifier si le token est encore valide
        try {
          const response = await authService.getMe();
          if (response.data?.data) {
            setUser(response.data.data.user || response.data.data);
            setStorage(USER_KEY, response.data.data.user || response.data.data);
          }
        } catch (error) {
          // Token invalide, déconnecter
          console.error('Token validation failed:', error);
          handleLogout();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Connexion
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });

      // Extraire les données de la réponse
      const responseData = response.data?.data || response.data;
      const { token: newToken, user: userData } = responseData;

      // Sauvegarder dans le state et le storage
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
      setStorage(TOKEN_KEY, newToken);
      setStorage(USER_KEY, userData);

      toast.success(MESSAGES.SUCCESS.LOGIN);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || MESSAGES.ERROR.LOGIN;
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Inscription
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);

      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || MESSAGES.ERROR.GENERIC;
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const handleLogout = useCallback(() => {
    // Nettoyer le state
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    // Nettoyer le storage
    removeStorage(TOKEN_KEY);
    removeStorage(USER_KEY);
  }, []);

  const logout = useCallback(() => {
    handleLogout();

    // Appeler l'API de logout (optionnel)
    authService.logout().catch(() => {});

    toast.info(MESSAGES.SUCCESS.LOGOUT);
  }, [handleLogout]);

  // Mise à jour du profil
  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      
      // Mettre à jour le user dans le state et le storage
      const updatedUser = response.data?.data?.user || response.data?.data || response.data;
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      setStorage(USER_KEY, newUser);

      toast.success(MESSAGES.SUCCESS.UPDATE);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.data?.message || MESSAGES.ERROR.GENERIC;
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Changement de mot de passe
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await authService.changePassword({ currentPassword, newPassword });
      toast.success('Mot de passe modifié avec succès');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || MESSAGES.ERROR.GENERIC;
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Vérifier une permission
  const checkPermission = useCallback((permission) => {
    return hasPermission(user, permission);
  }, [user]);

  // Vérifier un rôle
  const checkRole = useCallback((role) => {
    return hasRole(user, role);
  }, [user]);

  // Valeur du contexte
  const value = {
    // State
    user,
    token,
    loading,
    isAuthenticated,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,

    // Helpers
    checkPermission,
    checkRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  
  return context;
};

// Export par défaut du contexte
export default AuthContext;