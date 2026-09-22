import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the production build works from any static host
  // or repository sub-path (Vercel, Netlify, GitHub Pages).
  base: './',
})
