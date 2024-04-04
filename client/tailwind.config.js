/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'loginbackground': "url('https://ik.imagekit.io/Uptrip/CoverPhoto.jpg?updatedAt=1711371962548')",
        'homepagegairport': "url('https://ik.imagekit.io/Uptrip/airport.jpg?updatedAt=1712246856385')",
        'homepagehotel': "url('https://ik.imagekit.io/Uptrip/hotel.jpg?updatedAt=1712238990585')",
      }
    },
  },
  plugins: [require("daisyui")],

    // daisyUI config (optional - here are the default values)
    daisyui: {
      themes: ["light"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
      base: true, // applies background color and foreground color for root element by default
      styled: true, // include daisyUI colors and design decisions for all components
      utils: true, // adds responsive and modifier utility classes
      prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
      logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
      themeRoot: ":root", // The element that receives theme color CSS variables
    },
}

