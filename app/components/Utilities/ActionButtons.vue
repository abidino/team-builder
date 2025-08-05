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
      >
        <span class="hidden sm:inline"
          >Build Teams{{ aiEnabled ? " with AI" : "" }}</span
        >
        <span class="sm:hidden">Build</span>
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

    <!-- AI Toggle -->
    <div v-if="showBuildTeams" class="flex items-center gap-3">
      <label class="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          :checked="aiEnabled"
          @change="toggleAI"
          class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        Build teams with AI
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  showBuildTeams?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

interface Emits {
  (e: "addPlayer"): void;
  (e: "buildTeams", useAI: boolean): void;
  (e: "editPlayer"): void;
  (e: "deletePlayer"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const aiEnabled = ref(false);

const toggleAI = (event: Event) => {
  const target = event.target as HTMLInputElement;
  aiEnabled.value = target.checked;
};

const handleBuildTeams = () => {
  emit("buildTeams", aiEnabled.value);
};
</script>
