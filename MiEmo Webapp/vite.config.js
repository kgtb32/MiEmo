import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		exclude: ['mock'],
	},
	server: {
		port: 3000,
	},
	build: {
		chunkSizeWarningLimit: '800',
	},
})
