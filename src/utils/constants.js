/* ================================================
   HGASYS - Constantes Globales
   ================================================ */

// ===== API CONFIGURATION =====
export const API_URL = import.meta.env.VITE_API_URL || 'https://hgasys-back.onrender.com/api';

// ===== AUTHENTICATION =====
export const TOKEN_KEY = 'hgasys_token';
export const USER_KEY = 'hgasys_user';
export const REFRESH_TOKEN_KEY = 'hgasys_refresh_token';

// ===== ROLES =====
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

// ===== PERMISSIONS PAR RÔLE =====
export const PERMISSIONS = {
  [ROLES.ADMIN]: [
    'users:read', 'users:create', 'users:update', 'users:delete',
    'employees:read', 'employees:create', 'employees:update', 'employees:delete',
    'clients:read', 'clients:create', 'clients:update', 'clients:delete',
    'vehicles:read', 'vehicles:create', 'vehicles:update', 'vehicles:delete',
    'sales:read', 'sales:create', 'sales:update', 'sales:delete',
    'attendance:read', 'attendance:create', 'attendance:update', 'attendance:delete',
    'leaves:read', 'leaves:create', 'leaves:update', 'leaves:delete', 'leaves:approve',
    'salaries:read', 'salaries:create', 'salaries:update', 'salaries:delete',
    'dashboard:read', 'reports:read', 'settings:read', 'settings:update',
  ],
  [ROLES.MANAGER]: [
    'employees:read', 'employees:create', 'employees:update',
    'clients:read', 'clients:create', 'clients:update',
    'vehicles:read', 'vehicles:update',
    'sales:read', 'sales:create', 'sales:update',
    'attendance:read', 'attendance:create',
    'leaves:read', 'leaves:approve',
    'salaries:read',
    'dashboard:read', 'reports:read',
  ],
  [ROLES.EMPLOYEE]: [
    'clients:read',
    'vehicles:read',
    'sales:read', 'sales:create',
    'attendance:read',
    'leaves:read', 'leaves:create',
    'dashboard:read',
  ],
};

// ===== STATUTS =====
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// ===== STATUTS VÉHICULES =====
export const VEHICLE_STATUS = {
  AVAILABLE: 'available',
  SOLD: 'sold',
  RESERVED: 'reserved',
  MAINTENANCE: 'maintenance',
};

// ===== STATUTS VENTES =====
export const SALE_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// ===== STATUTS CONGÉS =====
export const LEAVE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// ===== TYPES DE CONGÉS =====
export const LEAVE_TYPES = {
  ANNUAL: 'annual',
  SICK: 'sick',
  PERSONAL: 'personal',
  MATERNITY: 'maternity',
  PATERNITY: 'paternity',
  UNPAID: 'unpaid',
};

// ===== DÉPARTEMENTS =====
export const DEPARTMENTS = [
  { value: 'sales', label: 'Ventes' },
  { value: 'hr', label: 'Ressources Humaines' },
  { value: 'finance', label: 'Finance' },
  { value: 'logistics', label: 'Logistique' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'it', label: 'Informatique' },
  { value: 'management', label: 'Direction' },
];

// ===== MARQUES VÉHICULES =====
export const VEHICLE_BRANDS = [
  'Audi', 'BMW', 'Chevrolet', 'Citroën', 'Dacia', 'Fiat', 'Ford',
  'Honda', 'Hyundai', 'Jaguar', 'Jeep', 'Kia', 'Land Rover',
  'Lexus', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi', 'Nissan',
  'Opel', 'Peugeot', 'Porsche', 'Renault', 'Seat', 'Skoda',
  'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo',
];

// ===== TYPES DE CARBURANT =====
export const FUEL_TYPES = [
  { value: 'essence', label: 'Essence' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'hybrid', label: 'Hybride' },
  { value: 'electric', label: 'Électrique' },
  { value: 'lpg', label: 'GPL' },
];

