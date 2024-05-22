/**
 * This is a global config that can be imported into any project that uses Tailwind CSS.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      mobile: '600px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1280px',
    },
    colors: {
      primary: 'var(--ampol-blue)',
      'ampol-red': 'var(--ampol-red)',
      'ampol-red-60': 'var(--ampol-red-60)',
      'ampol-red-30': 'var(--ampol-red-30)',
      'ampol-red-10': 'var(--ampol-red-10)',
      'ampol-red-hover': 'var(--ampol-red-hover)',
      'ampol-blue': 'var(--ampol-blue)',
      'ampol-blue-60': 'var(--ampol-blue-60)',
      'ampol-blue-30': 'var(--ampol-blue-30)',
      'ampol-blue-10': 'var(--ampol-blue-10)',
      'ampol-blue-hover': 'var(--ampol-blue-hover)',
      'ampol-black': 'var(--ampol-black)',
      'ampol-black-60': 'var(--ampol-black-60)',
      'ampol-black-30': 'var(--ampol-black-30)',
      'ampol-black-20': 'var(--ampol-black-20)',
      'ampol-black-10': 'var(--ampol-black-10)',
      'ampol-black-hover': 'var(--ampol-black-hover)',
      'ampol-cobalt': 'var(--ampol-cobalt)',
      'ampol-cobalt-hover': 'var(--ampol-cobalt-hover)',
      'black-solid': 'var(--black-solid)',
      'light-grey': 'var(--light-grey)',
      white: 'var(--white)',
      'blue-active': 'var(--blue-active)',
      'background-light': 'var(--background-light)',
      accent: 'var(--accent)',
      transparent: 'transparent',
    },
    spacing: {
      xxs: 'var(--spacing-xxs)',
      xs: 'var(--spacing-xs)',
      s: 'var(--spacing-s)',
      m: 'var(--spacing-m)',
      l: 'var(--spacing-l)',
      xl: 'var(--spacing-xl)',
    },
  },
};
