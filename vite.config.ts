import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'dev-server-rewrite',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const urlChunks = (req.url || '').split('?');
            const path = urlChunks[0];
            const search = urlChunks.length > 1 ? `?${urlChunks[1]}` : '';

            if (path === '/a') {
              res.statusCode = 301;
              res.setHeader('Location', `/a/${search}`);
              res.end();
              return;
            } else if (path === '/s') {
              res.statusCode = 301;
              res.setHeader('Location', `/s/${search}`);
              res.end();
              return;
            } else if (path === '/statistics') {
              res.statusCode = 301;
              res.setHeader('Location', `/statistics/${search}`);
              res.end();
              return;
            } else if (path === '/a/') {
              req.url = `/a/index.html${search}`;
            } else if (path === '/s/') {
              req.url = `/s/index.html${search}`;
            } else if (path === '/statistics/') {
              req.url = `/statistics/index.html${search}`;
            }
            next();
          });
        }
      }
    ],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          a: path.resolve(__dirname, 'a/index.html'),
          s: path.resolve(__dirname, 's/index.html'),
          statistics: path.resolve(__dirname, 'statistics/index.html'),
        },
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
