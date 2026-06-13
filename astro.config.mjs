// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from 'tailwindcss';

// https://astro.build/config
export default defineConfig({
  site: 'https://fanxxxks.github.io',
  integrations: [react()],
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
  },
});
