/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ===== COULEURS HGASYS =====
      colors: {
        // Sidebar
        sidebar: {
          dark: '#2c1e4a',
          light: '#1a2f4e',
          hover: 'rgba(255,255,255,0.1)',
          active: 'rgba(123, 104, 238, 0.4)',
          border: 'rgba(255,255,255,0.15)',
          text: '#eef4ff',
          textMuted: 'rgba(238,244,255,0.7)',
        },
        
        // Primary
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#7b68ee',
          600: '#6d5bd8',
          700: '#5b4bc4',
          800: '#4c3d9e',
          900: '#3d3280',
          950: '#251e50',
        },
        
        // Secondary
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        
        // États
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          400: '#4ade80',
          500: '#2ecc71',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f39c12',
          600: '#d97706',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          400: '#f87171',
          500: '#e74c3c',
          600: '#dc2626',
        },
        
        // Fond et surfaces
        background: '#f4f7fc',
        surface: '#ffffff',
        border: '#edf2f7',
        
        // Textes - CORRIGÉ : structure plate
        'text-primary': '#1a2c3e',
        'text-secondary': '#5f7f9e',
        'text-muted': '#8ba0b5',
      },
      
      // ===== TYPOGRAPHIE =====
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        'xs': ['0.65rem', { lineHeight: '0.9rem' }],
        'sm': ['0.7rem', { lineHeight: '1rem' }],
        'base': ['0.75rem', { lineHeight: '1.1rem' }],
        'lg': ['0.8rem', { lineHeight: '1.2rem' }],
        'xl': ['0.85rem', { lineHeight: '1.25rem' }],
        '2xl': ['1rem', { lineHeight: '1.4rem' }],
        '3xl': ['1.3rem', { lineHeight: '1.6rem' }],
        '4xl': ['1.6rem', { lineHeight: '1.8rem' }],
      },
      
      // ===== ESPACEMENTS =====
      spacing: {
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.2rem',
        '6': '1.5rem',
      },
      
      // ===== BORDURES =====
      borderRadius: {
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'md': '0.625rem',
        'lg': '1rem',
        'xl': '1.25rem',
      },
      
      // ===== BORDER WIDTH - CORRIGÉ =====
      borderWidth: {
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      
      // ===== OMBRES =====
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.02)',
        'DEFAULT': '0 2px 6px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)',
        'md': '0 4px 12px rgba(0,0,0,0.05)',
        'lg': '0 10px 25px rgba(0,0,0,0.08)',
        'sidebar': '2px 0 12px rgba(0,0,0,0.1)',
        'topbar': '0 1px 2px rgba(0,0,0,0.02)',
        'card': '0 2px 6px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)',
      },
      
      // ===== DIMENSIONS =====
      width: {
        'sidebar': '260px',
        'sidebar-collapsed': '0px',
      },
      height: {
        'topbar': '52px',
      },
      
      // ===== TRANSITIONS =====
      transitionDuration: {
        '250': '250ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // ===== ANIMATIONS =====
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in-left': 'slideInLeft 0.25s ease-out',
        'slide-in-up': 'slideInUp 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      
      // ===== Z-INDEX =====
      zIndex: {
        'sidebar': '20',
        'topbar': '15',
        'modal': '50',
        'tooltip': '60',
        'mobile-menu': '100',
      },
    },
  },
  plugins: [],
}