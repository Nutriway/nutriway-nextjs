const { mauve, red, blackA, violet } = require("@radix-ui/colors");

/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                ...mauve,
                ...violet,
                ...red,
                ...blackA
            },
            keyframes: {
                overlayShow: {
                    from: { opacity: 0 },
                    to: { opacity: 1 }
                },
                contentShow: {
                    from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
                    to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" }
                }
            }
        }
    },
    plugins: []
};
