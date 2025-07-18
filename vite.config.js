import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
const BACKEND_URL = process.env.VITE_API_URL || 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 🔥 Proxy API calls to the backend
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false
      },
      // 🔥 Proxy uploads to backend static handler
      '/uploads': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: '../backend/public', // ✅ Build React into backend/public for fullstack deploy
    emptyOutDir: true            // ✅ Clear folder before each build
  }
});
