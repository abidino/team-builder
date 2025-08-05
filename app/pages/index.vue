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
            :is-building="isBuilding"
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

    <!-- Error Modal -->
    <div
      v-if="showErrorModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <!-- Close Button -->
        <button
          @click="showErrorModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <Icon name="x" class="w-6 h-6" />
        </button>

        <!-- Error Content -->
        <div class="pr-8">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"
            >
              <Icon name="alert-triangle" class="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                AI Provider Error
              </h3>
              <p class="text-sm text-gray-600">
                {{ errorProvider }} failed to build teams
              </p>
            </div>
          </div>

          <div class="mb-6">
            <p class="text-sm text-gray-700 leading-relaxed">
              {{ errorMessage }}
            </p>
          </div>

          <div class="flex gap-3 justify-end">
            <BaseButton
              @click="showErrorModal = false"
              variant="secondary"
              class="px-4 py-2"
            >
              Close
            </BaseButton>
            <BaseButton
              @click="retryWithNormalBuilder"
              variant="primary"
              class="px-4 py-2"
            >
              Use Normal Builder
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { Player, Team } from "~/types";
import { TeamBuilderService, AITeamBuilderService } from "~/services";

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
const isBuilding = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref("");
const errorProvider = ref("");

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
const handleBuildTeams = async (useAI: boolean, provider?: string) => {
  if (players.value.length >= 10 && players.value.length % 2 === 0) {
    isBuilding.value = true;
    try {
      if (useAI && provider) {
        console.log(`🤖 Using AI team builder with ${provider}...`);
        teams.value = await AITeamBuilderService.buildTeams(
          players.value,
          provider
        );
        console.log(`✅ AI team builder (${provider}) succeeded!`);
      } else {
        console.log("⚡ Using normal team builder...");
        teams.value = TeamBuilderService.buildTeams(players.value);
        console.log("✅ Normal team builder succeeded!");
      }

      // Success - show teams modal
      showTeamsModal.value = true;
      playBackgroundSound();
    } catch (error) {
      console.log(
        `❌ Team building failed with ${provider || "normal"}:`,
        error
      );

      if (useAI && provider) {
        // AI failed - show error modal
        errorProvider.value = provider;
        errorMessage.value =
          error instanceof Error ? error.message : "Unknown AI error";
        showErrorModal.value = true;
      } else {
        // Normal team builder failed - this shouldn't happen, but fallback
        console.error("Critical error: Normal team builder failed");
        errorProvider.value = "Normal";
        errorMessage.value = "Unexpected error in team building";
        showErrorModal.value = true;
      }
    } finally {
      isBuilding.value = false;
    }
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

const retryWithNormalBuilder = async () => {
  showErrorModal.value = false;
  await handleBuildTeams(false); // Use normal team builder
};

// Cleanup on unmount
onUnmounted(() => {
  stopBackgroundSound();
});
</script>
