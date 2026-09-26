import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Chemins relatifs obligatoires : l'hébergement Power Apps sert l'app depuis
  // un sous-chemin, des chemins absolus (/assets/...) y donnent des 404.
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
})
