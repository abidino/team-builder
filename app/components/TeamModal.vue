<template>
  <BaseModal
    :visible="visible"
    title="Generated Teams"
    size="xl"
    @update:visible="$emit('update:visible', $event)"
  >
    <TeamDisplay :teams="teams" />

    <div class="flex justify-center mt-6">
      <BaseButton variant="secondary" @click="$emit('update:visible', false)">
        Close
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { Team } from "~/types";

interface Props {
  visible: boolean;
  teams: Team[];
}

interface Emits {
  (e: "update:visible", visible: boolean): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
