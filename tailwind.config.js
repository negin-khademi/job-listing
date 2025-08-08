/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        greens: {
          50: "hsl(180, 52%, 96%)",
          400: "hsl(180, 29%, 50%)",
          900: "hsl(180, 14%, 20%)",
        },
        grays: {
          400: "hsl(180, 8%, 52%)",
        },
      },
    },
  },
  plugins: [],
};
