<template>
  <div class="text-center">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
      {{ title }}
    </h1>
    <p v-if="subtitle" class="text-lg md:text-xl text-gray-600">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}

defineProps<Props>();
</script>
