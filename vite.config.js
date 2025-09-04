import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: "Trip App",
                short_name: "Trip",
                start_url: ".",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#42b883",
                icons: [
                    // { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
                    // { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
                ]
            }
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
