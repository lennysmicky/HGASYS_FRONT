/* ================================================
   HGASYS - Service Employés
   Basé sur le modèle Employee du backend
   ================================================ */

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { buildQueryString } from '../utils/helpers';

const employeeService = {
  /**
   * Récupérer tous les employés avec pagination et filtres
   * @param {Object} params - { page, limit, search, department, status, sortBy, sortOrder }
   */
  getAll: (params = {}) => {
    const query = buildQueryString({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search,
      department: params.department,
      status: params.status,
      sortBy: params.sortBy || 'createdAt',
      sortOrder: params.sortOrder || 'desc',
    });
    return api.get(`${API_ENDPOINTS.EMPLOYEES}${query}`);
  },

  /**
   * Récupérer un employé par ID
   * @param {string} id - ID de l'employé
   */
  getById: (id) => {
    return api.get(`${API_ENDPOINTS.EMPLOYEES}/${id}`);
  },

  /**
   * Créer un nouvel employé
   * @param {Object} data - Données de l'employé
   */
  create: (data) => {
    const employeeData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: {
        street: data.street || data.address?.street,
        city: data.city || data.address?.city,
        zipCode: data.zipCode || data.address?.zipCode,
        country: data.country || data.address?.country || 'France',
      },
      nationalId: data.nationalId,
      position: data.position,
      department: data.department,
      hireDate: data.hireDate || new Date(),
      contractType: data.contractType || 'cdi',
      contractEndDate: data.contractEndDate,
      salary: {
        base: parseFloat(data.salaryBase || data.salary?.base || 0),
        currency: data.salaryCurrency || data.salary?.currency || 'EUR',
      },
      emergencyContact: {
        name: data.emergencyContactName || data.emergencyContact?.name,
        relationship: data.emergencyContactRelationship || data.emergencyContact?.relationship,
        phone: data.emergencyContactPhone || data.emergencyContact?.phone,
      },
      notes: data.notes,
      status: data.status || 'active',
    };
    return api.post(API_ENDPOINTS.EMPLOYEES, employeeData);
  },

  /**
   * Mettre à jour un employé
   * @param {string} id - ID de l'employé
   * @param {Object} data - Données à mettre à jour
   */
  update: (id, data) => {
    const employeeData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      address: {
        street: data.street || data.address?.street,
        city: data.city || data.address?.city,
        zipCode: data.zipCode || data.address?.zipCode,
        country: data.country || data.address?.country || 'France',
      },
      nationalId: data.nationalId,
      position: data.position,
      department: data.department,
      hireDate: data.hireDate,
      contractType: data.contractType,
      contractEndDate: data.contractEndDate,
      salary: {
        base: parseFloat(data.salaryBase || data.salary?.base || 0),
        currency: data.salaryCurrency || data.salary?.currency || 'EUR',
      },
      emergencyContact: {
        name: data.emergencyContactName || data.emergencyContact?.name,
        relationship: data.emergencyContactRelationship || data.emergencyContact?.relationship,
        phone: data.emergencyContactPhone || data.emergencyContact?.phone,
      },
      notes: data.notes,
      status: data.status,
    };
    return api.put(`${API_ENDPOINTS.EMPLOYEES}/${id}`, employeeData);
  },

  /**
   * Supprimer un employé
   * @param {string} id - ID de l'employé
   */
  delete: (id) => {
    return api.delete(`${API_ENDPOINTS.EMPLOYEES}/${id}`);
  },

  /**
   * Changer le statut d'un employé
   * @param {string} id - ID de l'employé
   * @param {string} status - Nouveau statut
   */
  changeStatus: (id, status) => {
    return api.patch(`${API_ENDPOINTS.EMPLOYEES}/${id}/status`, { status });
  },

  /**
   * Récupérer les statistiques des employés
   */
  getStats: () => {
    return api.get(`${API_ENDPOINTS.EMPLOYEES}/stats`);
  },

  /**
   * Récupérer les employés par département
   * @param {string} department - Code du département
   */
  getByDepartment: (department) => {
    return api.get(`${API_ENDPOINTS.EMPLOYEES}?department=${department}`);
  },

  /**
   * Récupérer les managers (pour les selects)
   */
  getManagers: () => {
    return api.get(`${API_ENDPOINTS.EMPLOYEES}?role=manager&status=active`);
  },

  /**
   * Exporter les employés en CSV/Excel
   * @param {Object} params - Filtres d'export
   */
  export: (params = {}) => {
    const query = buildQueryString(params);
    return api.get(`${API_ENDPOINTS.EMPLOYEES}/export${query}`, {
      responseType: 'blob',
    });
  },

  /**
   * Upload un document pour un employé
   * @param {string} id - ID de l'employé
   * @param {FormData} formData - Données du fichier
   */
  uploadDocument: (id, formData) => {
    return api.post(`${API_ENDPOINTS.EMPLOYEES}/${id}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Supprimer un document d'un employé
   * @param {string} employeeId - ID de l'employé
   * @param {string} documentId - ID du document
   */
  deleteDocument: (employeeId, documentId) => {
    return api.delete(`${API_ENDPOINTS.EMPLOYEES}/${employeeId}/documents/${documentId}`);
  },
};

export default employeeService;