import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './lib/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'radial-glow': 'radial-gradient(circle at 20% 40%, rgba(85, 217, 217, 0.08), #070c26 60%)',
            },
            borderRadius: {
                lg: '1rem',
                xl: '1.5rem',
            },
            boxShadow: {
                soft: '0 4px 30px rgba(0, 0, 0, 0.1)',
                neon: '0 0 10px rgba(0, 240, 255, 0.6)',
            },
            colors: {
                background: '#070C26',
                surface: '#0E1540',
                primary: '#0540F2',
                accent: '#55D9D9',
                highlight: '#CEF249',
                foreground: '#FFFFFF',
                muted: '#cfd8dc',
            },

            fontFamily: {
                sans: ['var(--font-poppins)', 'var(--font-quicksand)', 'var(--font-montserrat)', 'var(--font-lato)', 'sans-serif'],
                heading: 'var(--font-montserrat), sans-serif',
                body: 'var(--font-poppins), sans-serif',
                clean: 'var(--font-dmsans), sans-serif',
                alt: 'var(--font-lato), sans-serif',
            },
            animation: {
                'pulse-slow': 'pulse 3s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}

export default config
