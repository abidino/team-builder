<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- GitHub Issues Link & Audio Control -->
    <div class="absolute top-4 right-4 z-10 flex items-center gap-2 sm:gap-3">
      <!-- Audio Control Button -->
      <button
        @click="toggleMute"
        class="inline-flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 hover:text-gray-900 w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-lg shadow-sm transition-all duration-200 border border-gray-200/50"
        :title="isMuted ? 'Enable Sound' : 'Disable Sound'"
      >
        <Icon :name="isMuted ? 'volume-x' : 'volume-2'" class="w-4 h-4" />
      </button>

      <!-- GitHub Issues Link -->
      <a
        href="https://github.com/abidino/team-builder/issues"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-700 hover:text-gray-900 w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-lg shadow-sm transition-all duration-200 border border-gray-200/50"
        :title="'Report Issue'"
      >
        <Icon name="github" class="w-4 h-4" />
        <span class="hidden sm:inline text-sm font-medium ml-2"
          >Report Issue</span
        >
      </a>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Header Section -->
      <PageHeader
        title="Team Builder"
        subtitle="Create balanced teams with ease"
        class="mb-8 mt-16 sm:mt-8"
      />

      <!-- Main Content -->
      <div class="grid gap-8">
        <!-- Player Management Section -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <SectionHeader
            title="Player Management"
            description="Add players and manage their stats"
            class="mb-6"
          />

          <PlayerManagement
            :players="players"
            :selected-player="selectedPlayer"
            @update:players="players = $event"
            @update:selected-player="selectedPlayer = $event"
            @build-teams="handleBuildTeams"
          />
        </div>

        <!-- Teams Display Section -->
        <div v-if="teams.length > 0" class="bg-white rounded-xl shadow-lg p-6">
          <SectionHeader
            title="Generated Teams"
            description="Balanced teams based on player strengths"
            class="mb-6"
          />

          <TeamDisplay :teams="teams" />
        </div>
      </div>
    </div>

    <!-- Modal for Teams -->
    <TeamModal
      :visible="showTeamsModal"
      :teams="teams"
      @update:visible="handleModalVisibilityChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { Player, Team } from "~/types";
import { TeamBuilderService } from "~/services";

// Page Meta
useHead({
  title: "Team Builder - Create Balanced Teams",
  meta: [
    {
      name: "description",
      content: "Create balanced teams with our intelligent team builder tool",
    },
  ],
});

// Reactive Data
const players = ref<Player[]>([]);
const teams = ref<Team[]>([]);
const selectedPlayer = ref<string>("");
const showTeamsModal = ref(false);
const backgroundAudio = ref<HTMLAudioElement | null>(null);
const isMuted = ref(false);

// Audio Management
const playBackgroundSound = () => {
  if (process.client && !isMuted.value) {
    try {
      backgroundAudio.value = new Audio("/cl-sound.wav");
      backgroundAudio.value.loop = true;
      backgroundAudio.value.volume = 0.3; // 30% volume
      backgroundAudio.value.play().catch((error) => {
        console.log("Audio play failed:", error);
      });
    } catch (error) {
      console.log("Audio initialization failed:", error);
    }
  }
};

const stopBackgroundSound = () => {
  if (backgroundAudio.value) {
    backgroundAudio.value.pause();
    backgroundAudio.value.currentTime = 0;
    backgroundAudio.value = null;
  }
};

const toggleMute = () => {
  isMuted.value = !isMuted.value;
  if (isMuted.value && backgroundAudio.value) {
    stopBackgroundSound();
  }
};

// Methods
const handleBuildTeams = () => {
  if (players.value.length >= 10 && players.value.length % 2 === 0) {
    teams.value = TeamBuilderService.buildTeams(players.value);
    showTeamsModal.value = true;
    playBackgroundSound(); // Start audio when modal opens
  }
};

const handleCloseTeamsModal = () => {
  showTeamsModal.value = false;
  stopBackgroundSound(); // Stop audio when modal closes
};

const handleModalVisibilityChange = (visible: boolean) => {
  showTeamsModal.value = visible;
  if (!visible) {
    stopBackgroundSound(); // Stop audio when modal is closed
  }
};

// Cleanup on unmount
onUnmounted(() => {
  stopBackgroundSound();
});
</script>
