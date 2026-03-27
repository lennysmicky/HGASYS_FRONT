/* ================================================
   HGASYS - Configuration des Routes
   Définit toutes les routes de l'application
   ================================================ */

import React, { lazy } from 'react';

// Lazy loading des pages pour optimiser les performances
// Auth
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

// Dashboard
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));

// Vehicles
const VehicleList = lazy(() => import('../pages/vehicles/VehicleList'));
const VehicleForm = lazy(() => import('../pages/vehicles/VehicleForm'));
const VehicleDetails = lazy(() => import('../pages/vehicles/VehicleDetails'));
const VehicleStock = lazy(() => import('../pages/vehicles/VehicleStock'));

// Clients
const ClientList = lazy(() => import('../pages/clients/ClientList'));
const ClientForm = lazy(() => import('../pages/clients/ClientForm'));
const ClientDetails = lazy(() => import('../pages/clients/ClientDetails'));

// Sales
const SaleList = lazy(() => import('../pages/sales/SaleList'));
const SaleForm = lazy(() => import('../pages/sales/SaleForm'));
const SaleDetails = lazy(() => import('../pages/sales/SaleDetails'));
const Invoice = lazy(() => import('../pages/sales/Invoice'));

// Employees
const EmployeeList = lazy(() => import('../pages/employees/EmployeeList'));
const EmployeeForm = lazy(() => import('../pages/employees/EmployeeForm'));
const EmployeeDetails = lazy(() => import('../pages/employees/EmployeeDetails'));

// HR
const Attendance = lazy(() => import('../pages/hr/Attendance'));
const Leaves = lazy(() => import('../pages/hr/Leaves'));
const LeaveForm = lazy(() => import('../pages/hr/LeaveForm'));
const Salaries = lazy(() => import('../pages/hr/Salaries'));

// Users
const UserList = lazy(() => import('../pages/users/UserList'));
const UserForm = lazy(() => import('../pages/users/UserForm'));
const UserDetails = lazy(() => import('../pages/users/UserDetails'));

// Reports
const Reports = lazy(() => import('../pages/reports/Reports'));
const SalesReport = lazy(() => import('../pages/reports/SalesReport'));
const FinancialReport = lazy(() => import('../pages/reports/FinancialReport'));

// Settings
const Settings = lazy(() => import('../pages/settings/Settings'));
const Profile = lazy(() => import('../pages/settings/Profile'));
const CompanySettings = lazy(() => import('../pages/settings/CompanySettings'));

// Errors
const NotFound = lazy(() => import('../pages/errors/NotFound'));
const Unauthorized = lazy(() => import('../pages/errors/Unauthorized'));

/**
 * Configuration des routes
 * 
 * Structure :
 * - path: Chemin de la route
 * - element: Composant à afficher
 * - permission: Permission requise (null = accessible à tous les connectés)
 * - isPublic: Route publique (accessible sans connexion)
 * - layout: Type de layout ('main' | 'auth' | 'none')
 */
