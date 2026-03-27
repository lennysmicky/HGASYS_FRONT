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