<template>
  <BaseModal
    :visible="visible"
    :title="modalTitle"
    size="md"
    @update:visible="$emit('update:visible', $event)"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Tabs for Add Mode -->
      <div v-if="mode === 'add'" class="mb-4">
        <div class="flex border-b border-gray-200">
          <button
            type="button"
            @click="activeTab = 'single'"
            :class="tabClasses('single')"
          >
            Single Player
          </button>
          <button
            type="button"
            @click="activeTab = 'excel'"
            :class="tabClasses('excel')"
          >
            Excel Import
          </button>
        </div>
      </div>

      <!-- Single Player Form -->
      <div v-if="mode === 'edit' || activeTab === 'single'">
        <div class="space-y-4">
          <BaseInput
            v-model="form.name"
            label="Player Name"
            placeholder="Enter player name"
            required
          />

          <BaseInput
            v-model.number="form.strength"
            type="number"
            label="Strength"
            placeholder="Enter strength (0.00-10.00)"
            min="0"
            max="10"
            step="0.01"
            required
            @input="validateStrength"
          />

          <BaseSelect
            v-model="form.position"
            label="Position"
            placeholder="Select a position"
            :options="positionOptions"
          />
        </div>
      </div>

      <!-- Excel Import -->
      <div v-else-if="activeTab === 'excel'">
        <ExcelImport @import="handleExcelImport" />
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <BaseButton type="button" variant="secondary" @click="handleCancel">
          Cancel
        </BaseButton>

        <BaseButton
          v-if="mode === 'edit' || activeTab === 'single'"
          type="submit"
          variant="primary"
          :disabled="!isFormValid"
        >
          {{ mode === "edit" ? "Update" : "Add" }} Player
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Player, Position } from "~/types";

interface Props {
  visible: boolean;
  mode: "add" | "edit";
  player?: Player | null;
}

interface Emits {
  (e: "update:visible", visible: boolean): void;
  (e: "save", player: Player): void;
  (e: "import", players: Player[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Reactive data
const activeTab = ref<"single" | "excel">("single");
const form = ref({
  name: "",
  strength: 0,
  position: "",
});

// Computed
const modalTitle = computed(() =>
  props.mode === "edit" ? "Edit Player" : "Add Player"
);

const positionOptions = computed(() =>
  Object.values(Position).map((pos) => ({ value: pos, label: pos }))
);

const isFormValid = computed(
  () =>
    form.value.name.trim() &&
    form.value.strength >= 0 &&
    form.value.strength <= 10
);

const tabClasses = (tab: string) => [
  "px-4 py-2 font-medium text-sm transition-colors",
  activeTab.value === tab
    ? "border-b-2 border-blue-500 text-blue-600"
    : "text-gray-500 hover:text-gray-700",
];

// Watchers
watch(
  () => props.visible,
  (newVal) => {
    if (newVal && props.mode === "edit" && props.player) {
      form.value = {
        name: props.player.name,
        strength: props.player.strength,
        position: props.player.preferredPosition || "",
      };
    } else if (newVal && props.mode === "add") {
      resetForm();
    }
  }
);

// Methods
const resetForm = () => {
  form.value = {
    name: "",
    strength: 0,
    position: "",
  };
  activeTab.value = "single";
};

const validateStrength = () => {
  if (form.value.strength > 10) form.value.strength = 10;
  if (form.value.strength < 0) form.value.strength = 0;

  // Round to 2 decimal places
  form.value.strength = Math.round(form.value.strength * 100) / 100;
};

const handleSubmit = () => {
  if (!isFormValid.value) return;

  let player: Player;

  if (props.mode === "edit" && props.player) {
    // Edit mode: preserve the existing player's ID
    player = new Player(
      form.value.name.trim(),
      form.value.strength,
      (form.value.position as Position) || undefined,
      props.player.id
    );
  } else {
    // Add mode: create new player with new ID
    player = new Player(
      form.value.name.trim(),
      form.value.strength,
      (form.value.position as Position) || undefined
    );
  }

  emit("save", player);
  emit("update:visible", false);
};

const handleCancel = () => {
  emit("update:visible", false);
  resetForm();
};

const handleExcelImport = (players: Player[]) => {
  emit("import", players);
  emit("update:visible", false);
};
</script>
