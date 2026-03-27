/* ================================================
   HGASYS - Configuration des Menus
   Définit la structure de la sidebar
   ================================================ */

// Icons MUI
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

/**
 * Structure des menus de la sidebar
 * 
 * Chaque item peut avoir :
 * - id: Identifiant unique
 * - label: Texte affiché
 * - icon: Composant icône MUI
 * - path: Route de navigation
 * - permission: Permission requise pour voir ce menu
 * - children: Sous-menus (optionnel)
 * - badge: Nombre à afficher (optionnel)
 * - divider: Ajoute un séparateur avant (optionnel)
 * - group: Nom du groupe (optionnel)
 */

export const MENU_ITEMS = [
  // ══════════════════════════════════
  // GROUPE : PRINCIPAL
  // ══════════════════════════════════
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: DashboardOutlinedIcon,
    path: '/',
    permission: null, // Accessible à tous les connectés
  },

  // ══════════════════════════════════
  // GROUPE : GESTION COMMERCIALE
  // ══════════════════════════════════
  {
    id: 'group-commercial',
    group: 'Commercial',
    divider: true,
  },
  {
    id: 'vehicles',
    label: 'Véhicules',
    icon: DirectionsCarOutlinedIcon,
    path: '/vehicles',
    permission: 'vehicles:read',
    children: [
      {
        id: 'vehicles-list',
        label: 'Liste des véhicules',
        path: '/vehicles',
        permission: 'vehicles:read',
      },
      {
        id: 'vehicles-stock',
        label: 'Gestion du stock',
        path: '/vehicles/stock',
        permission: 'vehicles:read',
      },
      {
        id: 'vehicles-add',
        label: 'Ajouter un véhicule',
        path: '/vehicles/new',
        permission: 'vehicles:create',
      },
    ],
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: PeopleOutlineIcon,
    path: '/clients',
    permission: 'clients:read',
    children: [
      {
        id: 'clients-list',
        label: 'Liste des clients',
        path: '/clients',
        permission: 'clients:read',
      },
      {
        id: 'clients-add',
        label: 'Ajouter un client',
        path: '/clients/new',
        permission: 'clients:create',
      },
    ],
  },
  {
    id: 'sales',
    label: 'Ventes',
    icon: ShoppingCartOutlinedIcon,
    path: '/sales',
    permission: 'sales:read',
    children: [
      {
        id: 'sales-list',
        label: 'Liste des ventes',
        path: '/sales',
        permission: 'sales:read',
      },
      {
        id: 'sales-add',
        label: 'Nouvelle vente',
        path: '/sales/new',
        permission: 'sales:create',
      },
      {
        id: 'sales-invoices',
        label: 'Factures',
        path: '/sales/invoices',
        permission: 'sales:read',
      },
    ],
  },

  // ══════════════════════════════════
  // GROUPE : RESSOURCES HUMAINES
  // ══════════════════════════════════
  {
    id: 'group-hr',
    group: 'Ressources Humaines',
    divider: true,
  },
  {
    id: 'employees',
    label: 'Employés',
    icon: BadgeOutlinedIcon,
    path: '/employees',
    permission: 'employees:read',
    children: [
      {
        id: 'employees-list',
        label: 'Liste des employés',
        path: '/employees',
        permission: 'employees:read',
      },
      {
        id: 'employees-add',
        label: 'Ajouter un employé',
        path: '/employees/new',
        permission: 'employees:create',
      },
    ],
  },
  {
    id: 'hr',
    label: 'Gestion RH',
    icon: WorkOutlineIcon,
    permission: 'attendance:read',
    children: [
      {
        id: 'hr-attendance',
        label: 'Présences',
        icon: EventNoteOutlinedIcon,
        path: '/hr/attendance',
        permission: 'attendance:read',
      },
      {
        id: 'hr-leaves',
        label: 'Congés',
        icon: BeachAccessOutlinedIcon,
        path: '/hr/leaves',
        permission: 'leaves:read',
      },
      {
        id: 'hr-salaries',
        label: 'Salaires',
        icon: PaymentsOutlinedIcon,
        path: '/hr/salaries',
        permission: 'salaries:read',
      },
    ],
  },

  // ══════════════════════════════════
  // GROUPE : ADMINISTRATION
  // ══════════════════════════════════
  {
    id: 'group-admin',
    group: 'Administration',
    divider: true,
  },
  {
    id: 'users',
    label: 'Utilisateurs',
    icon: AdminPanelSettingsOutlinedIcon,
    path: '/users',
    permission: 'users:read',
    children: [
      {
        id: 'users-list',
        label: 'Liste des utilisateurs',
        path: '/users',
        permission: 'users:read',
      },
      {
        id: 'users-add',
        label: 'Ajouter un utilisateur',
        path: '/users/new',
        permission: 'users:create',
      },
    ],
  },
  {
    id: 'reports',
    label: 'Rapports',
    icon: AssessmentOutlinedIcon,
    permission: 'reports:read',
    children: [
      {
        id: 'reports-sales',
        label: 'Rapport des ventes',
        icon: ReceiptLongOutlinedIcon,
        path: '/reports/sales',
        permission: 'reports:read',
      },
      {
        id: 'reports-financial',
        label: 'Rapport financier',
        icon: AccountBalanceOutlinedIcon,
        path: '/reports/financial',
        permission: 'reports:read',
      },
      {
        id: 'reports-inventory',
        label: 'Rapport de stock',
        icon: InventoryOutlinedIcon,
        path: '/reports/inventory',
        permission: 'reports:read',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: SettingsOutlinedIcon,
    path: '/settings',
    permission: 'settings:read',
    divider: true,
  },
];

/**
 * Récupère un menu par son ID
 */
export const getMenuById = (id) => {
  const findMenu = (items) => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findMenu(item.children);
        if (found) return found;
      }
    }
    return null;
  };
  return findMenu(MENU_ITEMS);
};

/**
 * Récupère le chemin du breadcrumb pour une route
 */
export const getBreadcrumbPath = (pathname) => {
  const breadcrumbs = [];
  
  const findPath = (items, path = []) => {
    for (const item of items) {
      if (item.group) continue;
      
      const currentPath = [...path, { label: item.label, path: item.path }];
      
      if (item.path === pathname) {
        return currentPath;
      }
      
      if (item.children) {
        const found = findPath(item.children, currentPath);
        if (found) return found;
      }
    }
    return null;
  };
  
  return findPath(MENU_ITEMS) || breadcrumbs;
};

export default MENU_ITEMS;