import { defineConfig } from 'vite';
import { cpSync } from 'fs';
import { resolve } from 'path';

// Root-level files copied verbatim into the build output
const staticFiles = ['ai.txt', 'llms.txt', 'robots.txt', '.well-known'];

const copyStaticFiles = () => ({
  name: 'copy-static-files',
  apply: 'build',
  writeBundle(options) {
    for (const file of staticFiles) {
      cpSync(resolve(__dirname, file), resolve(options.dir, file), { recursive: true });
    }
  },
});

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
    copyStaticFiles()
  ],
  server: {
    open: true,
    port: 3000,
  },
});
