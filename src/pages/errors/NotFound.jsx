/* ================================================
   HGASYS - Page 404
   ================================================ */

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Page non trouvée
        </h2>
        <p className="text-text-muted mb-6 max-w-md">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/">
          <Button variant="primary" icon={HomeOutlinedIcon}>
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;