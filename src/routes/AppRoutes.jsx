/* ================================================
   HGASYS - Configuration des Routes
   ================================================ */

import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Routes
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// Layout
import MainLayout from '../components/layout/MainLayout';

// Pages Auth
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Pages Errors
import NotFound from '../pages/errors/NotFound';

// Components
import LoadingSpinner from '../components/common/LoadingSpinner';

// Placeholder pour les pages en développement
const PagePlaceholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-xl font-bold text-text-primary mb-2">{title}</h1>
    <p className="text-text-muted text-sm">Page en cours de développement...</p>
  </div>
);

// Pages temporaires
const Dashboard = () => <PagePlaceholder title="Dashboard" />;
const VehicleList = () => <PagePlaceholder title="Liste des Véhicules" />;
const ClientList = () => <PagePlaceholder title="Liste des Clients" />;
const SaleList = () => <PagePlaceholder title="Liste des Ventes" />;
const EmployeeList = () => <PagePlaceholder title="Liste des Employés" />;
const UserList = () => <PagePlaceholder title="Liste des Utilisateurs" />;
const Attendance = () => <PagePlaceholder title="Présences" />;
const Leaves = () => <PagePlaceholder title="Congés" />;
const Salaries = () => <PagePlaceholder title="Salaires" />;
const Reports = () => <PagePlaceholder title="Rapports" />;
const Settings = () => <PagePlaceholder title="Paramètres" />;
const Profile = () => <PagePlaceholder title="Mon Profil" />;
const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background">
    <h1 className="text-4xl font-bold text-danger-500 mb-2">403</h1>
    <p className="text-text-muted">Accès non autorisé</p>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen text="Chargement..." />}>
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
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Routes Privées avec Layout */}
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Véhicules */}
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/vehicles/stock" element={<VehicleList />} />
          <Route path="/vehicles/new" element={<VehicleList />} />
          <Route path="/vehicles/:id" element={<VehicleList />} />
          <Route path="/vehicles/:id/edit" element={<VehicleList />} />

          {/* Clients */}
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientList />} />
          <Route path="/clients/:id" element={<ClientList />} />
          <Route path="/clients/:id/edit" element={<ClientList />} />

          {/* Ventes */}
          <Route path="/sales" element={<SaleList />} />
          <Route path="/sales/new" element={<SaleList />} />
          <Route path="/sales/:id" element={<SaleList />} />
          <Route path="/sales/:id/edit" element={<SaleList />} />

          {/* Employés */}
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/new" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeList />} />
          <Route path="/employees/:id/edit" element={<EmployeeList />} />

          {/* RH */}
          <Route path="/hr/attendance" element={<Attendance />} />
          <Route path="/hr/leaves" element={<Leaves />} />
          <Route path="/hr/salaries" element={<Salaries />} />

          {/* Utilisateurs */}
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserList />} />
          <Route path="/users/:id" element={<UserList />} />
          <Route path="/users/:id/edit" element={<UserList />} />

          {/* Rapports */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/sales" element={<Reports />} />
          <Route path="/reports/financial" element={<Reports />} />

          {/* Paramètres */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/profile" element={<Profile />} />
        </Route>

        {/* Erreurs */}
        <Route path="/403" element={<Unauthorized />} />
        <Route path="/404" element={<NotFound />} />

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;