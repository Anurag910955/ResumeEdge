import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  extend: {
  animation: {
    'waving-hand': 'wave 2s infinite'
  },
  keyframes: {
    wave: {
      '0%': { transform: 'rotate( 0.0deg)' },
      '10%': { transform: 'rotate(14.0deg)' },
      '20%': { transform: 'rotate(-8.0deg)' },
      '30%': { transform: 'rotate(14.0deg)' },
      '40%': { transform: 'rotate(-4.0deg)' },
      '50%': { transform: 'rotate(10.0deg)' },
      '60%': { transform: 'rotate( 0.0deg)' },
      '100%': { transform: 'rotate( 0.0deg)' }
    }
  }
}

})