// ===== TYPES DE TRANSMISSION =====
export const TRANSMISSION_TYPES = [
  { value: 'manual', label: 'Manuelle' },
  { value: 'automatic', label: 'Automatique' },
  { value: 'semi-automatic', label: 'Semi-automatique' },
];

// ===== MÉTHODES DE PAIEMENT =====
export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Espèces' },
  { value: 'card', label: 'Carte bancaire' },
  { value: 'transfer', label: 'Virement' },
  { value: 'check', label: 'Chèque' },
  { value: 'financing', label: 'Financement' },
];

// ===== PAGINATION =====
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMITS: [5, 10, 25, 50, 100],
};

// ===== FORMATS =====
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const TIME_FORMAT = 'HH:mm';
export const CURRENCY = 'EUR';
export const LOCALE = 'fr-FR';

// ===== MESSAGES =====
export const MESSAGES = {
  // Succès
  SUCCESS: {
    CREATE: 'Élément créé avec succès',
    UPDATE: 'Élément mis à jour avec succès',
    DELETE: 'Élément supprimé avec succès',
    LOGIN: 'Connexion réussie',
    LOGOUT: 'Déconnexion réussie',
  },
  // Erreurs
  ERROR: {
    GENERIC: 'Une erreur est survenue',
    NETWORK: 'Erreur de connexion au serveur',
    UNAUTHORIZED: 'Accès non autorisé',
    FORBIDDEN: 'Action non autorisée',
    NOT_FOUND: 'Élément non trouvé',
    VALIDATION: 'Données invalides',
    LOGIN: 'Email ou mot de passe incorrect',
    SESSION_EXPIRED: 'Session expirée, veuillez vous reconnecter',
  },
  // Confirmations
  CONFIRM: {
    DELETE: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
    LOGOUT: 'Êtes-vous sûr de vouloir vous déconnecter ?',
    CANCEL: 'Êtes-vous sûr de vouloir annuler ?',
  },
};

// ===== VALIDATION =====
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\+33|0)[1-9](\d{2}){4}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// ===== ROUTES =====
export const ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Main
  DASHBOARD: '/',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Users
  USERS: '/users',
  USER_CREATE: '/users/new',
  USER_EDIT: '/users/:id/edit',
  USER_DETAILS: '/users/:id',
  
  // Employees
  EMPLOYEES: '/employees',
  EMPLOYEE_CREATE: '/employees/new',
  EMPLOYEE_EDIT: '/employees/:id/edit',
  EMPLOYEE_DETAILS: '/employees/:id',
  
  // Clients
  CLIENTS: '/clients',
  CLIENT_CREATE: '/clients/new',
  CLIENT_EDIT: '/clients/:id/edit',
  CLIENT_DETAILS: '/clients/:id',
  
  // Vehicles
  VEHICLES: '/vehicles',
  VEHICLE_CREATE: '/vehicles/new',
  VEHICLE_EDIT: '/vehicles/:id/edit',
  VEHICLE_DETAILS: '/vehicles/:id',
  VEHICLE_STOCK: '/vehicles/stock',
  
  // Sales
  SALES: '/sales',
  SALE_CREATE: '/sales/new',
  SALE_EDIT: '/sales/:id/edit',
  SALE_DETAILS: '/sales/:id',
  INVOICE: '/sales/:id/invoice',
  
  // HR
  ATTENDANCE: '/hr/attendance',
  LEAVES: '/hr/leaves',
  LEAVE_CREATE: '/hr/leaves/new',
  SALARIES: '/hr/salaries',
  
  // Reports
  REPORTS: '/reports',
  SALES_REPORT: '/reports/sales',
  FINANCIAL_REPORT: '/reports/financial',
  
  // Errors
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/403',
};

