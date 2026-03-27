/* ================================================
   HGASYS - Service Ventes
   Basé sur le modèle Sale du backend
   ================================================ */

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { buildQueryString } from '../utils/helpers';

const saleService = {
  /**
   * Récupérer toutes les ventes avec pagination et filtres
   * @param {Object} params - Filtres multiples
   */
  getAll: (params = {}) => {
    const query = buildQueryString({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search,
      status: params.status,
      client: params.client,
      salesperson: params.salesperson,
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
      minAmount: params.minAmount,
      maxAmount: params.maxAmount,
      hasFinancing: params.hasFinancing,
      financingStatus: params.financingStatus,
      sortBy: params.sortBy || 'saleDate',
      sortOrder: params.sortOrder || 'desc',
    });
    return api.get(`${API_ENDPOINTS.SALES}${query}`);
  },

  /**
   * Récupérer une vente par ID
   * @param {string} id - ID de la vente
   */
  getById: (id) => {
    return api.get(`${API_ENDPOINTS.SALES}/${id}`);
  },

  /**
   * Créer une nouvelle vente
   * @param {Object} data - Données de la vente
   */
  create: (data) => {
    const saleData = {
      // Relations
      client: data.client,
      vehicle: data.vehicle,
      salesperson: data.salesperson,
      
      // Prix de base
      vehiclePrice: parseFloat(data.vehiclePrice),
      
      // Remise
      discount: data.discount ? parseFloat(data.discount) : 0,
      discountType: data.discountType || 'fixed',
      discountReason: data.discountReason,
      
      // Taxes
      taxes: {
        tva: data.tvaRate || data.taxes?.tva || 20,
      },
      
      // Frais
      fees: {
        registration: data.registrationFee ? parseFloat(data.registrationFee) : 0,
        documentation: data.documentationFee ? parseFloat(data.documentationFee) : 0,
        delivery: data.deliveryFee ? parseFloat(data.deliveryFee) : 0,
        preparation: data.preparationFee ? parseFloat(data.preparationFee) : 0,
        other: data.otherFees ? parseFloat(data.otherFees) : 0,
      },
      
      // Montant total
      totalAmount: parseFloat(data.totalAmount),
      currency: data.currency || 'EUR',
      
      // Reprise
      tradeIn: {
        hasTradeIn: data.hasTradeIn || false,
        vehicle: data.hasTradeIn ? {
          brand: data.tradeInBrand,
          model: data.tradeInModel,
          year: data.tradeInYear ? parseInt(data.tradeInYear) : undefined,
          mileage: data.tradeInMileage ? parseInt(data.tradeInMileage) : undefined,
          vin: data.tradeInVin,
          registration: data.tradeInRegistration,
          condition: data.tradeInCondition,
        } : undefined,
        estimatedValue: data.tradeInEstimatedValue ? parseFloat(data.tradeInEstimatedValue) : 0,
        agreedValue: data.tradeInAgreedValue ? parseFloat(data.tradeInAgreedValue) : 0,
        notes: data.tradeInNotes,
      },
      
      // Financement
      financing: {
        hasFinancing: data.hasFinancing || false,
        type: data.financingType,
        provider: data.financingProvider,
        applicationNumber: data.financingApplicationNumber,
        status: data.financingStatus || 'not_applicable',
        amount: data.financingAmount ? parseFloat(data.financingAmount) : 0,
        duration: data.financingDuration ? parseInt(data.financingDuration) : 0,
        monthlyPayment: data.monthlyPayment ? parseFloat(data.monthlyPayment) : 0,
        interestRate: data.interestRate ? parseFloat(data.interestRate) : 0,
        downPayment: data.downPayment ? parseFloat(data.downPayment) : 0,
        firstPaymentDate: data.firstPaymentDate,
      },
      
      // Dates
      saleDate: data.saleDate || new Date(),
      expectedDeliveryDate: data.expectedDeliveryDate,
      
      // Livraison
      delivery: {
        type: data.deliveryType || 'pickup',
        address: data.deliveryType === 'delivery' ? {
          street: data.deliveryStreet,
          city: data.deliveryCity,
          zipCode: data.deliveryZipCode,
          country: data.deliveryCountry || 'France',
        } : undefined,
        scheduledDate: data.deliveryScheduledDate,
        cost: data.deliveryCost ? parseFloat(data.deliveryCost) : 0,
        notes: data.deliveryNotes,
      },
      
      // Garantie
      warranty: {
        hasWarranty: data.hasWarranty !== false,
        type: data.warrantyType || 'manufacturer',
        provider: data.warrantyProvider,
        duration: data.warrantyDuration ? parseInt(data.warrantyDuration) : 24,
        mileageLimit: data.warrantyMileageLimit ? parseInt(data.warrantyMileageLimit) : undefined,
        startDate: data.warrantyStartDate,
        coverage: data.warrantyCoverage || [],
        cost: data.warrantyCost ? parseFloat(data.warrantyCost) : 0,
      },
      
      // Options supplémentaires
      additionalOptions: data.additionalOptions || [],
      
      // Services
      services: data.services || [],
      
      // Statut
      status: data.status || 'pending',
      
      // Notes
      notes: data.notes,
      internalNotes: data.internalNotes,
      tags: data.tags || [],
    };
    
    return api.post(API_ENDPOINTS.SALES, saleData);
  },

  /**
   * Mettre à jour une vente
   * @param {string} id - ID de la vente
   * @param {Object} data - Données à mettre à jour
   */
  update: (id, data) => {
    return api.put(`${API_ENDPOINTS.SALES}/${id}`, data);
  },

  /**
   * Supprimer une vente
   * @param {string} id - ID de la vente
   */
  delete: (id) => {
    return api.delete(`${API_ENDPOINTS.SALES}/${id}`);
  },

  /**
   * Changer le statut d'une vente
   * @param {string} id - ID de la vente
   * @param {string} status - Nouveau statut
   * @param {string} reason - Raison du changement (optionnel)
   */
  changeStatus: (id, status, reason = '') => {
    return api.patch(`${API_ENDPOINTS.SALES}/${id}/status`, { status, reason });
  },

  /**
   * Confirmer une vente
   * @param {string} id - ID de la vente
   */
  confirm: (id) => {
    return api.patch(`${API_ENDPOINTS.SALES}/${id}/confirm`);
  },

  /**
   * Compléter une vente
   * @param {string} id - ID de la vente
   */
  complete: (id) => {
    return api.patch(`${API_ENDPOINTS.SALES}/${id}/complete`);
  },

  /**
   * Annuler une vente
   * @param {string} id - ID de la vente
   * @param {string} reason - Raison de l'annulation
   */
  cancel: (id, reason) => {
    return api.patch(`${API_ENDPOINTS.SALES}/${id}/cancel`, { reason });
  },

  /**
   * Ajouter un paiement
   * @param {string} id - ID de la vente
   * @param {Object} payment - Données du paiement
   */
  addPayment: (id, payment) => {
    return api.post(`${API_ENDPOINTS.SALES}/${id}/payments`, {
      amount: parseFloat(payment.amount),
      method: payment.method,
      reference: payment.reference,
      date: payment.date || new Date(),
      notes: payment.notes,
    });
  },

  /**
   * Récupérer les paiements d'une vente
   * @param {string} id - ID de la vente
   */
  getPayments: (id) => {
    return api.get(`${API_ENDPOINTS.SALES}/${id}/payments`);
  },

  /**
   * Rembourser un paiement
   * @param {string} saleId - ID de la vente
   * @param {string} paymentId - ID du paiement
   * @param {number} amount - Montant à rembourser
   */
  refundPayment: (saleId, paymentId, amount) => {
    return api.post(`${API_ENDPOINTS.SALES}/${saleId}/payments/${paymentId}/refund`, {
      amount: parseFloat(amount),
    });
  },

  /**
   * Générer une facture
   * @param {string} id - ID de la vente
   */
  generateInvoice: (id) => {
    return api.post(`${API_ENDPOINTS.SALES}/${id}/invoice`);
  },

  /**
   * Télécharger une facture
   * @param {string} id - ID de la vente
   */
  downloadInvoice: (id) => {
    return api.get(`${API_ENDPOINTS.SALES}/${id}/invoice/download`, {
      responseType: 'blob',
    });
  },

  /**
   * Générer un contrat
   * @param {string} id - ID de la vente
   */
  generateContract: (id) => {
    return api.post(`${API_ENDPOINTS.SALES}/${id}/contract`);
  },

  /**
   * Télécharger un contrat
   * @param {string} id - ID de la vente
   */
  downloadContract: (id) => {
    return api.get(`${API_ENDPOINTS.SALES}/${id}/contract/download`, {
      responseType: 'blob',
    });
  },

  /**
   * Uploader un document signé
   * @param {string} id - ID de la vente
   * @param {string} documentType - Type de document
   * @param {FormData} formData - Fichier
   */
  uploadSignedDocument: (id, documentType, formData) => {
    return api.post(`${API_ENDPOINTS.SALES}/${id}/documents/${documentType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Mettre à jour le financement
   * @param {string} id - ID de la vente
   * @param {Object} financing - Données de financement
   */
  updateFinancing: (id, financing) => {
    return api.patch(`${API_ENDPOINTS.SALES}/${id}/financing`, financing);
  },

  /**
   * Mettre à jour la livraison
   * @param {string} id - ID de la vente
   * @param {Object} delivery - Données de livraison
   */
  updateDelivery: (id, delivery) => {
    return api.patch(`${API_ENDPOINTS.SALES}/${id}/delivery`, delivery);
  },

  /**
   * Confirmer la livraison
   * @param {string} id - ID de la vente
   * @param {Object} data - Données de confirmation
   */
  confirmDelivery: (id, data = {}) => {
    return api.patch(`${API_ENDPOINTS.SALES}/${id}/delivery/confirm`, {
      completedDate: data.completedDate || new Date(),
      signature: data.signature,
    });
  },

  /**
   * Calculer le total d'une vente
   * @param {Object} data - Données pour le calcul
   */
  calculateTotal: (data) => {
    return api.post(`${API_ENDPOINTS.SALES}/calculate`, data);
  },

  /**
   * Récupérer les statistiques des ventes
   */
  getStats: () => {
    return api.get(`${API_ENDPOINTS.SALES}/stats`);
  },

  /**
   * Récupérer les statistiques par période
   * @param {string} period - Période (day, week, month, year)
   * @param {Date} startDate - Date de début
   * @param {Date} endDate - Date de fin
   */
  getStatsByPeriod: (period, startDate, endDate) => {
    const query = buildQueryString({ period, startDate, endDate });
    return api.get(`${API_ENDPOINTS.SALES}/stats/period${query}`);
  },

  /**
   * Récupérer les ventes par vendeur
   * @param {string} salespersonId - ID du vendeur
   * @param {Object} params - Filtres
   */
  getBySalesperson: (salespersonId, params = {}) => {
    const query = buildQueryString({ ...params, salesperson: salespersonId });
    return api.get(`${API_ENDPOINTS.SALES}${query}`);
  },

  /**
   * Récupérer les ventes par client
   * @param {string} clientId - ID du client
   */
  getByClient: (clientId) => {
    return api.get(`${API_ENDPOINTS.SALES}?client=${clientId}`);
  },

  /**
   * Rechercher des ventes
   * @param {string} query - Terme de recherche
   */
  search: (query) => {
    return api.get(`${API_ENDPOINTS.SALES}/search?q=${encodeURIComponent(query)}`);
  },

  /**
   * Exporter les ventes
   * @param {Object} params - Filtres d'export
   */
  export: (params = {}) => {
    const query = buildQueryString(params);
    return api.get(`${API_ENDPOINTS.SALES}/export${query}`, {
      responseType: 'blob',
    });
  },

  /**
   * Envoyer un questionnaire de satisfaction
   * @param {string} id - ID de la vente
   */
  sendSatisfactionSurvey: (id) => {
    return api.post(`${API_ENDPOINTS.SALES}/${id}/satisfaction-survey`);
  },

  /**
   * Enregistrer la satisfaction client
   * @param {string} id - ID de la vente
   * @param {Object} satisfaction - { rating, feedback }
   */
  recordSatisfaction: (id, satisfaction) => {
    return api.patch(`${API_ENDPOINTS.SALES}/${id}/satisfaction`, satisfaction);
  },
};

export default saleService;