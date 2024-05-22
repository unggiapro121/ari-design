/* eslint-disable no-console */
import path from 'node:path';

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

import withVisualizer from './plugins/visualizer';

const visualizer = withVisualizer({ enabled: process.env.ANALYZE === 'true' });

// Chosen when using `--mode library`
const libraryConfig = defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src'),
      name: 'ADS',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'dayjs',
        '@contentstack/json-rte-serializer',
        'html-react-parser',
      ],
    },
  },
  css: {
    modules: {
      generateScopedName: '[name]_[local]__[hash:base64:5]',
    },
    postcss: {
      plugins: [autoprefixer(), tailwindcss(), require('postcss-nested')],
    },
  },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy'],
        },
      },
    }),
    dts({ insertTypesEntry: true }),
    visualizer(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'vite.setup.ts',
  },
});

// Generally used for regular builds (AKA Storybook)
const defaultConfig = defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy'],
        },
      },
    }),
  ],
  css: {
    modules: {
      generateScopedName: '[name]_[local]__[hash:base64:5]',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'vite.setup.ts',
    coverage: {
      provider: 'istanbul',
    },
  },
});

export default defineConfig((config) => {
  if (config.command === 'build' && config.mode === 'library') {
    console.info('INFO: Building in library mode with library config!');

    return { ...libraryConfig };
  } else return { ...defaultConfig };
});
