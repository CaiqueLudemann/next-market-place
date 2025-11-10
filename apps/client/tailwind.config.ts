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
      // Custom colors for your marketplace brand
      colors: {
        // You can add brand colors here
        // primary: '#your-color',
        // secondary: '#your-color',
      },

      // Custom spacing values
      spacing: {
        // Add custom spacing if needed
      },

      // Custom font families
      fontFamily: {
        // sans: ['Your Font', 'system-ui', 'sans-serif'],
      },

      // Custom breakpoints (optional - defaults are usually fine)
      screens: {
        // '3xl': '1920px',
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
