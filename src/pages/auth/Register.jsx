/* ================================================
   HGASYS - Page d'Inscription
   ================================================ */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Hooks
import { useAuth } from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';

// Components
import InputField from '../../components/forms/InputField';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// Icons MUI
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Styles
import '../../styles/auth.css';

// Validation du formulaire
const validateRegister = (values) => {
  const errors = {};

  // Nom
  if (!values.name) {
    errors.name = 'Le nom est requis';
  } else if (values.name.length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  } else if (values.name.length > 50) {
    errors.name = 'Le nom ne peut pas dépasser 50 caractères';
  }

  // Email
  if (!values.email) {
    errors.email = 'L\'email est requis';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Format d\'email invalide';
  }

  // Mot de passe
  if (!values.password) {
    errors.password = 'Le mot de passe est requis';
  } else if (values.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
    errors.password = 'Le mot de passe doit contenir une majuscule, une minuscule et un chiffre';
  }

  // Confirmation mot de passe
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Veuillez confirmer le mot de passe';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  // Téléphone (optionnel mais validé si rempli)
  if (values.phone && !/^(\+33|0)[1-9](\d{2}){4}$/.test(values.phone.replace(/\s/g, ''))) {
    errors.phone = 'Format de téléphone invalide';
  }

  return errors;
};

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading: authLoading } = useAuth();

  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handler de soumission
  const handleRegister = async (values) => {
    setServerError('');
    setSuccessMessage('');

    const result = await register({
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone || undefined,
    });

    if (result.success) {
      setSuccessMessage('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
      // Rediriger vers login après 2 secondes
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Compte créé avec succès ! Connectez-vous.' } 
        });
      }, 2000);
    } else {
      setServerError(result.error || 'Erreur lors de l\'inscription');
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
    { name: '', email: '', password: '', confirmPassword: '', phone: '' },
    handleRegister,
    validateRegister
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
            <div className="auth-branding-header">
              <img
                src="/src/assets/images/logo.png"
                alt="HGASYS"
                className="auth-branding-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <h1 className="auth-branding-title">HGASYS</h1>
            </div>
            
            <p className="auth-branding-subtitle">
              Rejoignez notre plateforme de gestion automobile
            </p>

            <div className="auth-branding-features">
              <div className="auth-branding-feature">
                <div className="auth-branding-feature-icon">
                  <DirectionsCarIcon style={{ fontSize: '1rem' }} />
                </div>
                <span>Gestion de flotte simplifiée</span>
              </div>
              <div className="auth-branding-feature">
                <div className="auth-branding-feature-icon">
                  <CheckCircleOutlineIcon style={{ fontSize: '1rem' }} />
                </div>
                <span>Interface intuitive et moderne</span>
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
              <h2 className="auth-card-title">Créer un compte</h2>
              <p className="auth-card-subtitle">
                Remplissez le formulaire pour vous inscrire
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
                label="Nom complet"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Jean Dupont"
                error={errors.name}
                touched={touched.name}
                required
                autoComplete="name"
                icon={PersonOutlineIcon}
              />

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
                label="Téléphone (optionnel)"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="06 12 34 56 78"
                error={errors.phone}
                touched={touched.phone}
                autoComplete="tel"
                icon={PhoneOutlinedIcon}
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
                autoComplete="new-password"
                icon={LockOutlinedIcon}
              />

              <InputField
                label="Confirmer le mot de passe"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                required
                autoComplete="new-password"
                icon={LockOutlinedIcon}
              />

              {/* Info mot de passe */}
              <div className="auth-password-info">
                <p>Le mot de passe doit contenir :</p>
                <ul>
                  <li className={values.password.length >= 6 ? 'valid' : ''}>
                    Au moins 6 caractères
                  </li>
                  <li className={/[A-Z]/.test(values.password) ? 'valid' : ''}>
                    Une lettre majuscule
                  </li>
                  <li className={/[a-z]/.test(values.password) ? 'valid' : ''}>
                    Une lettre minuscule
                  </li>
                  <li className={/\d/.test(values.password) ? 'valid' : ''}>
                    Un chiffre
                  </li>
                </ul>
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
                Créer mon compte
              </Button>
            </form>

            {/* Footer */}
            <div className="auth-card-footer">
              Vous avez déjà un compte ?
              <Link to="/login">Se connecter</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;