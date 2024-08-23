import { defineConfig } from 'vite';
import { cwd } from 'node:process';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const getBase = () => {
    if (env.mode === 'github') return '/guess-game';

    return './';
  };

  return {
    plugins: [],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    publicDir: 'public',
    envPrefix: 'KATH_',
    outDir: 'dist',
    envDir: cwd(),
    server: {
      open: true,
      port: 4096,
      host: '0.0.0.0',
    },
    base: getBase(),
    build: {
      chunkSizeWarningLimit: 700,
      sourcemap: true,
      assetsDir: '.',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: 'index.html',
        },
      },
    },
  };
});
