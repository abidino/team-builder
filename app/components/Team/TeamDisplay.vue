<template>
  <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
    <TeamCard v-for="team in teams" :key="team.name" :team="team" />
  </div>
</template>

<script setup lang="ts">
import { Team } from "~/types";

interface Props {
  teams: Team[];
}

defineProps<Props>();
</script>
