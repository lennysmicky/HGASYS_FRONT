/* ================================================
   HGASYS - Fonctions Utilitaires
   ================================================ */

import { CURRENCY, LOCALE, DATE_FORMAT, DATETIME_FORMAT } from './constants';

// ===== FORMATAGE DES DATES =====

/**
 * Formate une date en format français
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '-';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';
  
  const options = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: '2-digit', month: 'long', year: 'numeric' },
    datetime: { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' },
    time: { hour: '2-digit', minute: '2-digit' },
    relative: null,
  };
  
  if (format === 'relative') {
    return getRelativeTime(d);
  }
  
  return d.toLocaleDateString(LOCALE, options[format] || options.short);
};

/**
 * Retourne le temps relatif (il y a X minutes, etc.)
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  if (days < 7) return `Il y a ${days}j`;
  
  return formatDate(date, 'short');
};

// ===== FORMATAGE DES NOMBRES =====

/**
 * Formate un montant en devise
 */
export const formatCurrency = (amount, currency = CURRENCY) => {
  if (amount === null || amount === undefined) return '-';
  
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formate un nombre avec séparateurs
 */
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined) return '-';
  
  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

/**
 * Formate un pourcentage
 */
export const formatPercent = (value, decimals = 1) => {
  if (value === null || value === undefined) return '-';
  return `${formatNumber(value, decimals)}%`;
};

// ===== MANIPULATION DE CHAÎNES =====

/**
 * Met la première lettre en majuscule
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Tronque une chaîne
 */
export const truncate = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

/**
 * Génère des initiales à partir d'un nom
 */
export const getInitials = (name) => {
  if (!name) return '?';
  
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Génère un slug à partir d'une chaîne
 */
export const slugify = (str) => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ===== VALIDATION =====

/**
 * Vérifie si un email est valide
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Vérifie si un numéro de téléphone est valide (format français)
 */
export const isValidPhone = (phone) => {
  const regex = /^(\+33|0)[1-9](\d{2}){4}$/;
  return regex.test(phone.replace(/\s/g, ''));
};

/**
 * Vérifie si un objet est vide
 */
export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj === 'string') return obj.trim().length === 0;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

// ===== MANIPULATION D'OBJETS =====

/**
 * Supprime les clés vides d'un objet
 */
export const removeEmptyKeys = (obj) => {
  const result = {};
  
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value !== null && value !== undefined && value !== '') {
      result[key] = value;
    }
  });
  
  return result;
};

/**
 * Deep clone d'un objet
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Compare deux objets
 */
export const isEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

// ===== GESTION DES ERREURS =====

/**
 * Extrait le message d'erreur d'une réponse API
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'Une erreur est survenue';
};

// ===== STORAGE =====

/**
 * Sauvegarde dans le localStorage
 */
export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
};

/**
 * Récupère depuis le localStorage
 */
export const getStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Storage error:', error);
    return defaultValue;
  }
};

/**
 * Supprime du localStorage
 */
export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
};

// ===== QUERY PARAMS =====

/**
 * Construit une query string à partir d'un objet
 */
export const buildQueryString = (params) => {
  const cleaned = removeEmptyKeys(params);
  const searchParams = new URLSearchParams();
  
  Object.entries(cleaned).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(key, v));
    } else {
      searchParams.append(key, value);
    }
  });
  
  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

/**
 * Parse une query string en objet
 */
export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};
  
  params.forEach((value, key) => {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });
  
  return result;
};

// ===== DEBOUNCE / THROTTLE =====

/**
 * Debounce une fonction
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle une fonction
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// ===== COULEURS =====

/**
 * Génère une couleur à partir d'une chaîne
 */
export const stringToColor = (str) => {
  if (!str) return '#7b68ee';
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    '#7b68ee', '#2ecc71', '#3498db', '#e74c3c', '#f39c12',
    '#9b59b6', '#1abc9c', '#e67e22', '#34495e', '#16a085',
  ];
  
  return colors[Math.abs(hash) % colors.length];
};

// ===== FICHIERS =====

/**
 * Formate la taille d'un fichier
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Vérifie l'extension d'un fichier
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
};

// ===== DOWNLOAD =====

/**
 * Télécharge un fichier depuis une URL
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Télécharge un blob en tant que fichier
 */
export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  downloadFile(url, filename);
  window.URL.revokeObjectURL(url);
};

export default {
  formatDate,
  getRelativeTime,
  formatCurrency,
  formatNumber,
  formatPercent,
  capitalize,
  truncate,
  getInitials,
  slugify,
  isValidEmail,
  isValidPhone,
  isEmpty,
  removeEmptyKeys,
  deepClone,
  isEqual,
  getErrorMessage,
  setStorage,
  getStorage,
  removeStorage,
  buildQueryString,
  parseQueryString,
  debounce,
  throttle,
  stringToColor,
  formatFileSize,
  getFileExtension,
  downloadFile,
  downloadBlob,
};