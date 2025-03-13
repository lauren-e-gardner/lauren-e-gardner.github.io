import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl';


// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.gltf", "**/*.glb"],
  define: {
    "process.env.PUBLIC_URL": JSON.stringify(""),
  },
  // base: '/lauren-e-gardner.github.io/', // Set this to match your GitHub Pages repo name
  plugins: [
    react(),
    tailwindcss(),
    glsl(),
  ],
})
