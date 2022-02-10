module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@themesberg/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('@themesberg/flowbite/plugin')],
  darkMode: 'class',
};
