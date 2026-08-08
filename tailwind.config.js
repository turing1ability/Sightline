/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171B26',
        'ink-soft': '#1F2433',
        'ink-line': '#2B3247',
        amber: '#E8A33D',
        'amber-bright': '#F2B658',
        coral: '#F0665B',
        paper: '#F5F1E8',
        mist: '#9BA3B7'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Manrope', 'sans-serif']
      },
      keyframes: {
        iris: {
          '0%': { transform: 'scale(1)', opacity: '0.9' },
          '100%': { transform: 'scale(2.4)', opacity: '0' }
        },
        pulseRing: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' }
        }
      },
      animation: {
        iris: 'iris 1.4s cubic-bezier(0.2,0.6,0.3,1) infinite',
        pulseRing: 'pulseRing 1.8s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
