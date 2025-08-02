<template>
  <div>
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
      {{ title }}
    </h2>
    <p v-if="description" class="text-gray-600">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();
</script>