// ===== MENU ITEMS (pour Sidebar) =====
export const MENU_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'Dashboard',
    path: ROUTES.DASHBOARD,
    permission: 'dashboard:read',
  },
  {
    id: 'vehicles',
    label: 'Véhicules',
    icon: 'DirectionsCar',
    path: ROUTES.VEHICLES,
    permission: 'vehicles:read',
    children: [
      { id: 'vehicles-list', label: 'Liste', path: ROUTES.VEHICLES },
      { id: 'vehicles-stock', label: 'Stock', path: ROUTES.VEHICLE_STOCK },
      { id: 'vehicles-add', label: 'Ajouter', path: ROUTES.VEHICLE_CREATE, permission: 'vehicles:create' },
    ],
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: 'People',
    path: ROUTES.CLIENTS,
    permission: 'clients:read',
  },
  {
    id: 'sales',
    label: 'Ventes',
    icon: 'ShoppingCart',
    path: ROUTES.SALES,
    permission: 'sales:read',
  },
  {
    id: 'employees',
    label: 'Employés',
    icon: 'Badge',
    path: ROUTES.EMPLOYEES,
    permission: 'employees:read',
  },
  {
    id: 'hr',
    label: 'RH',
    icon: 'Work',
    permission: 'attendance:read',
    children: [
      { id: 'attendance', label: 'Présences', path: ROUTES.ATTENDANCE },
      { id: 'leaves', label: 'Congés', path: ROUTES.LEAVES },
      { id: 'salaries', label: 'Salaires', path: ROUTES.SALARIES, permission: 'salaries:read' },
    ],
  },
  {
    id: 'users',
    label: 'Utilisateurs',
    icon: 'AdminPanelSettings',
    path: ROUTES.USERS,
    permission: 'users:read',
  },
  {
    id: 'reports',
    label: 'Rapports',
    icon: 'Assessment',
    path: ROUTES.REPORTS,
    permission: 'reports:read',
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: 'Settings',
    path: ROUTES.SETTINGS,
    permission: 'settings:read',
  },
];

// ===== API ENDPOINTS =====
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  ME: '/auth/me',
  
  // Users
  USERS: '/users',
  
  // Employees
  EMPLOYEES: '/employees',
  
  // Clients
  CLIENTS: '/clients',
  
  // Vehicles
  VEHICLES: '/vehicles',
  
  // Sales
  SALES: '/sales',
  
  // Attendance
  ATTENDANCE: '/attendance',
  
  // Leaves
  LEAVES: '/leaves',
  
  // Salaries
  SALARIES: '/salaries',
  
  // Dashboard
  DASHBOARD: '/dashboard',
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_CHARTS: '/dashboard/charts',
};

export default {
  API_URL,
  TOKEN_KEY,
  USER_KEY,
  ROLES,
  PERMISSIONS,
  STATUS,
  VEHICLE_STATUS,
  SALE_STATUS,
  LEAVE_STATUS,
  LEAVE_TYPES,
  DEPARTMENTS,
  VEHICLE_BRANDS,
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  PAYMENT_METHODS,
  PAGINATION,
  DATE_FORMAT,
  DATETIME_FORMAT,
  CURRENCY,
  LOCALE,
  MESSAGES,
  VALIDATION,
  ROUTES,
  MENU_ITEMS,
  API_ENDPOINTS,
}; // ===== TYPES DE CONTRAT =====
export const CONTRACT_TYPES = [
  { value: 'cdi', label: 'CDI' },
  { value: 'cdd', label: 'CDD' },
  { value: 'interim', label: 'Intérim' },
  { value: 'stage', label: 'Stage' },
  { value: 'apprentissage', label: 'Apprentissage' },
];

// ===== GENRES =====
export const GENDERS = [
  { value: 'male', label: 'Homme' },
  { value: 'female', label: 'Femme' },
  { value: 'other', label: 'Autre' },
];

// ===== STATUTS EMPLOYÉS =====
export const EMPLOYEE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ON_LEAVE: 'on_leave',
  TERMINATED: 'terminated',
};

