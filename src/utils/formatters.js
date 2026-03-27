/* ================================================
   HGASYS - Formateurs
   ================================================ */

import { 
  LOCALE, 
  CURRENCY, 
  STATUS, 
  VEHICLE_STATUS, 
  SALE_STATUS, 
  LEAVE_STATUS,
  LEAVE_TYPES,
  ROLES 
} from './constants';

// ===== LABELS DES STATUTS =====

export const statusLabels = {
  [STATUS.ACTIVE]: 'Actif',
  [STATUS.INACTIVE]: 'Inactif',
  [STATUS.PENDING]: 'En attente',
  [STATUS.APPROVED]: 'Approuvé',
  [STATUS.REJECTED]: 'Rejeté',
  [STATUS.COMPLETED]: 'Complété',
  [STATUS.CANCELLED]: 'Annulé',
};

export const vehicleStatusLabels = {
  [VEHICLE_STATUS.AVAILABLE]: 'Disponible',
  [VEHICLE_STATUS.SOLD]: 'Vendu',
  [VEHICLE_STATUS.RESERVED]: 'Réservé',
  [VEHICLE_STATUS.MAINTENANCE]: 'En maintenance',
};

export const saleStatusLabels = {
  [SALE_STATUS.PENDING]: 'En attente',
  [SALE_STATUS.CONFIRMED]: 'Confirmée',
  [SALE_STATUS.COMPLETED]: 'Complétée',
  [SALE_STATUS.CANCELLED]: 'Annulée',
};

export const leaveStatusLabels = {
  [LEAVE_STATUS.PENDING]: 'En attente',
  [LEAVE_STATUS.APPROVED]: 'Approuvé',
  [LEAVE_STATUS.REJECTED]: 'Rejeté',
};

export const leaveTypeLabels = {
  [LEAVE_TYPES.ANNUAL]: 'Congé annuel',
  [LEAVE_TYPES.SICK]: 'Maladie',
  [LEAVE_TYPES.PERSONAL]: 'Personnel',
  [LEAVE_TYPES.MATERNITY]: 'Maternité',
  [LEAVE_TYPES.PATERNITY]: 'Paternité',
  [LEAVE_TYPES.UNPAID]: 'Sans solde',
};

export const roleLabels = {
  [ROLES.ADMIN]: 'Administrateur',
  [ROLES.MANAGER]: 'Manager',
  [ROLES.EMPLOYEE]: 'Employé',
};

// ===== COULEURS DES BADGES =====

export const statusColors = {
  [STATUS.ACTIVE]: 'success',
  [STATUS.INACTIVE]: 'secondary',
  [STATUS.PENDING]: 'warning',
  [STATUS.APPROVED]: 'success',
  [STATUS.REJECTED]: 'danger',
  [STATUS.COMPLETED]: 'success',
  [STATUS.CANCELLED]: 'danger',
};

export const vehicleStatusColors = {
  [VEHICLE_STATUS.AVAILABLE]: 'success',
  [VEHICLE_STATUS.SOLD]: 'secondary',
  [VEHICLE_STATUS.RESERVED]: 'warning',
  [VEHICLE_STATUS.MAINTENANCE]: 'danger',
};

export const saleStatusColors = {
  [SALE_STATUS.PENDING]: 'warning',
  [SALE_STATUS.CONFIRMED]: 'primary',
  [SALE_STATUS.COMPLETED]: 'success',
  [SALE_STATUS.CANCELLED]: 'danger',
};

export const leaveStatusColors = {
  [LEAVE_STATUS.PENDING]: 'warning',
  [LEAVE_STATUS.APPROVED]: 'success',
  [LEAVE_STATUS.REJECTED]: 'danger',
};

export const roleColors = {
  [ROLES.ADMIN]: 'danger',
  [ROLES.MANAGER]: 'warning',
  [ROLES.EMPLOYEE]: 'primary',
};

// ===== FONCTIONS DE FORMATAGE =====

/**
 * Formate un statut générique
 */
export const formatStatus = (status) => {
  return statusLabels[status] || status || '-';
};

/**
 * Formate un statut de véhicule
 */
export const formatVehicleStatus = (status) => {
  return vehicleStatusLabels[status] || status || '-';
};

/**
 * Formate un statut de vente
 */
