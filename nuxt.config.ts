// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  components: {
    dirs: [
      "~/components/Base",
      "~/components/UI",
      "~/components/Player",
      "~/components/Team",
      "~/components/Utilities",
    ],
  },

  ssr: true,

  debug: process.env.NODE_ENV === "development",

  experimental: {
    payloadExtraction: false,
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
    experimental: {
      wasm: true,
    },
  },

  build: {
    transpile: [],
  },
});
