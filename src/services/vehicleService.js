/* ================================================
   HGASYS - Service Véhicules
   Basé sur le modèle Vehicle du backend
   ================================================ */

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { buildQueryString } from '../utils/helpers';

const vehicleService = {
  /**
   * Récupérer tous les véhicules avec pagination et filtres
   * @param {Object} params - Filtres multiples
   */
  getAll: (params = {}) => {
    const query = buildQueryString({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search,
      brand: params.brand,
      model: params.model,
      category: params.category,
      fuelType: params.fuelType,
      transmission: params.transmission,
      condition: params.condition,
      status: params.status,
      yearMin: params.yearMin,
      yearMax: params.yearMax,
      priceMin: params.priceMin,
      priceMax: params.priceMax,
      mileageMax: params.mileageMax,
      sortBy: params.sortBy || 'createdAt',
      sortOrder: params.sortOrder || 'desc',
    });
    return api.get(`${API_ENDPOINTS.VEHICLES}${query}`);
  },

  /**
   * Récupérer un véhicule par ID
   * @param {string} id - ID du véhicule
   */
  getById: (id) => {
    return api.get(`${API_ENDPOINTS.VEHICLES}/${id}`);
  },

  /**
   * Créer un nouveau véhicule
   * @param {Object} data - Données du véhicule
   */
  create: (data) => {
    const vehicleData = {
      // Identification
      vin: data.vin,
      
      // Informations de base
      brand: data.brand,
      model: data.model,
      version: data.version,
      year: parseInt(data.year),
      
      // Caractéristiques techniques
      category: data.category,
      fuelType: data.fuelType,
      transmission: data.transmission,
      engineSize: data.engineSize ? parseFloat(data.engineSize) : undefined,
      horsepower: data.horsepower ? parseInt(data.horsepower) : undefined,
      mileage: data.mileage ? parseInt(data.mileage) : 0,
      
      // Apparence
      exteriorColor: data.exteriorColor,
      interiorColor: data.interiorColor,
      numberOfDoors: data.numberOfDoors ? parseInt(data.numberOfDoors) : 4,
      numberOfSeats: data.numberOfSeats ? parseInt(data.numberOfSeats) : 5,
      
      // Prix
      purchasePrice: parseFloat(data.purchasePrice),
      sellingPrice: parseFloat(data.sellingPrice),
      currency: data.currency || 'EUR',
      
      // Condition et statut
      condition: data.condition || 'new',
      status: data.status || 'available',
      
      // Emplacement
      location: {
        lot: data.locationLot || data.location?.lot,
        row: data.locationRow || data.location?.row,
        spot: data.locationSpot || data.location?.spot,
      },
      
      // Documents
      registration: {
        number: data.registrationNumber || data.registration?.number,
        date: data.registrationDate || data.registration?.date,
        expiryDate: data.registrationExpiry || data.registration?.expiryDate,
      },
      technicalInspection: {
        lastDate: data.inspectionLastDate || data.technicalInspection?.lastDate,
        nextDate: data.inspectionNextDate || data.technicalInspection?.nextDate,
        status: data.inspectionStatus || data.technicalInspection?.status || 'valid',
      },
      
      // Options
      features: data.features || [],
      
      // Dates
      purchaseDate: data.purchaseDate || new Date(),
      
      // Notes et tags
      notes: data.notes,
      tags: data.tags || [],
    };
    
    return api.post(API_ENDPOINTS.VEHICLES, vehicleData);
  },

  /**
   * Mettre à jour un véhicule
   * @param {string} id - ID du véhicule
   * @param {Object} data - Données à mettre à jour
   */
  update: (id, data) => {
    const vehicleData = {
      vin: data.vin,
      brand: data.brand,
      model: data.model,
      version: data.version,
      year: data.year ? parseInt(data.year) : undefined,
      category: data.category,
      fuelType: data.fuelType,
      transmission: data.transmission,
      engineSize: data.engineSize ? parseFloat(data.engineSize) : undefined,
      horsepower: data.horsepower ? parseInt(data.horsepower) : undefined,
      mileage: data.mileage ? parseInt(data.mileage) : undefined,
      exteriorColor: data.exteriorColor,
      interiorColor: data.interiorColor,
      numberOfDoors: data.numberOfDoors ? parseInt(data.numberOfDoors) : undefined,
      numberOfSeats: data.numberOfSeats ? parseInt(data.numberOfSeats) : undefined,
      purchasePrice: data.purchasePrice ? parseFloat(data.purchasePrice) : undefined,
      sellingPrice: data.sellingPrice ? parseFloat(data.sellingPrice) : undefined,
      currency: data.currency,
      condition: data.condition,
      status: data.status,
      location: {
        lot: data.locationLot || data.location?.lot,
        row: data.locationRow || data.location?.row,
        spot: data.locationSpot || data.location?.spot,
      },
      registration: {
        number: data.registrationNumber || data.registration?.number,
        date: data.registrationDate || data.registration?.date,
        expiryDate: data.registrationExpiry || data.registration?.expiryDate,
      },
      technicalInspection: {
        lastDate: data.inspectionLastDate || data.technicalInspection?.lastDate,
        nextDate: data.inspectionNextDate || data.technicalInspection?.nextDate,
        status: data.inspectionStatus || data.technicalInspection?.status,
      },
      features: data.features,
      notes: data.notes,
      tags: data.tags,
    };
    
    return api.put(`${API_ENDPOINTS.VEHICLES}/${id}`, vehicleData);
  },

  /**
   * Supprimer un véhicule
   * @param {string} id - ID du véhicule
   */
  delete: (id) => {
    return api.delete(`${API_ENDPOINTS.VEHICLES}/${id}`);
  },

  /**
   * Changer le statut d'un véhicule
   * @param {string} id - ID du véhicule
   * @param {string} status - Nouveau statut (available, sold, reserved, maintenance)
   */
  changeStatus: (id, status) => {
    return api.patch(`${API_ENDPOINTS.VEHICLES}/${id}/status`, { status });
  },

  /**
   * Marquer un véhicule comme vendu
   * @param {string} id - ID du véhicule
   * @param {Date} soldDate - Date de vente
   */
  markAsSold: (id, soldDate = new Date()) => {
    return api.patch(`${API_ENDPOINTS.VEHICLES}/${id}/sold`, { 
      status: 'sold',
      soldDate 
    });
  },

  /**
   * Réserver un véhicule
   * @param {string} id - ID du véhicule
   * @param {string} clientId - ID du client (optionnel)
   */
  reserve: (id, clientId = null) => {
    return api.patch(`${API_ENDPOINTS.VEHICLES}/${id}/reserve`, { 
      status: 'reserved',
      reservedFor: clientId
    });
  },

  /**
   * Annuler la réservation d'un véhicule
   * @param {string} id - ID du véhicule
   */
  cancelReservation: (id) => {
    return api.patch(`${API_ENDPOINTS.VEHICLES}/${id}/cancel-reservation`, { 
      status: 'available'
    });
  },

  /**
   * Ajouter une entrée d'entretien
   * @param {string} id - ID du véhicule
   * @param {Object} maintenance - Données d'entretien
   */
  addMaintenance: (id, maintenance) => {
    return api.post(`${API_ENDPOINTS.VEHICLES}/${id}/maintenance`, {
      date: maintenance.date || new Date(),
      type: maintenance.type,
      description: maintenance.description,
      cost: parseFloat(maintenance.cost) || 0,
      mileage: parseInt(maintenance.mileage) || 0,
      provider: maintenance.provider,
    });
  },

  /**
   * Récupérer l'historique d'entretien
   * @param {string} id - ID du véhicule
   */
  getMaintenanceHistory: (id) => {
    return api.get(`${API_ENDPOINTS.VEHICLES}/${id}/maintenance`);
  },

  /**
   * Ajouter des images
   * @param {string} id - ID du véhicule
   * @param {FormData} formData - Images
   */
  uploadImages: (id, formData) => {
    return api.post(`${API_ENDPOINTS.VEHICLES}/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Supprimer une image
   * @param {string} vehicleId - ID du véhicule
   * @param {string} imageId - ID de l'image
   */
  deleteImage: (vehicleId, imageId) => {
    return api.delete(`${API_ENDPOINTS.VEHICLES}/${vehicleId}/images/${imageId}`);
  },

  /**
   * Définir l'image principale
   * @param {string} vehicleId - ID du véhicule
   * @param {string} imageId - ID de l'image
   */
  setPrimaryImage: (vehicleId, imageId) => {
    return api.patch(`${API_ENDPOINTS.VEHICLES}/${vehicleId}/images/${imageId}/primary`);
  },

  /**
   * Incrémenter les vues
   * @param {string} id - ID du véhicule
   */
  incrementViews: (id) => {
    return api.patch(`${API_ENDPOINTS.VEHICLES}/${id}/views`);
  },

  /**
   * Récupérer les statistiques des véhicules
   */
  getStats: () => {
    return api.get(`${API_ENDPOINTS.VEHICLES}/stats`);
  },

  /**
   * Récupérer le stock disponible
   */
  getAvailableStock: () => {
    return api.get(`${API_ENDPOINTS.VEHICLES}?status=available`);
  },

  /**
   * Récupérer les marques disponibles
   */
  getBrands: () => {
    return api.get(`${API_ENDPOINTS.VEHICLES}/brands`);
  },

  /**
   * Récupérer les modèles par marque
   * @param {string} brand - Marque
   */
  getModelsByBrand: (brand) => {
    return api.get(`${API_ENDPOINTS.VEHICLES}/models?brand=${encodeURIComponent(brand)}`);
  },

  /**
   * Rechercher des véhicules
   * @param {string} query - Terme de recherche
   */
  search: (query) => {
    return api.get(`${API_ENDPOINTS.VEHICLES}/search?q=${encodeURIComponent(query)}`);
  },

  /**
   * Exporter les véhicules
   * @param {Object} params - Filtres d'export
   */
  export: (params = {}) => {
    const query = buildQueryString(params);
    return api.get(`${API_ENDPOINTS.VEHICLES}/export${query}`, {
      responseType: 'blob',
    });
  },
};

export default vehicleService;