/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        falu_red: {
          DEFAULT: '#6f1d1b',
          100: '#160605',
          200: '#2c0b0b',
          300: '#431110',
          400: '#591715',
          500: '#6f1d1b',
          600: '#ab2c29',
          700: '#d34d4b',
          800: '#e28987',
          900: '#f0c4c3'
        },
        lion: {
          DEFAULT: '#bb9457',
          100: '#271e10',
          200: '#4e3c20',
          300: '#755b30',
          400: '#9c7940',
          500: '#bb9457',
          600: '#c9aa7a',
          700: '#d6c09b',
          800: '#e4d5bc',
          900: '#f1eade'
        },
        bistre: {
          DEFAULT: '#432818',
          100: '#0d0805',
          200: '#1b100a',
          300: '#28180f',
          400: '#362013',
          500: '#432818',
          600: '#814d2e',
          700: '#bd7247',
          800: '#d3a184',
          900: '#e9d0c2'
        },
        brown: {
          DEFAULT: '#99582a',
          100: '#1e1208',
          200: '#3d2311',
          300: '#5b3519',
          400: '#7a4621',
          500: '#99582a',
          600: '#c97538',
          700: '#d6976a',
          800: '#e4ba9c',
          900: '#f1dccd'
        },
        peach: {
          DEFAULT: '#ffe6a7',
          100: '#553d00',
          200: '#a97900',
          300: '#feb600',
          400: '#ffce54',
          500: '#ffe6a7',
          600: '#ffebba',
          700: '#fff0cb',
          800: '#fff5dc',
          900: '#fffaee'
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}