/* ================================================
   HGASYS - Page de Connexion
   ================================================ */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

// Hooks
import { useAuth } from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';

// Components
import InputField from '../../components/forms/InputField';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// Icons MUI
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Styles
import '../../styles/auth.css';

// Validation du formulaire
const validateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'L\'email est requis';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Format d\'email invalide';
  }

  if (!values.password) {
    errors.password = 'Le mot de passe est requis';
  } else if (values.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
  }

  return errors;
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Récupérer l'URL de redirection
  const from = location.state?.from?.pathname || '/';

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Vérifier les messages de succès (ex: après inscription)
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Nettoyer le state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Handler de soumission
  const handleLogin = async (values) => {
    setServerError('');
    setSuccessMessage('');

    const result = await login(values.email, values.password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setServerError(result.error || 'Identifiants invalides');
    }
  };

  // Hook useForm
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(
    { email: '', password: '' },
    handleLogin,
    validateLogin
  );

  // Afficher le loader pendant la vérification initiale
  if (authLoading) {
    return <LoadingSpinner fullScreen text="Chargement..." />;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Section Branding - Gauche */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <img
              src="/src/assets/images/logo.png"
              alt="HGASYS"
              className="auth-branding-logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h1 className="auth-branding-title">HGASYS</h1>
            <p className="auth-branding-subtitle">
              Système de Gestion Administrative pour Entreprise Automobile
            </p>

            <div className="auth-branding-features">
              <div className="auth-branding-feature">
                <div className="auth-branding-feature-icon">
                  <DirectionsCarIcon style={{ fontSize: '1rem' }} />
                </div>
                <span>Gestion complète du parc automobile</span>
              </div>
              <div className="auth-branding-feature">
                <div className="auth-branding-feature-icon">
                  <PeopleOutlineIcon style={{ fontSize: '1rem' }} />
                </div>
                <span>CRM clients et suivi des ventes</span>
              </div>
              <div className="auth-branding-feature">
                <div className="auth-branding-feature-icon">
                  <AssessmentOutlinedIcon style={{ fontSize: '1rem' }} />
                </div>
                <span>Tableau de bord et analytics</span>
              </div>
              <div className="auth-branding-feature">
                <div className="auth-branding-feature-icon">
                  <SecurityOutlinedIcon style={{ fontSize: '1rem' }} />
                </div>
                <span>Sécurité et gestion des accès</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Formulaire - Droite */}
        <div className="auth-form-section">
          <div className="auth-card">
            {/* Header */}
            <div className="auth-card-header">
              <img
                src="/src/assets/images/logo.png"
                alt="HGASYS"
                className="auth-card-logo auth-card-logo-mobile"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <h2 className="auth-card-title">Bienvenue</h2>
              <p className="auth-card-subtitle">
                Connectez-vous à votre compte HGASYS
              </p>
            </div>

            {/* Messages */}
            {serverError && (
              <div className="auth-alert auth-alert-error">
                <ErrorOutlineIcon className="auth-alert-icon" style={{ fontSize: '1rem' }} />
                <span>{serverError}</span>
              </div>
            )}

            {successMessage && (
              <div className="auth-alert auth-alert-success">
                <CheckCircleOutlineIcon className="auth-alert-icon" style={{ fontSize: '1rem' }} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              <InputField
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="votre@email.com"
                error={errors.email}
                touched={touched.email}
                required
                autoComplete="email"
                icon={EmailOutlinedIcon}
              />

              <InputField
                label="Mot de passe"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                error={errors.password}
                touched={touched.password}
                required
                autoComplete="current-password"
                icon={LockOutlinedIcon}
              />

              {/* Options */}
              <div className="auth-form-options">
                <label className="auth-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Se souvenir de moi</span>
                </label>

                <Link to="/forgot-password" className="auth-forgot">
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Bouton Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                className="auth-submit-btn"
              >
                Se connecter
              </Button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span>ou</span>
            </div>

            {/* Social Login (optionnel - décoratif) */}
            <div className="auth-social">
              <button type="button" className="auth-social-btn" disabled>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button type="button" className="auth-social-btn" disabled>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
            </div>

            {/* Footer */}
            <div className="auth-card-footer">
              Pas encore de compte ?
              <Link to="/register">Créer un compte</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;