<template>
  <div class="space-y-4">
    <!-- Main Action Buttons -->
    <div class="flex flex-wrap gap-2 md:gap-4">
      <BaseButton
        @click="$emit('addPlayer')"
        variant="primary"
        icon="plus"
        class="flex-shrink-0"
      >
        <span class="hidden sm:inline">Add Player</span>
        <span class="sm:hidden">Add</span>
      </BaseButton>

      <BaseButton
        v-if="showBuildTeams"
        @click="handleBuildTeams"
        variant="success"
        icon="users"
        class="flex-shrink-0"
        :disabled="isBuilding"
      >
        <div v-if="isBuilding" class="flex items-center gap-2">
          <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class="hidden sm:inline">{{
            aiEnabled ? "AI Building Teams..." : "Building Teams..."
          }}</span>
          <span class="sm:hidden">Building...</span>
        </div>
        <div v-else>
          <span class="hidden sm:inline"
            >Build Teams{{ aiEnabled ? " with AI" : "" }}</span
          >
          <span class="sm:hidden">Build</span>
        </div>
      </BaseButton>

      <BaseButton
        v-if="showEdit"
        @click="$emit('editPlayer')"
        variant="warning"
        icon="edit"
        class="flex-shrink-0"
      >
        <span class="hidden sm:inline">Edit Player</span>
        <span class="sm:hidden">Edit</span>
      </BaseButton>

      <BaseButton
        v-if="showDelete"
        @click="$emit('deletePlayer')"
        variant="danger"
        icon="trash"
        class="flex-shrink-0"
      >
        <span class="hidden sm:inline">Delete Player</span>
        <span class="sm:hidden">Delete</span>
      </BaseButton>
    </div>

    <!-- AI Toggle & Provider Selection -->
    <div v-if="showBuildTeams" class="space-y-3">
      <label
        class="flex items-center gap-2 text-sm text-gray-600"
        :class="{ 'opacity-50': isBuilding }"
      >
        <input
          type="checkbox"
          :checked="aiEnabled"
          @change="toggleAI"
          :disabled="isBuilding"
          class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
        />
        Build teams with AI
      </label>

      <!-- AI Provider Selection -->
      <div
        v-if="aiEnabled"
        class="ml-6 flex items-center gap-3"
        :class="{ 'opacity-50': isBuilding }"
      >
        <label class="text-sm text-gray-600 font-medium">Provider:</label>
        <select
          v-model="selectedProvider"
          :disabled="isBuilding"
          class="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="openrouter">OpenRouter (Mistral-7B)</option>
          <option value="aimlapi">AIML API (Gemma-3-4B)</option>
          <!-- Future providers will be added here -->
          <!-- <option value="deepseek">DeepSeek</option> -->
          <!-- <option value="chatgpt">ChatGPT</option> -->
          <!-- <option value="gemini">Gemini</option> -->
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  showBuildTeams?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  isBuilding?: boolean;
}

interface Emits {
  (e: "addPlayer"): void;
  (e: "buildTeams", useAI: boolean, provider?: string): void;
  (e: "editPlayer"): void;
  (e: "deletePlayer"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const aiEnabled = ref(false);
const selectedProvider = ref("openrouter");

const toggleAI = (event: Event) => {
  const target = event.target as HTMLInputElement;
  aiEnabled.value = target.checked;
};

const handleBuildTeams = () => {
  emit(
    "buildTeams",
    aiEnabled.value,
    aiEnabled.value ? selectedProvider.value : undefined
  );
};
</script>
