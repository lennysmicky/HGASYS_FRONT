/* ================================================
   HGASYS - Validateurs
   ================================================ */

import { VALIDATION } from './constants';

/**
 * Valide un champ requis
 */
export const required = (value, fieldName = 'Ce champ') => {
  if (value === null || value === undefined || value === '') {
    return `${fieldName} est requis`;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return `${fieldName} est requis`;
  }
  return null;
};

/**
 * Valide un email
 */
export const email = (value) => {
  if (!value) return null;
  
  if (!VALIDATION.EMAIL_REGEX.test(value)) {
    return 'Email invalide';
  }
  return null;
};

/**
 * Valide une longueur minimum
 */
export const minLength = (min) => (value, fieldName = 'Ce champ') => {
  if (!value) return null;
  
  if (value.length < min) {
    return `${fieldName} doit contenir au moins ${min} caractères`;
  }
  return null;
};

/**
 * Valide une longueur maximum
 */
export const maxLength = (max) => (value, fieldName = 'Ce champ') => {
  if (!value) return null;
  
  if (value.length > max) {
    return `${fieldName} ne doit pas dépasser ${max} caractères`;
  }
  return null;
};

/**
 * Valide un mot de passe
 */
export const password = (value) => {
  if (!value) return null;
  
  if (value.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return `Le mot de passe doit contenir au moins ${VALIDATION.PASSWORD_MIN_LENGTH} caractères`;
  }
  return null;
};

/**
 * Valide la confirmation du mot de passe
 */
export const confirmPassword = (password) => (value) => {
  if (!value) return null;
  
  if (value !== password) {
    return 'Les mots de passe ne correspondent pas';
  }
  return null;
};

/**
 * Valide un numéro de téléphone
 */
export const phone = (value) => {
  if (!value) return null;
  
  const cleaned = value.replace(/\s/g, '');
  if (!VALIDATION.PHONE_REGEX.test(cleaned)) {
    return 'Numéro de téléphone invalide';
  }
  return null;
};

/**
 * Valide un nombre positif
 */
export const positiveNumber = (value, fieldName = 'Ce champ') => {
  if (value === null || value === undefined || value === '') return null;
  
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) {
    return `${fieldName} doit être un nombre positif`;
  }
  return null;
};

/**
 * Valide un nombre dans une plage
 */
export const numberRange = (min, max) => (value, fieldName = 'Ce champ') => {
  if (value === null || value === undefined || value === '') return null;
  
  const num = parseFloat(value);
  if (isNaN(num)) {
    return `${fieldName} doit être un nombre`;
  }
  if (num < min || num > max) {
    return `${fieldName} doit être entre ${min} et ${max}`;
  }
  return null;
};

/**
 * Valide une date
 */
export const date = (value) => {
  if (!value) return null;
  
  const d = new Date(value);
  if (isNaN(d.getTime())) {
    return 'Date invalide';
  }
  return null;
};

/**
 * Valide une date future
 */
export const futureDate = (value) => {
  if (!value) return null;
  
  const d = new Date(value);
  if (isNaN(d.getTime())) {
    return 'Date invalide';
  }
  if (d <= new Date()) {
    return 'La date doit être dans le futur';
  }
  return null;
};

/**
 * Valide une date passée
 */
export const pastDate = (value) => {
  if (!value) return null;
  
  const d = new Date(value);
  if (isNaN(d.getTime())) {
    return 'Date invalide';
  }
  if (d >= new Date()) {
    return 'La date doit être dans le passé';
  }
  return null;
};

/**
 * Combine plusieurs validateurs
 */
export const compose = (...validators) => (value, fieldName) => {
  for (const validator of validators) {
    const error = validator(value, fieldName);
    if (error) return error;
  }
  return null;
};

/**
 * Valide un formulaire complet
 */
export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = values[field];
    
    // Si c'est un tableau de validateurs
    if (Array.isArray(fieldRules)) {
      for (const validator of fieldRules) {
        const error = validator(value, field);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    } 
    // Si c'est un seul validateur
    else if (typeof fieldRules === 'function') {
      const error = fieldRules(value, field);
      if (error) {
        errors[field] = error;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Règles de validation prédéfinies
export const rules = {
  // User
  userName: compose(required, minLength(2), maxLength(50)),
  userEmail: compose(required, email),
  userPassword: compose(required, password),
  
  // Employee
  employeeName: compose(required, minLength(2), maxLength(50)),
  employeePosition: compose(required, minLength(2)),
  employeeSalary: compose(required, positiveNumber),
  
  // Client
  clientName: compose(required, minLength(2), maxLength(100)),
  clientEmail: email,
  clientPhone: phone,
  
  // Vehicle
  vehicleBrand: required,
  vehicleModel: compose(required, minLength(1)),
  vehiclePrice: compose(required, positiveNumber),
  vehicleYear: compose(required, numberRange(1900, new Date().getFullYear() + 1)),
  
  // Sale
  saleAmount: compose(required, positiveNumber),
  saleClient: required,
  saleVehicle: required,
};

export default {
  required,
  email,
  minLength,
  maxLength,
  password,
  confirmPassword,
  phone,
  positiveNumber,
  numberRange,
  date,
  futureDate,
  pastDate,
  compose,
  validateForm,
  rules,
};