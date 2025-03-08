import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  base: '/lauren-e-gardner.github.io/', // Set this to match your GitHub Pages repo name
  plugins: [
    react(),
    tailwindcss(),
  ],
})