export const formatSaleStatus = (status) => {
  return saleStatusLabels[status] || status || '-';
};

/**
 * Formate un statut de congé
 */
export const formatLeaveStatus = (status) => {
  return leaveStatusLabels[status] || status || '-';
};

/**
 * Formate un type de congé
 */
export const formatLeaveType = (type) => {
  return leaveTypeLabels[type] || type || '-';
};

/**
 * Formate un rôle
 */
export const formatRole = (role) => {
  return roleLabels[role] || role || '-';
};

/**
 * Retourne la couleur d'un statut
 */
export const getStatusColor = (status) => {
  return statusColors[status] || 'secondary';
};

/**
 * Retourne la couleur d'un statut de véhicule
 */
export const getVehicleStatusColor = (status) => {
  return vehicleStatusColors[status] || 'secondary';
};

/**
 * Retourne la couleur d'un statut de vente
 */
export const getSaleStatusColor = (status) => {
  return saleStatusColors[status] || 'secondary';
};

/**
 * Retourne la couleur d'un statut de congé
 */
export const getLeaveStatusColor = (status) => {
  return leaveStatusColors[status] || 'secondary';
};

/**
 * Retourne la couleur d'un rôle
 */
export const getRoleColor = (role) => {
  return roleColors[role] || 'secondary';
};

/**
 * Formate un véhicule (marque + modèle)
 */
export const formatVehicle = (vehicle) => {
  if (!vehicle) return '-';
  return `${vehicle.brand || ''} ${vehicle.model || ''}`.trim() || '-';
};

/**
 * Formate un nom complet
 */
export const formatFullName = (firstName, lastName) => {
  return `${firstName || ''} ${lastName || ''}`.trim() || '-';
};

/**
 * Formate une adresse
 */
export const formatAddress = (address) => {
  if (!address) return '-';
  
  const parts = [
    address.street,
    address.city,
    address.postalCode,
    address.country,
  ].filter(Boolean);
  
  return parts.join(', ') || '-';
};

/**
 * Formate un numéro de téléphone
 */
export const formatPhone = (phone) => {
  if (!phone) return '-';
  
  // Format français: 06 12 34 56 78
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  }
  
  return phone;
};

/**
 * Formate un kilométrage
 */
export const formatMileage = (km) => {
  if (km === null || km === undefined) return '-';
  return `${new Intl.NumberFormat(LOCALE).format(km)} km`;
};

/**
 * Formate une année
 */
export const formatYear = (year) => {
  if (!year) return '-';
  return year.toString();
};

/**
 * Options pour les selects
 */
export const getStatusOptions = () => {
  return Object.entries(statusLabels).map(([value, label]) => ({
    value,
    label,
  }));
};

export const getVehicleStatusOptions = () => {
  return Object.entries(vehicleStatusLabels).map(([value, label]) => ({
    value,
    label,
  }));
};

export const getSaleStatusOptions = () => {
  return Object.entries(saleStatusLabels).map(([value, label]) => ({
    value,
    label,
  }));
};

export const getLeaveStatusOptions = () => {
  return Object.entries(leaveStatusLabels).map(([value, label]) => ({
    value,
    label,
  }));
};

export const getLeaveTypeOptions = () => {
  return Object.entries(leaveTypeLabels).map(([value, label]) => ({
    value,
    label,
  }));
};

export const getRoleOptions = () => {
  return Object.entries(roleLabels).map(([value, label]) => ({
    value,
    label,
  }));
};

export default {
  statusLabels,
  vehicleStatusLabels,
  saleStatusLabels,
  leaveStatusLabels,
  leaveTypeLabels,
  roleLabels,
  statusColors,
  vehicleStatusColors,
  saleStatusColors,
  leaveStatusColors,
  roleColors,
  formatStatus,
  formatVehicleStatus,
  formatSaleStatus,
  formatLeaveStatus,
  formatLeaveType,
  formatRole,
  getStatusColor,
  getVehicleStatusColor,
  getSaleStatusColor,
  getLeaveStatusColor,
  getRoleColor,
  formatVehicle,
  formatFullName,
  formatAddress,
  formatPhone,
  formatMileage,
  formatYear,
  getStatusOptions,
  getVehicleStatusOptions,
  getSaleStatusOptions,
  getLeaveStatusOptions,
  getLeaveTypeOptions,
  getRoleOptions,
};