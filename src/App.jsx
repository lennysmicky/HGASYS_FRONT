/* ================================================
   HGASYS - Application Principale
   ================================================ */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';

// Routes
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;