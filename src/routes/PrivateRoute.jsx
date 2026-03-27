/* ================================================
   HGASYS - Route Privée (Protégée)
   Redirige vers login si non connecté
   ================================================ */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PrivateRoute = ({ children, permission }) => {
  const { isAuthenticated, loading, checkPermission } = useAuth();
  const location = useLocation();

  // Afficher le loader pendant la vérification
  if (loading) {
    return <LoadingSpinner fullScreen text="Chargement..." />;
  }

  // Si non connecté, rediriger vers login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérifier les permissions si spécifiées
  if (permission && !checkPermission(permission)) {
    return <Navigate to="/403" replace />;
  }

  // Sinon, afficher la page protégée
  return children;
};

export default PrivateRoute;