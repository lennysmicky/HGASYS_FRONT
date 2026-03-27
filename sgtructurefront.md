frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── logo-hga.png
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── car-placeholder.png
│   │   │   └── avatar-default.png
│   │   └── icons/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Breadcrumbs.jsx
│   │   ├── forms/
│   │   │   ├── InputField.jsx
│   │   │   ├── SelectField.jsx
│   │   │   ├── DateField.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   └── FormActions.jsx
│   │   ├── charts/
│   │   │   ├── SalesChart.jsx
│   │   │   ├── RevenueChart.jsx
│   │   │   ├── StockChart.jsx
│   │   │   ├── PieChart.jsx
│   │   │   └── BarChart.jsx
│   │   └── tables/
│   │       ├── DataTable.jsx
│   │       ├── UserTable.jsx
│   │       ├── VehicleTable.jsx
│   │       └── SaleTable.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── DashboardWidgets.jsx
│   │   ├── users/
│   │   │   ├── UserList.jsx
│   │   │   ├── UserForm.jsx
│   │   │   └── UserDetails.jsx
│   │   ├── employees/
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   └── EmployeeDetails.jsx
│   │   ├── clients/
│   │   │   ├── ClientList.jsx
│   │   │   ├── ClientForm.jsx
│   │   │   └── ClientDetails.jsx
│   │   ├── vehicles/
│   │   │   ├── VehicleList.jsx
│   │   │   ├── VehicleForm.jsx
│   │   │   ├── VehicleDetails.jsx
│   │   │   └── VehicleStock.jsx
│   │   ├── sales/
│   │   │   ├── SaleList.jsx
│   │   │   ├── SaleForm.jsx
│   │   │   ├── SaleDetails.jsx
│   │   │   └── Invoice.jsx
│   │   ├── hr/
│   │   │   ├── Attendance.jsx
│   │   │   ├── Leaves.jsx
│   │   │   ├── Salaries.jsx
│   │   │   └── LeaveForm.jsx
│   │   ├── reports/
│   │   │   ├── Reports.jsx
│   │   │   ├── SalesReport.jsx
│   │   │   └── FinancialReport.jsx
│   │   ├── settings/
│   │   │   ├── Settings.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── CompanySettings.jsx
│   │   └── errors/
│   │       ├── NotFound.jsx
│   │       └── Unauthorized.jsx
│   ├── services/
│   │   ├── api.js              # Instance Axios
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── employeeService.js
│   │   ├── clientService.js
│   │   ├── vehicleService.js
│   │   ├── saleService.js
│   │   └── dashboardService.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   ├── useForm.js
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   ├── helpers.js
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   ├── constants.js
│   │   └── rbac.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── components.css
│   ├── config/
│   │   ├── routes.jsx
│   │   └── menuItems.js
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── .env
└── .gitignore

Présentation Générale
HGA est un système ERP destiné à une entreprise de vente de voitures. Il permet la gestion complète des utilisateurs, employés, clients, ventes et opérations internes.
Architecture Technique
Frontend: React
Backend: Node.js (Express)
Base de données: MongoDB
Architecture: Client-Server avec API REST sécurisée (JWT)
Modules Fonctionnels
3.1 Gestion des utilisateurs (IAM)

Rôles: Admin, Manager, Employé
Authentification JWT
Permissions RBAC
3.2 Gestion des employés
Dossiers RH
Présence
Salaires
Congés
3.3 Gestion des clients (CRM)
Informations clients
Historique interactions
Facturation
3.4 Dashboard & Analytics
Statistiques en temps réel
Graphiques
Reporting
3.5 Modules métier automobile
Gestion des véhicules
Stock
Ventes
Logistique

Modèles de données
User: name, email, password, role
Employee: name, position, salary
Client: name, contact
Vehicle: marque, modèle, prix, stock
Workflow
Login
Accès dashboard
Gestion modules
Interaction avec API
Mise à jour base de données
Plan de développement (3 jours)
Jour 1: Setup + Auth
Jour 2: CRUD employés + clients
Jour 3: Dashboard + finition
HGA
Vision du Système
HGA est un ERP complet pour une entreprise de vente de véhicules. Il centralise la gestion des utilisateurs, employés, clients, ventes, stock et opérations métiers.
Architecture Complète
Frontend: React (UI)
Backend: Node.js + Express (API REST)
Database: MongoDB
Sécurité: JWT + RBAC
Architecture: Client-Server avec séparation des responsabilités
Modules Fonctionnels

Gestion des utilisateurs (IAM): rôles Admin, Manager, Employé, permissions RBAC
Gestion RH: employés, salaires, présence, congés
CRM: clients, interactions, facturation
Dashboard: statistiques, graphiques, reporting
Gestion véhicules: stock, modèles, prix
Ventes: commandes, factures, historique
Logistique: livraison, disponibilité
Comptabilité: revenus, dépenses

Architecture Backend (Structure)
controllers/: logique métier
models/: schémas MongoDB
routes/: API endpoints
middleware/: auth, sécurité
config/: DB, JWT
server.js: point d’entrée
Architecture Frontend (React)
components/: UI réutilisable
pages/: écrans (Dashboard, Employés...)
services/: appels API
context/: gestion état global
App.js: routing
RBAC (Roles & Permissions)
Admin: accès total
Manager: gestion employés + clients
Employé: accès limité (lecture / actions spécifiques)
Modèles de données
User: name, email, password, role
Employee: name, position, salary, department
Client: name, contact, historique
Vehicle: marque, modele, prix, stock
Sale: client, véhicule, montant, date
Workflow Global
Authentification
Accès Dashboard
Gestion modules
Communication API
Mise à jour base de données
Plan de Développement
Jour 1: Setup + Auth + DB
Jour 2: CRUD employés + clients + véhicules
Jour 3: Dashboard + ventes + finalisation
Bonnes Pratiques Pro

Hash passwords (bcrypt)
Validation des données
Middleware sécurité
Code structuré et modulaire
UI propre et responsive