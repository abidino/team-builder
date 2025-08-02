// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  ssr: false,

  components: {
    dirs: [
      {
        path: "~/components/Base",
        prefix: "Base",
      },
      {
        path: "~/components/UI",
        prefix: "",
      },
      {
        path: "~/components/Player",
        prefix: "",
      },
      {
        path: "~/components/Team",
        prefix: "",
      },
      {
        path: "~/components/Utilities",
        prefix: "",
      },
    ],
  },

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