export const routesConfig = {
  // ══════════════════════════════════
  // ROUTES PUBLIQUES (Auth)
  // ══════════════════════════════════
  public: [
    {
      path: '/login',
      element: Login,
      title: 'Connexion',
    },
    {
      path: '/register',
      element: Register,
      title: 'Inscription',
    },
    {
      path: '/forgot-password',
      element: ForgotPassword,
      title: 'Mot de passe oublié',
    },
    {
      path: '/reset-password/:token',
      element: ResetPassword,
      title: 'Réinitialiser le mot de passe',
    },
  ],

  // ══════════════════════════════════
  // ROUTES PRIVÉES
  // ══════════════════════════════════
  private: [
    // Dashboard
    {
      path: '/',
      element: Dashboard,
      title: 'Dashboard',
      permission: null,
    },

    // Vehicles
    {
      path: '/vehicles',
      element: VehicleList,
      title: 'Véhicules',
      permission: 'vehicles:read',
    },
    {
      path: '/vehicles/new',
      element: VehicleForm,
      title: 'Ajouter un véhicule',
      permission: 'vehicles:create',
    },
    {
      path: '/vehicles/:id',
      element: VehicleDetails,
      title: 'Détails du véhicule',
      permission: 'vehicles:read',
    },
    {
      path: '/vehicles/:id/edit',
      element: VehicleForm,
      title: 'Modifier le véhicule',
      permission: 'vehicles:update',
    },
    {
      path: '/vehicles/stock',
      element: VehicleStock,
      title: 'Gestion du stock',
      permission: 'vehicles:read',
    },

    // Clients
    {
      path: '/clients',
      element: ClientList,
      title: 'Clients',
      permission: 'clients:read',
    },
    {
      path: '/clients/new',
      element: ClientForm,
      title: 'Ajouter un client',
      permission: 'clients:create',
    },
    {
      path: '/clients/:id',
      element: ClientDetails,
      title: 'Détails du client',
      permission: 'clients:read',
    },
    {
      path: '/clients/:id/edit',
      element: ClientForm,
      title: 'Modifier le client',
      permission: 'clients:update',
    },

    // Sales
    {
      path: '/sales',
      element: SaleList,
      title: 'Ventes',
      permission: 'sales:read',
    },
    {
      path: '/sales/new',
      element: SaleForm,
      title: 'Nouvelle vente',
      permission: 'sales:create',
    },
    {
      path: '/sales/:id',
      element: SaleDetails,
      title: 'Détails de la vente',
      permission: 'sales:read',
    },
    {
      path: '/sales/:id/edit',
      element: SaleForm,
      title: 'Modifier la vente',
      permission: 'sales:update',
    },
    {
      path: '/sales/:id/invoice',
      element: Invoice,
      title: 'Facture',
      permission: 'sales:read',
    },

    // Employees
    {
      path: '/employees',
      element: EmployeeList,
      title: 'Employés',
      permission: 'employees:read',
    },
    {
      path: '/employees/new',
      element: EmployeeForm,
      title: 'Ajouter un employé',
      permission: 'employees:create',
    },
    {
      path: '/employees/:id',
      element: EmployeeDetails,
      title: 'Détails de l\'employé',
      permission: 'employees:read',
    },
    {
      path: '/employees/:id/edit',
      element: EmployeeForm,
      title: 'Modifier l\'employé',
      permission: 'employees:update',
    },

    // HR
    {
      path: '/hr/attendance',
      element: Attendance,
      title: 'Présences',
      permission: 'attendance:read',
    },
    {
      path: '/hr/leaves',
      element: Leaves,
      title: 'Congés',
      permission: 'leaves:read',
    },
    {
      path: '/hr/leaves/new',
      element: LeaveForm,
      title: 'Demande de congé',
      permission: 'leaves:create',
    },
    {
      path: '/hr/salaries',
      element: Salaries,
      title: 'Salaires',
      permission: 'salaries:read',
    },

    // Users
    {
      path: '/users',
      element: UserList,
      title: 'Utilisateurs',
      permission: 'users:read',
    },
    {
      path: '/users/new',
      element: UserForm,
      title: 'Ajouter un utilisateur',
      permission: 'users:create',
    },
    {
      path: '/users/:id',
      element: UserDetails,
      title: 'Détails de l\'utilisateur',
      permission: 'users:read',
    },
    {
      path: '/users/:id/edit',
      element: UserForm,
      title: 'Modifier l\'utilisateur',
      permission: 'users:update',
    },

    // Reports
    {
      path: '/reports',
      element: Reports,
      title: 'Rapports',
      permission: 'reports:read',
    },
    {
      path: '/reports/sales',
      element: SalesReport,
      title: 'Rapport des ventes',
      permission: 'reports:read',
    },
    {
      path: '/reports/financial',
      element: FinancialReport,
      title: 'Rapport financier',
      permission: 'reports:read',
    },

    // Settings
    {
      path: '/settings',
      element: Settings,
      title: 'Paramètres',
      permission: 'settings:read',
    },
    {
      path: '/settings/profile',
      element: Profile,
      title: 'Mon profil',
      permission: null,
    },
    {
      path: '/settings/company',
      element: CompanySettings,
      title: 'Paramètres entreprise',
      permission: 'settings:update',
    },
  ],

  // ══════════════════════════════════
  // ROUTES ERREURS
  // ══════════════════════════════════
  errors: [
    {
      path: '/404',
      element: NotFound,
      title: 'Page non trouvée',
    },
    {
      path: '/403',
      element: Unauthorized,
      title: 'Accès non autorisé',
    },
  ],
};

export default routesConfig;