/* ================================================
   HGASYS - Configuration des Routes
   ================================================ */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Routes
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// Pages Auth
import Login from '../pages/auth/Login';

// Pages Errors
import NotFound from '../pages/errors/NotFound';

// Placeholder pour le Dashboard (à créer ensuite)
const DashboardPlaceholder = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-text-primary mb-2">Dashboard</h1>
      <p className="text-text-muted">Page en cours de développement...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes Publiques */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Routes Privées */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboardPlaceholder />
          </PrivateRoute>
        }
      />

      {/* Page 404 */}
      <Route path="/404" element={<NotFound />} />

      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;