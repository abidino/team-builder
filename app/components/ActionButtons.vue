<template>
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
      @click="$emit('buildTeams')"
      variant="success"
      icon="users"
      class="flex-shrink-0"
    >
      <span class="hidden sm:inline">Build Teams</span>
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
</template>

<script setup lang="ts">
interface Props {
  showBuildTeams?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

interface Emits {
  (e: "addPlayer"): void;
  (e: "buildTeams"): void;
  (e: "editPlayer"): void;
  (e: "deletePlayer"): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
