import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: [],
      },
    },
    optimizeDeps: {
      include: ["read-excel-file"],
    },
  },

  nitro: {
    preset: "vercel",
    esbuild: {
      options: {
        target: "es2020",
      },
    },
  },
});
