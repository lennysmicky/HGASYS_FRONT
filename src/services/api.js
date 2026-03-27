// ================================
// HGA - Configuration Axios API
// ================================

import axios from 'axios';
import { toast } from 'react-toastify';

// URL de base de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Créer l'instance Axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ══════════════════════════════════
// INTERCEPTEUR DE REQUÊTE
// ══════════════════════════════════
api.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log en développement
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`, config.data || '');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ══════════════════════════════════
// INTERCEPTEUR DE RÉPONSE
// ══════════════════════════════════
api.interceptors.response.use(
  (response) => {
    // Log en développement
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.log(`📥 ${response.status} ${response.config.url}`, response.data);
    }

    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Log de l'erreur
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.error('❌ API Error:', error.response?.data || error.message);
    }

    // Gestion des erreurs
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Token expiré ou invalide
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            
            // Supprimer le token et rediriger
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Ne pas afficher de toast si c'est la page login
            if (!window.location.pathname.includes('/login')) {
              toast.error('Session expirée. Veuillez vous reconnecter.');
              window.location.href = '/login';
            }
          }
          break;

        case 403:
          toast.error('Accès non autorisé');
          break;

        case 404:
          // Pas de toast pour 404, géré par le composant
          break;

        case 422:
        case 400:
          // Erreurs de validation - afficher les détails
          if (data.errors && Array.isArray(data.errors)) {
            data.errors.forEach((err) => {
              toast.error(err.message || err.msg || 'Erreur de validation');
            });
          } else {
            toast.error(data.message || 'Erreur de validation');
          }
          break;

        case 500:
          toast.error('Erreur serveur. Veuillez réessayer plus tard.');
          break;

        default:
          toast.error(data.message || 'Une erreur est survenue');
      }
    } else if (error.request) {
      // Pas de réponse du serveur
      toast.error('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } else {
      toast.error('Une erreur est survenue');
    }

    return Promise.reject(error);
  }
);

// ══════════════════════════════════
// MÉTHODES UTILITAIRES
// ══════════════════════════════════

/**
 * GET avec paramètres de requête
 */
export const get = async (url, params = {}) => {
  const response = await api.get(url, { params });
  return response.data;
};

/**
 * POST
 */
export const post = async (url, data = {}) => {
  const response = await api.post(url, data);
  return response.data;
};

/**
 * PUT
 */
export const put = async (url, data = {}) => {
  const response = await api.put(url, data);
  return response.data;
};

/**
 * PATCH
 */
export const patch = async (url, data = {}) => {
  const response = await api.patch(url, data);
  return response.data;
};

/**
 * DELETE
 */
export const del = async (url, data = {}) => {
  const response = await api.delete(url, { data });
  return response.data;
};

/**
 * Upload de fichier
 */
export const upload = async (url, formData, onProgress) => {
  const response = await api.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percent);
      }
    },
  });
  return response.data;
};

/**
 * Télécharger un fichier
 */
export const download = async (url, filename) => {
  const response = await api.get(url, {
    responseType: 'blob',
  });

  // Créer un lien de téléchargement
  const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};

export default api;