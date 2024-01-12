/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://RashEstebek.github.io/interactive-card-details-form",
  plugins: [svelte()],
})
