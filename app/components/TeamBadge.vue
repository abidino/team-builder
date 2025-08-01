<template>
  <span
    :class="badgeClasses"
    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
  >
    {{ teamColor }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Team } from "~/types";

interface Props {
  team: Team;
}

const props = defineProps<Props>();

const teamAverage = computed(() => {
  if (props.team.members.length === 0) return 0;
  const result = props.team.totalMemberStrength / props.team.members.length;
  return Math.round(result * 100) / 100;
});

const teamColor = computed(() => {
  const avg = teamAverage.value;
  if (avg >= 7) return "Gold";
  if (avg >= 5) return "Silver";
  return "Bronze";
});

const badgeClasses = computed(() => {
  switch (teamColor.value) {
    case "Gold":
      return "bg-yellow-100 text-yellow-800";
    case "Silver":
      return "bg-gray-100 text-gray-800";
    case "Bronze":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
});
</script>
