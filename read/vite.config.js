import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'read',
  plugins: [react()],
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: 'read/index.html', 
    },
  },
});