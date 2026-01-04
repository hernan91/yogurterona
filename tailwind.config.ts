import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-green': '#059669',
        'text-primary': '#374151',
        'text-secondary': '#6b7280',
      },
    },
  },
  plugins: [],
}
export default config
