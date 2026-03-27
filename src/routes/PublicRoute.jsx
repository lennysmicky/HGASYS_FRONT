/* ================================================
   HGASYS - Route Publique
   Redirige vers le dashboard si déjà connecté
   ================================================ */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Afficher le loader pendant la vérification
  if (loading) {
    return <LoadingSpinner fullScreen text="Vérification..." />;
  }

  // Si connecté, rediriger vers la page d'origine ou le dashboard
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  // Sinon, afficher la page publique
  return children;
};

export default PublicRoute;