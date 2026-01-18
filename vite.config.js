import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  base: './',  // Use relative paths for assets
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    copyPublicDir: true,
  },
  publicDir: 'assets',
  server: {
    open: true,
    port: 3000,
  },
});
