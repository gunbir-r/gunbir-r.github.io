import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Use relative base so built asset paths work reliably on GitHub Pages
  base: '',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
