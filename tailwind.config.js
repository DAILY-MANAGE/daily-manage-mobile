/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../src/app/_layout.tsx",
    "../src/app/**/_layout.tsx",
    "../src/app/**/*.tsx",
    "../src/app/**/**/_layout.tsx",
    "../src/app/**/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
