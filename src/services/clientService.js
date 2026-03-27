/* ================================================
   HGASYS - Service Clients
   Basé sur le modèle Client du backend
   ================================================ */

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { buildQueryString } from '../utils/helpers';

const clientService = {
  /**
   * Récupérer tous les clients avec pagination et filtres
   * @param {Object} params - { page, limit, search, type, status, source, city, sortBy, sortOrder }
   */
  getAll: (params = {}) => {
    const query = buildQueryString({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search,
      type: params.type,
      status: params.status,
      source: params.source,
      city: params.city,
      assignedTo: params.assignedTo,
      sortBy: params.sortBy || 'createdAt',
      sortOrder: params.sortOrder || 'desc',
    });
    return api.get(`${API_ENDPOINTS.CLIENTS}${query}`);
  },

  /**
   * Récupérer un client par ID
   * @param {string} id - ID du client
   */
  getById: (id) => {
    return api.get(`${API_ENDPOINTS.CLIENTS}/${id}`);
  },

  /**
   * Créer un nouveau client
   * @param {Object} data - Données du client
   */
  create: (data) => {
    const clientData = {
      // Type de client
      type: data.type || 'individual',
      
      // Particulier
      firstName: data.firstName,
      lastName: data.lastName,
      
      // Entreprise
      companyName: data.companyName,
      siret: data.siret,
      
      // Contact
      email: data.email,
      phone: data.phone,
      secondaryPhone: data.secondaryPhone,
      
      // Adresse
      address: {
        street: data.street || data.address?.street,
        city: data.city || data.address?.city,
        zipCode: data.zipCode || data.address?.zipCode,
        country: data.country || data.address?.country || 'France',
      },
      
      // Informations supplémentaires
      dateOfBirth: data.dateOfBirth,
      nationalId: data.nationalId,
      driverLicense: {
        number: data.driverLicenseNumber || data.driverLicense?.number,
        expiryDate: data.driverLicenseExpiry || data.driverLicense?.expiryDate,
      },
      
      // Source
      source: data.source || 'walk_in',
      referredBy: data.referredBy,
      
      // Préférences
      preferences: {
        vehicleTypes: data.vehicleTypes || data.preferences?.vehicleTypes || [],
        budget: {
          min: data.budgetMin || data.preferences?.budget?.min,
          max: data.budgetMax || data.preferences?.budget?.max,
        },
        preferredContact: data.preferredContact || data.preferences?.preferredContact || 'phone',
        newsletter: data.newsletter || data.preferences?.newsletter || false,
      },
      
      // Assignation
      assignedTo: data.assignedTo,
      
      // Statut et notes
      status: data.status || 'prospect',
      notes: data.notes,
      tags: data.tags || [],
    };
    
    return api.post(API_ENDPOINTS.CLIENTS, clientData);
  },

  /**
   * Mettre à jour un client
   * @param {string} id - ID du client
   * @param {Object} data - Données à mettre à jour
   */
  update: (id, data) => {
    const clientData = {
      type: data.type,
      firstName: data.firstName,
      lastName: data.lastName,
      companyName: data.companyName,
      siret: data.siret,
      email: data.email,
      phone: data.phone,
      secondaryPhone: data.secondaryPhone,
      address: {
        street: data.street || data.address?.street,
        city: data.city || data.address?.city,
        zipCode: data.zipCode || data.address?.zipCode,
        country: data.country || data.address?.country || 'France',
      },
      dateOfBirth: data.dateOfBirth,
      nationalId: data.nationalId,
      driverLicense: {
        number: data.driverLicenseNumber || data.driverLicense?.number,
        expiryDate: data.driverLicenseExpiry || data.driverLicense?.expiryDate,
      },
      source: data.source,
      referredBy: data.referredBy,
      preferences: {
        vehicleTypes: data.vehicleTypes || data.preferences?.vehicleTypes,
        budget: {
          min: data.budgetMin || data.preferences?.budget?.min,
          max: data.budgetMax || data.preferences?.budget?.max,
        },
        preferredContact: data.preferredContact || data.preferences?.preferredContact,
        newsletter: data.newsletter ?? data.preferences?.newsletter,
      },
      assignedTo: data.assignedTo,
      status: data.status,
      notes: data.notes,
      tags: data.tags,
    };
    
    return api.put(`${API_ENDPOINTS.CLIENTS}/${id}`, clientData);
  },

  /**
   * Supprimer un client
   * @param {string} id - ID du client
   */
  delete: (id) => {
    return api.delete(`${API_ENDPOINTS.CLIENTS}/${id}`);
  },

  /**
   * Changer le statut d'un client
   * @param {string} id - ID du client
   * @param {string} status - Nouveau statut (prospect, active, inactive, vip, blacklisted)
   */
  changeStatus: (id, status) => {
    return api.patch(`${API_ENDPOINTS.CLIENTS}/${id}/status`, { status });
  },

  /**
   * Ajouter une interaction
   * @param {string} id - ID du client
   * @param {Object} interaction - { type, description, employee }
   */
  addInteraction: (id, interaction) => {
    return api.post(`${API_ENDPOINTS.CLIENTS}/${id}/interactions`, {
      type: interaction.type,
      description: interaction.description,
      employee: interaction.employee,
      date: interaction.date || new Date(),
    });
  },

  /**
   * Récupérer les interactions d'un client
   * @param {string} id - ID du client
   */
  getInteractions: (id) => {
    return api.get(`${API_ENDPOINTS.CLIENTS}/${id}/interactions`);
  },

  /**
   * Récupérer l'historique des achats d'un client
   * @param {string} id - ID du client
   */
  getPurchaseHistory: (id) => {
    return api.get(`${API_ENDPOINTS.CLIENTS}/${id}/purchases`);
  },

  /**
   * Assigner un client à un employé
   * @param {string} id - ID du client
   * @param {string} employeeId - ID de l'employé
   */
  assignTo: (id, employeeId) => {
    return api.patch(`${API_ENDPOINTS.CLIENTS}/${id}/assign`, { 
      assignedTo: employeeId 
    });
  },

  /**
   * Ajouter des tags à un client
   * @param {string} id - ID du client
   * @param {Array} tags - Liste des tags
   */
  addTags: (id, tags) => {
    return api.patch(`${API_ENDPOINTS.CLIENTS}/${id}/tags`, { tags });
  },

  /**
   * Récupérer les statistiques des clients
   */
  getStats: () => {
    return api.get(`${API_ENDPOINTS.CLIENTS}/stats`);
  },

  /**
   * Récupérer les clients par statut
   * @param {string} status - Statut à filtrer
   */
  getByStatus: (status) => {
    return api.get(`${API_ENDPOINTS.CLIENTS}?status=${status}`);
  },

  /**
   * Rechercher des clients
   * @param {string} query - Terme de recherche
   */
  search: (query) => {
    return api.get(`${API_ENDPOINTS.CLIENTS}/search?q=${encodeURIComponent(query)}`);
  },

  /**
   * Exporter les clients
   * @param {Object} params - Filtres d'export
   */
  export: (params = {}) => {
    const query = buildQueryString(params);
    return api.get(`${API_ENDPOINTS.CLIENTS}/export${query}`, {
      responseType: 'blob',
    });
  },

  /**
   * Importer des clients depuis un fichier
   * @param {FormData} formData - Fichier CSV/Excel
   */
  import: (formData) => {
    return api.post(`${API_ENDPOINTS.CLIENTS}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default clientService;