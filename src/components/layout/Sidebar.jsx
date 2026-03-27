/* ================================================
   HGASYS - Sidebar Navigation
   ================================================ */

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { hasPermission } from '../../utils/rbac';
import { getInitials } from '../../utils/helpers';

// Icons MUI
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

// Map des icônes
const iconMap = {
  dashboard: DashboardOutlinedIcon,
  vehicles: DirectionsCarOutlinedIcon,
  clients: PeopleOutlineIcon,
  sales: ShoppingCartOutlinedIcon,
  employees: BadgeOutlinedIcon,
  hr: WorkOutlineIcon,
  users: AdminPanelSettingsOutlinedIcon,
  reports: AssessmentOutlinedIcon,
  settings: SettingsOutlinedIcon,
  attendance: EventNoteOutlinedIcon,
  leaves: BeachAccessOutlinedIcon,
  salaries: PaymentsOutlinedIcon,
  stock: InventoryOutlinedIcon,
};

// Configuration des menus
const menuConfig = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    path: '/',
    permission: null,
  },
  {
    id: 'divider-1',
    type: 'divider',
    label: 'Commercial',
  },
  {
    id: 'vehicles',
    label: 'Véhicules',
    icon: 'vehicles',
    permission: 'vehicles:read',
    children: [
      { id: 'vehicles-list', label: 'Liste', path: '/vehicles' },
      { id: 'vehicles-stock', label: 'Stock', path: '/vehicles/stock' },
      { id: 'vehicles-add', label: 'Ajouter', path: '/vehicles/new', permission: 'vehicles:create' },
    ],
  },
  {
    id: 'clients',
    label: 'Clients',
    icon: 'clients',
    path: '/clients',
    permission: 'clients:read',
  },
  {
    id: 'sales',
    label: 'Ventes',
    icon: 'sales',
    path: '/sales',
    permission: 'sales:read',
  },
  {
    id: 'divider-2',
    type: 'divider',
    label: 'Ressources Humaines',
  },
  {
    id: 'employees',
    label: 'Employés',
    icon: 'employees',
    path: '/employees',
    permission: 'employees:read',
  },
  {
    id: 'hr',
    label: 'Gestion RH',
    icon: 'hr',
    permission: 'attendance:read',
    children: [
      { id: 'attendance', label: 'Présences', path: '/hr/attendance', icon: 'attendance' },
      { id: 'leaves', label: 'Congés', path: '/hr/leaves', icon: 'leaves' },
      { id: 'salaries', label: 'Salaires', path: '/hr/salaries', icon: 'salaries', permission: 'salaries:read' },
    ],
  },
  {
    id: 'divider-3',
    type: 'divider',
    label: 'Administration',
  },
  {
    id: 'users',
    label: 'Utilisateurs',
    icon: 'users',
    path: '/users',
    permission: 'users:read',
  },
  {
    id: 'reports',
    label: 'Rapports',
    icon: 'reports',
    path: '/reports',
    permission: 'reports:read',
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: 'settings',
    path: '/settings',
    permission: 'settings:read',
  },
];

