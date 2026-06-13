// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from 'tailwindcss';

// https://astro.build/config
// ASTRO_BASE env var: set to '/bigfive-test/' for GitHub Pages, empty for local dev
export default defineConfig({
  site: 'https://fanxxxks.github.io',
  base: process.env.ASTRO_BASE || '/',
  integrations: [react()],
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
  },
});