export const EMPLOYEE_STATUS_OPTIONS = [
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
  { value: 'on_leave', label: 'En congé' },
  { value: 'terminated', label: 'Terminé' },
];

// ===== TYPES DE CLIENTS =====
export const CLIENT_TYPES = [
  { value: 'individual', label: 'Particulier' },
  { value: 'company', label: 'Entreprise' },
];

// ===== SOURCES CLIENTS =====
export const CLIENT_SOURCES = [
  { value: 'website', label: 'Site web' },
  { value: 'referral', label: 'Recommandation' },
  { value: 'walk_in', label: 'Visite directe' },
  { value: 'advertising', label: 'Publicité' },
  { value: 'social_media', label: 'Réseaux sociaux' },
  { value: 'other', label: 'Autre' },
];

// ===== STATUTS CLIENTS =====
export const CLIENT_STATUS = {
  PROSPECT: 'prospect',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  VIP: 'vip',
  BLACKLISTED: 'blacklisted',
};

export const CLIENT_STATUS_OPTIONS = [
  { value: 'prospect', label: 'Prospect' },
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
  { value: 'vip', label: 'VIP' },
  { value: 'blacklisted', label: 'Liste noire' },
];

// ===== TYPES D'INTERACTIONS =====
export const INTERACTION_TYPES = [
  { value: 'call', label: 'Appel' },
  { value: 'email', label: 'Email' },
  { value: 'visit', label: 'Visite' },
  { value: 'test_drive', label: 'Essai' },
  { value: 'meeting', label: 'Rendez-vous' },
  { value: 'other', label: 'Autre' },
];

// ===== CATÉGORIES VÉHICULES =====
export const VEHICLE_CATEGORIES = [
  { value: 'sedan', label: 'Berline' },
  { value: 'suv', label: 'SUV' },
  { value: 'hatchback', label: 'Compacte' },
  { value: 'coupe', label: 'Coupé' },
  { value: 'convertible', label: 'Cabriolet' },
  { value: 'wagon', label: 'Break' },
  { value: 'van', label: 'Monospace' },
  { value: 'pickup', label: 'Pick-up' },
  { value: 'sports', label: 'Sport' },
];

// ===== CONDITIONS VÉHICULES =====
export const VEHICLE_CONDITIONS = [
  { value: 'new', label: 'Neuf' },
  { value: 'used', label: 'Occasion' },
  { value: 'certified_pre_owned', label: 'Occasion certifiée' },
];

// ===== TYPES DE FINANCEMENT =====
export const FINANCING_TYPES = [
  { value: 'cash', label: 'Comptant' },
  { value: 'bank_loan', label: 'Crédit bancaire' },
  { value: 'leasing', label: 'Leasing' },
  { value: 'loa', label: 'LOA' },
  { value: 'lld', label: 'LLD' },
  { value: 'internal', label: 'Financement interne' },
];

// ===== STATUTS FINANCEMENT =====
export const FINANCING_STATUS = [
  { value: 'pending', label: 'En attente' },
  { value: 'approved', label: 'Approuvé' },
  { value: 'rejected', label: 'Refusé' },
  { value: 'not_applicable', label: 'Non applicable' },
];

// ===== TYPES DE GARANTIE =====
export const WARRANTY_TYPES = [
  { value: 'manufacturer', label: 'Constructeur' },
  { value: 'dealer', label: 'Concessionnaire' },
  { value: 'extended', label: 'Étendue' },
  { value: 'none', label: 'Aucune' },
];

// ===== TYPES DE LIVRAISON =====
export const DELIVERY_TYPES = [
  { value: 'pickup', label: 'Retrait sur place' },
  { value: 'delivery', label: 'Livraison' },
];

// ===== CONDITIONS REPRISE =====
export const TRADE_IN_CONDITIONS = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Bon' },
  { value: 'fair', label: 'Correct' },
  { value: 'poor', label: 'Mauvais' },
];