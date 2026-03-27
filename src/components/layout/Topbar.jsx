/* ================================================
   HGASYS - Topbar Navigation
   ================================================ */

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';

// Icons MUI
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';

const Topbar = ({ onMenuToggle, sidebarCollapsed }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Fermer les menus si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implémenter la recherche globale
      console.log('Search:', searchQuery);
    }
  };

  // Notifications mock
  const notifications = [
    { id: 1, title: 'Nouvelle vente', message: 'Une nouvelle vente a été enregistrée', time: 'Il y a 5 min', unread: true },
    { id: 2, title: 'Stock faible', message: '3 véhicules en stock faible', time: 'Il y a 1h', unread: true },
    { id: 3, title: 'Congé approuvé', message: 'Votre demande a été approuvée', time: 'Il y a 2h', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={`topbar-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Left section */}
      <div className="topbar-left">
        {/* Mobile menu toggle */}
        <button className="topbar-menu-btn" onClick={onMenuToggle}>
          <MenuIcon style={{ fontSize: '1.25rem' }} />
        </button>

        {/* Search */}
        <form className="topbar-search" onSubmit={handleSearch}>
          <SearchOutlinedIcon className="topbar-search-icon" style={{ fontSize: '1rem' }} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="topbar-search-input"
          />
        </form>
      </div>

      {/* Right section */}
      <div className="topbar-right">
        {/* Fullscreen toggle */}
        <button className="topbar-icon-btn" onClick={toggleFullscreen} title="Plein écran">
          {isFullscreen ? (
            <FullscreenExitOutlinedIcon style={{ fontSize: '1.25rem' }} />
          ) : (
            <FullscreenOutlinedIcon style={{ fontSize: '1.25rem' }} />
          )}
        </button>

        {/* Notifications */}
        <div className="topbar-dropdown" ref={notificationRef}>
          <button
            className="topbar-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <NotificationsNoneOutlinedIcon style={{ fontSize: '1.25rem' }} />
            {unreadCount > 0 && (
              <span className="topbar-badge">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="topbar-dropdown-menu topbar-notifications">
              <div className="topbar-dropdown-header">
                <span>Notifications</span>
                <button className="topbar-dropdown-action">Tout marquer comme lu</button>
              </div>
              <div className="topbar-dropdown-body">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`topbar-notification-item ${notif.unread ? 'unread' : ''}`}
                    >
                      <div className="topbar-notification-content">
                        <span className="topbar-notification-title">{notif.title}</span>
                        <span className="topbar-notification-message">{notif.message}</span>
                        <span className="topbar-notification-time">{notif.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="topbar-dropdown-empty">Aucune notification</div>
                )}
              </div>
              <div className="topbar-dropdown-footer">
                <button onClick={() => navigate('/notifications')}>
                  Voir toutes les notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="topbar-icon-btn" title="Messages">
          <MailOutlineIcon style={{ fontSize: '1.25rem' }} />
        </button>

        {/* User menu */}
        <div className="topbar-dropdown topbar-user-dropdown" ref={userMenuRef}>
          <button
            className="topbar-user-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="topbar-user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{getInitials(user?.name || 'U')}</span>
              )}
            </div>
            <div className="topbar-user-info">
              <span className="topbar-user-name">{user?.name || 'Utilisateur'}</span>
              <span className="topbar-user-role">{user?.role || 'employee'}</span>
            </div>
            <ExpandMoreIcon
              style={{ fontSize: '1rem' }}
              className={`topbar-user-arrow ${showUserMenu ? 'rotated' : ''}`}
            />
          </button>

          {showUserMenu && (
            <div className="topbar-dropdown-menu topbar-user-menu">
              <div className="topbar-dropdown-header">
                <span className="topbar-dropdown-email">{user?.email}</span>
              </div>
              <div className="topbar-dropdown-body">
                <button
                  className="topbar-dropdown-item"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings/profile');
                  }}
                >
                  <PersonOutlineIcon style={{ fontSize: '1rem' }} />
                  <span>Mon profil</span>
                </button>
                <button
                  className="topbar-dropdown-item"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                >
                  <SettingsOutlinedIcon style={{ fontSize: '1rem' }} />
                  <span>Paramètres</span>
                </button>
                <div className="topbar-dropdown-divider" />
                <button
                  className="topbar-dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <LogoutOutlinedIcon style={{ fontSize: '1rem' }} />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;