/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html',
    './src/**/*.{vue, js, ts, jsx, tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'soko': {
          '50': '#dff2f5',
          '100': '#bfe5eb',
          '200': '#9fd8e1',
          '300': '#7ecbd7',
          '400': '#5dbece',
          '500': '#59baca',
          '600': '#4fa9b8',
          '700': '#4498a6',
          '800': '#398794',
          '900': '#2e7682',
        }

      },
      fontFamily: {
        'poppins': ['Poppins Regular', 'Ubuntu', 'sans-serif'],
        'poppins-light': ['Poppins Light', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-medium': ['Poppins Medium', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-bold': ['Poppins Bold', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-extra-light': ['Poppins Extralight', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-thin': ['Poppins Thin', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-semi-bold': ['Poppins Semibold', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-extra-bold': ['Poppins Extrabold', 'Ubuntu', 'san-serif', 'serif']
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['bumblebee', 'dark', 'emerald', 'forest', 'lofi', 'synthwave', 'retro', 'cyberpunk', 'halloween', 'valentine', 'garden', 'forest', 'dracula', 'corporate', 'winter', 'wireframe', 'black'],
  },
}

