import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'ui.js',
                chunkFileNames: 'ui.js',
                assetFileNames: 'ui.[ext]',
                manualChunks: undefined,
            }
        }
    }
});
