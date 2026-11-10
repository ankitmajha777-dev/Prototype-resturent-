import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'serve-raw-static-css',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url ? req.url.split('?')[0] : '';
            if (url === '/css/style.css') {
              res.setHeader('Content-Type', 'text/css; charset=utf-8');
              const fs = require('fs');
              const cssPath = path.resolve(__dirname, 'css/style.css');
              res.end(fs.readFileSync(cssPath, 'utf-8'));
              return;
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    base: './',
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          menu: path.resolve(__dirname, 'menu.html'),
          experience: path.resolve(__dirname, 'experience.html'),
          privateDining: path.resolve(__dirname, 'private-dining.html'),
          gallery: path.resolve(__dirname, 'gallery.html'),
          reservations: path.resolve(__dirname, 'reservations.html'),
          story: path.resolve(__dirname, 'story.html'),
          contact: path.resolve(__dirname, 'contact.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
