<template>
  <div
    class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm border border-gray-200"
  >
    <!-- Team Header -->
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ team.name }}</h3>
      <div class="flex justify-center items-center gap-4">
        <TeamBadge :team="team" />
        <span class="text-sm text-gray-600">
          {{ team.members.length }} players
        </span>
      </div>
    </div>

    <!-- Players List -->
    <div class="space-y-3 mb-6">
      <PlayerCard
        v-for="player in sortedPlayersByPosition"
        :key="player.id"
        :player="player"
        class="bg-white shadow-sm"
      />
    </div>

    <!-- Team Stats -->
    <div class="border-t border-gray-200 pt-4">
      <div class="grid grid-cols-2 gap-4 text-center">
        <div>
          <div class="text-2xl font-bold text-gray-800">
            {{ teamAverage.toFixed(2) }}
          </div>
          <div class="text-sm text-gray-600">Average</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-gray-800">
            {{ team.totalMemberStrength.toFixed(2) }}
          </div>
          <div class="text-sm text-gray-600">Total</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Team, Position } from "~/types";

interface Props {
  team: Team;
}

const props = defineProps<Props>();

const teamAverage = computed(() => {
  if (props.team.members.length === 0) return 0;
  return props.team.totalMemberStrength / props.team.members.length;
});

// Pozisyon sıralaması: GK -> DEF -> MID -> FWD
const positionOrder = {
  [Position.Goalkeeper]: 1,
  [Position.Defender]: 2,
  [Position.Midfielder]: 3,
  [Position.Forward]: 4,
};

const sortedPlayersByPosition = computed(() => {
  return [...props.team.members].sort((a, b) => {
    const aOrder = positionOrder[a.preferredPosition as Position] || 5;
    const bOrder = positionOrder[b.preferredPosition as Position] || 5;
    return aOrder - bOrder;
  });
});
</script>
