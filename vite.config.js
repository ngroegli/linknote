import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'src',
  base: './',  // Use relative paths for assets
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    copyPublicDir: true,
  },
  publicDir: 'assets',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: '../ai.txt',
          dest: '.'
        },
        {
          src: '../llms.txt',
          dest: '.'
        },
        {
          src: '../robots.txt',
          dest: '.'
        },
        {
          src: '../.well-known',
          dest: '.'
        }
      ]
    })
  ],
  server: {
    open: true,
    port: 3000,
  },
});
