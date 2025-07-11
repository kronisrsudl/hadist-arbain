import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Hadis Arbain An-Nawawi',
        short_name: 'Hadis Arbain',
        description: 'Kumpulan 42 hadis Arbain An-Nawawi',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/android/android-launchericon-48-48.png',
            type: 'image/png',
            sizes: '48x48'
          },
          {
            src: '/android/android-launchericon-72-72.png',
            type: 'image/png',
            sizes: '72x72'
          },
          {
            src: '/android/android-launchericon-96-96.png',
            type: 'image/png',
            sizes: '96x96'
          },
          {
            src: '/android/android-launchericon-144-144.png',
            type: 'image/png',
            sizes: '144x144'
          },
          {
            src: '/android/android-launchericon-192-192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/android/android-launchericon-512-512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
      },
    }),
  ],
})
