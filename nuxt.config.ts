import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    hfApiKey: process.env.NUXT_HF_API_KEY,
    openrouterApiKey: process.env.NUXT_OPENROUTER_API_KEY,
    aimlapiApiKey: process.env.NUXT_AIMLAPI_API_KEY,
    ollamaUrl: process.env.NUXT_OLLAMA_URL,
    public: {
      // Public keys that can be exposed to client-side
    },
  },

  components: [
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
