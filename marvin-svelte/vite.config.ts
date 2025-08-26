import devtoolsJson from 'vite-plugin-devtools-json';
import commonjs from 'vite-plugin-commonjs';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), devtoolsJson(), commonjs()],
	optimizeDeps: {
		include: ['@chemaxon/marvin']
	},
	build: {
		commonjsOptions: { transformMixedEsModules: true }
	}
});
