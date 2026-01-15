// https://github.com/vitejs/vite/discussions/3448
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  // https://github.com/jpuri/react-draft-wysiwyg/issues/1317
  const env = loadEnv(mode, process.cwd(), '');
  const BASE_NAME = env.VITE_APP_BASE_NAME || '/';
  const PORT = 3060;

  return {
    server: {
      open: false,
      port: PORT,
      host: '0.0.0.0',
      strictPort: true,
      hmr: env.REPLIT_DEV_DOMAIN ? {
        protocol: 'wss',
        host: env.REPLIT_DEV_DOMAIN,
        clientPort: 443
      } : true,
      cors: true
    },
    preview: {
      open: false,
      host: '0.0.0.0',
      port: PORT
    },
    define: {
      global: 'window'
    },
    resolve: {
      alias: [
        {
          find: /^~(.+)/,
          replacement: path.join(process.cwd(), 'node_modules/$1')
        },
        {
          find: /^src(.+)/,
          replacement: path.join(process.cwd(), 'src/$1')
        }
      ]
    },
    base: BASE_NAME,
    plugins: [react(), tsconfigPaths()]
  };
});
