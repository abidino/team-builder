<template>
  <div
    class="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-50"
  >
    <!-- Player Info -->
    <div class="flex items-center space-x-3">
      <!-- Avatar -->
      <div
        class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm"
      >
        {{ playerInitials }}
      </div>

      <!-- Details -->
      <div>
        <div class="font-medium text-gray-900">{{ player.name }}</div>
        <div class="text-sm text-gray-500">
          {{ player.preferredPosition || "No Position" }}
        </div>
      </div>
    </div>

    <!-- Strength -->
    <div class="text-right">
      <PlayerStrengthBadge :strength="player.strength" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Player } from "~/types";

interface Props {
  player: Player;
}

const props = defineProps<Props>();

const playerInitials = computed(() => {
  return props.player.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});
</script>
