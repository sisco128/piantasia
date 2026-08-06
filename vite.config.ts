import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Same-origin /api calls in dev, mirroring the vercel.json rewrite.
      // Set API_PROXY_TARGET=http://localhost:3000 to test a local piantapi.
      '/api': {
        target: process.env.API_PROXY_TARGET || 'https://piantapi.vercel.app',
        changeOrigin: true,
      },
    },
  },
})
