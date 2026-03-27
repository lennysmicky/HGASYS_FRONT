/* ================================================
   HGASYS - Main Layout
   ================================================ */

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Détecter la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar
  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  // Fermer sidebar mobile si clic sur overlay
  const handleOverlayClick = () => {
    if (isMobile && mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
  };

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <Sidebar
        collapsed={isMobile ? !mobileSidebarOpen : sidebarCollapsed}
        onToggle={handleSidebarToggle}
      />

      {/* Mobile overlay */}
      {isMobile && mobileSidebarOpen && (
        <div className="sidebar-overlay" onClick={handleOverlayClick} />
      )}

      {/* Main content area */}
      <div className={`main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Topbar */}
        <Topbar
          onMenuToggle={handleSidebarToggle}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Page content */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;