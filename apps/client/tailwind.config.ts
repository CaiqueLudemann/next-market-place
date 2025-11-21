import type { Config } from 'tailwindcss'

const config: Config = {
  // Content paths - Files to scan for Tailwind classes
  content: [
    // Scan all TypeScript/JavaScript files in src directory
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Theme customization - Extend or override default Tailwind theme
  theme: {
    extend: {
      // Custom colors for modern sleek marketplace
      colors: {
        // Primary brand colors - Deep blue/purple gradient
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a4bcfd',
          400: '#8098f9',
          500: '#6366f1', // Main primary
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Secondary accent colors - Vibrant cyan/teal
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4', // Main accent
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // Neutral grays with warm undertone
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },

      // Custom spacing values for precise layouts
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Modern font stack with fallbacks
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },

      // Modern box shadows
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        medium: '0 4px 25px -3px rgba(0, 0, 0, 0.1), 0 12px 30px -4px rgba(0, 0, 0, 0.08)',
        glow: '0 0 15px rgba(99, 102, 241, 0.3)',
        'glow-accent': '0 0 15px rgba(6, 182, 212, 0.3)',
      },

      // Smooth animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },

      // Keyframes for animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // Modern border radius
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },

  // Plugins - Extend Tailwind's functionality
  plugins: [
    // Add Tailwind plugins here as needed
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}

export default config
