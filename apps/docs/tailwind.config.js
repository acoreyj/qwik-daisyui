const { join } = require('path');
const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../../libs/daisyui/src/**/*.{js,ts,jsx,tsx,mdx}'),
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: [
        'Geologica',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
  },
  plugins: [require('daisyui'), addDynamicIconSelectors()],
  darkMode: 'class',
  daisyui: {
    themes: [
      {
        'qb-light': {
          primary: '#0000ff',
          secondary: '#18b6f6',
          accent: '#ac7ef4',
          neutral: '#e2e8f0',
          'base-100': '#f1f5f9',
          info: '#00efff',
          success: '#00aa00',
          warning: '#cb7c00',
          error: '#ff5474',
        },
        'qb-dark': {
          primary: '#0000ff',
          secondary: '#18b6f6',
          accent: '#ac7ef4',
          neutral: '#1e293b',
          'base-100': '#0f172a',
          info: '#00efff',
          success: '#00aa00',
          warning: '#cb7c00',
          error: '#ff5474',
        },
      },
    ],
  },
};
