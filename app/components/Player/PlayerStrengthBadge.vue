<template>
  <span
    :class="badgeClasses"
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
  >
    {{ strength.toFixed(2) }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Tier } from "~/types";

interface Props {
  strength: number;
}

const props = defineProps<Props>();

const tier = computed(() => {
  if (props.strength >= 8) return Tier.HIGH;
  if (props.strength >= 5) return Tier.MID;
  return Tier.LOW;
});

const badgeClasses = computed(() => {
  switch (tier.value) {
    case Tier.HIGH:
      return "bg-green-100 text-green-800";
    case Tier.MID:
      return "bg-yellow-100 text-yellow-800";
    case Tier.LOW:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
});
</script>
