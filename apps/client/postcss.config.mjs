/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Tailwind CSS v4 - Utility-first CSS framework (using new PostCSS plugin)
    '@tailwindcss/postcss': {},

    // Autoprefixer - Automatically adds vendor prefixes to CSS
    autoprefixer: {},
  },
}

export default config
