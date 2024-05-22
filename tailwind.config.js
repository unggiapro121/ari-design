/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html,css,scss,sass}'],
  presets: [require('./tailwind.preset.config.js')],
  prefix: 'ads-', // we use a prefix here to ensure compiled styles don't collide with projects consuming
  plugins: [],
};
