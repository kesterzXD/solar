import { builtinModules } from 'module'
import path from 'path'
import { defineConfig } from 'vite'

import pkg from '../../package.json'

export default defineConfig({
  root: __dirname,
  base: './',
  publicDir: './aftercare',
  resolve: {
    alias: {
      '@main': path.join(__dirname, 'utils'),
      '@common': path.join(__dirname, '../common'),
      '@type': path.join(__dirname, '../types'),
    },
  },
  build: {
    outDir: '../../dist/main',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    minify: process.env.NODE_ENV === 'production',
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron', ...builtinModules, ...Object.keys(pkg.dependencies || {}), 'koffi'],
    },
  },
})
