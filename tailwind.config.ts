/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',   // Tailwind default for small screens (sm)
        md: '768px',   // Medium screens (md) for tablets and smaller desktops
        lg: '1024px',  // Large screens (lg) for laptops and desktops
        xl: '1280px',  // Extra-large screens (xl) for large desktop views
      },
      colors: {
        'custom-blue-right': '#6054FF',
        'custom-blue-left': '#459AFF',
        'button-text-clr':'#ffffff',
        'letter-theme-clr':'#334155',
        'whats-message-bord':'rgb(152 255 190)',
        'text-theme':'#53565a'
      },
      fontSize: {
        'xs': '.75rem', // 12px
        'sm': '.875rem', // 14px
        'base': '1rem', // 16px
        'lg': '1.125rem', // 18px
        'xl': '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '4rem', // 64px
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
      },
    },
  },
  plugins: [],
};

