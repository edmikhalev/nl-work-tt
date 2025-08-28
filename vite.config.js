import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
	base: '/nl-work-tt/',
	plugins: [vue()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	build: {
		outDir: 'dist', // Output directory
		rollupOptions: {
			input: resolve(__dirname, 'index.html'), // Entry point for the build
		},
	},
	server: {
		port: 8080,
	},
});
