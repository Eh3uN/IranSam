import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative URLs keep this one-page site portable across GitHub repository names.
  base: './',
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
  },
});
