<template>
  <div
    class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
  >
    <!-- Desktop Table -->
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="w-12 px-4 py-3 text-left"></th>
            <th class="px-4 py-3 text-left font-medium text-gray-900">
              Player
            </th>
            <th class="px-4 py-3 text-left font-medium text-gray-900">
              Strength
            </th>
            <th class="px-4 py-3 text-left font-medium text-gray-900">
              Position
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="player in players"
            :key="player.id"
            class="hover:bg-gray-50 transition-colors"
            :class="{ 'bg-blue-50': selectedPlayer === player.id }"
          >
            <td class="px-4 py-3">
              <input
                type="radio"
                :value="player.id"
                :checked="selectedPlayer === player.id"
                @change="$emit('update:selectedPlayer', player.id)"
                class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
            </td>
            <td class="px-4 py-3 font-medium text-gray-900">
              {{ player.name }}
            </td>
            <td class="px-4 py-3">
              <PlayerStrengthBadge :strength="player.strength" />
            </td>
            <td class="px-4 py-3 text-gray-600">
              {{ player.preferredPosition || "Not Set" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-3 p-4">
      <div
        v-for="player in players"
        :key="player.id"
        class="bg-gray-50 rounded-lg p-4 transition-all"
        :class="{
          'ring-2 ring-blue-500 bg-blue-50': selectedPlayer === player.id,
        }"
        @click="$emit('update:selectedPlayer', player.id)"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <input
              type="radio"
              :value="player.id"
              :checked="selectedPlayer === player.id"
              @change="$emit('update:selectedPlayer', player.id)"
              class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              @click.stop
            />
            <span class="font-medium text-gray-900">{{ player.name }}</span>
          </div>
          <PlayerStrengthBadge :strength="player.strength" />
        </div>

        <div class="text-sm text-gray-600">
          <span class="font-medium">Position:</span>
          {{ player.preferredPosition || "Not Set" }}
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="players.length === 0" class="p-12 text-center">
      <div class="text-gray-400 mb-4">
        <Icon name="users" class="w-12 h-12 mx-auto" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No players yet</h3>
      <p class="text-gray-600">Add your first player to get started</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Player } from "~/types";

interface Props {
  players: Player[];
  selectedPlayer: string;
}

interface Emits {
  (e: "update:selectedPlayer", player: string): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
