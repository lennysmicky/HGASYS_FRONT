/* ================================================
   HGASYS - Point d'entrée
   ================================================ */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Styles
import './index.css';
import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';
import './styles/auth.css';

// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      toastStyle={{
        fontSize: '12px',
        borderRadius: '10px',
        fontFamily: 'Inter, sans-serif',
      }}
    />
  </React.StrictMode>
);