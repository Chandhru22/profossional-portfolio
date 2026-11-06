/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0d0e12',
        panel: '#1a1b20',
        card: '#1e1f24',
        raised: '#292a2e',
        ink: '#e3e2e8',
        muted: '#c7c4d7',
        cyan: '#2fd9f4',
        lilac: '#d0bcff',
        periwinkle: '#c0c1ff',
        violet: '#571bc1',
        indigo: '#8083ff',
        mint: '#34d399',
        'mint-soft': '#6ee7b7',
      },
      fontFamily: {
        sora: ['Sora', 'system-ui', 'sans-serif'],
        geist: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #8083ff 0%, #d0bcff 100%)',
        'brand-gradient-3': 'linear-gradient(90deg, #8083ff 0%, #571bc1 50%, #d0bcff 100%)',
      },
      boxShadow: {
        glow: '0 0 28px -4px rgba(128,131,255,0.45)',
      },
    },
  },
  plugins: [],
};