const Sidebar = ({ collapsed, onToggle }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  // Toggle submenu
  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  // Vérifier si un menu est actif
  const isMenuActive = (item) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return false;
  };

  // Filtrer les menus selon les permissions
  const filterMenus = (menus) => {
    return menus.filter(item => {
      if (item.type === 'divider') return true;
      if (!item.permission) return true;
      return hasPermission(user, item.permission);
    }).map(item => {
      if (item.children) {
        return {
          ...item,
          children: item.children.filter(child => {
            if (!child.permission) return true;
            return hasPermission(user, child.permission);
          }),
        };
      }
      return item;
    }).filter(item => {
      // Supprimer les menus avec enfants vides
      if (item.children && item.children.length === 0) return false;
      return true;
    });
  };

  const visibleMenus = filterMenus(menuConfig);

  // Render menu item
  const renderMenuItem = (item) => {
    if (item.type === 'divider') {
      if (collapsed) return null;
      return (
        <div key={item.id} className="sidebar-divider">
          <span className="sidebar-divider-text">{item.label}</span>
        </div>
      );
    }

    const Icon = iconMap[item.icon];
    const isActive = isMenuActive(item);
    const isExpanded = expandedMenus[item.id];
    const hasChildren = item.children && item.children.length > 0;

    // Menu avec sous-menus
    if (hasChildren) {
      return (
        <div key={item.id} className="sidebar-menu-group">
          <button
            onClick={() => toggleSubmenu(item.id)}
            className={`sidebar-menu-item ${isActive ? 'active' : ''}`}
            title={collapsed ? item.label : ''}
          >
            <span className="sidebar-menu-icon">
              {Icon && <Icon style={{ fontSize: '1.25rem' }} />}
            </span>
            {!collapsed && (
              <>
                <span className="sidebar-menu-label">{item.label}</span>
                <span className="sidebar-menu-arrow">
                  {isExpanded ? (
                    <ExpandLessIcon style={{ fontSize: '1rem' }} />
                  ) : (
                    <ExpandMoreIcon style={{ fontSize: '1rem' }} />
                  )}
                </span>
              </>
            )}
          </button>

          {/* Sous-menus */}
          {!collapsed && isExpanded && (
            <div className="sidebar-submenu">
              {item.children.map(child => {
                const ChildIcon = iconMap[child.icon];
                return (
                  <NavLink
                    key={child.id}
                    to={child.path}
                    className={({ isActive }) =>
                      `sidebar-submenu-item ${isActive ? 'active' : ''}`
                    }
                  >
                    {ChildIcon && (
                      <span className="sidebar-submenu-icon">
                        <ChildIcon style={{ fontSize: '1rem' }} />
                      </span>
                    )}
                    <span className="sidebar-submenu-label">{child.label}</span>
                  </NavLink>
                );
              })}
            </div>
          )}

          {/* Tooltip pour mode collapsed */}
          {collapsed && (
            <div className="sidebar-tooltip">
              <div className="sidebar-tooltip-title">{item.label}</div>
              {item.children.map(child => (
                <NavLink
                  key={child.id}
                  to={child.path}
                  className={({ isActive }) =>
                    `sidebar-tooltip-item ${isActive ? 'active' : ''}`
                  }
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Menu simple
    return (
      <NavLink
        key={item.id}
        to={item.path}
        className={({ isActive }) =>
          `sidebar-menu-item ${isActive ? 'active' : ''}`
        }
        title={collapsed ? item.label : ''}
      >
        <span className="sidebar-menu-icon">
          {Icon && <Icon style={{ fontSize: '1.25rem' }} />}
        </span>
        {!collapsed && <span className="sidebar-menu-label">{item.label}</span>}

        {/* Tooltip pour mode collapsed */}
        {collapsed && <span className="sidebar-menu-tooltip">{item.label}</span>}
      </NavLink>
    );
  };

  return (
    <aside className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>
      {/* Header avec logo */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img
            src="/src/assets/images/logo.png"
            alt="HGASYS"
            className="sidebar-logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {!collapsed && <span className="sidebar-logo-text">HGASYS</span>}
        </div>
        <button className="sidebar-toggle-btn" onClick={onToggle}>
          {collapsed ? (
            <ChevronRightIcon style={{ fontSize: '1.25rem' }} />
          ) : (
            <ChevronLeftIcon style={{ fontSize: '1.25rem' }} />
          )}
        </button>
      </div>

      {/* User info */}
      <div className="sidebar-user">
        <div className="sidebar-user-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <span>{getInitials(user?.name || 'U')}</span>
          )}
        </div>
        {!collapsed && (
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user?.name || 'Utilisateur'}</span>
            <span className="sidebar-user-role">{user?.role || 'employee'}</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {visibleMenus.map(renderMenuItem)}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {!collapsed && (
          <span className="sidebar-version">v1.0.0</span>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;