<template>
  <div class="space-y-6">
    <!-- Action Buttons -->
    <ActionButtons
      :show-build-teams="canBuildTeams"
      :show-delete="!!selectedPlayer"
      :show-edit="!!selectedPlayer"
      @add-player="showAddModal = true"
      @build-teams="$emit('buildTeams')"
      @delete-player="handleDeletePlayer"
      @edit-player="handleEditPlayer"
    />

    <!-- Players Table -->
    <PlayersTable
      :players="players"
      :selected-player="selectedPlayer"
      @update:selected-player="$emit('update:selectedPlayer', $event)"
    />

    <!-- Add Player Modal -->
    <PlayerModal
      :visible="showAddModal"
      mode="add"
      @update:visible="showAddModal = $event"
      @save="handleAddPlayer"
      @import="handleImportPlayers"
    />

    <!-- Edit Player Modal -->
    <PlayerModal
      :visible="showEditModal"
      mode="edit"
      :player="editingPlayer"
      @update:visible="showEditModal = $event"
      @save="handleEditSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Player } from "~/types";

interface Props {
  players: Player[];
  selectedPlayer: string;
}

interface Emits {
  (e: "update:players", players: Player[]): void;
  (e: "update:selectedPlayer", player: string): void;
  (e: "buildTeams"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Reactive data
const showAddModal = ref(false);
const showEditModal = ref(false);
const editingPlayer = ref<Player | null>(null);

// Computed
const canBuildTeams = computed(
  () => props.players.length >= 10 && props.players.length % 2 === 0
);

// Methods
const handleAddPlayer = (player: Player) => {
  const updatedPlayers = [...props.players, player];
  emit("update:players", updatedPlayers);
  showAddModal.value = false;
};

const handleImportPlayers = (players: Player[]) => {
  const updatedPlayers = [...props.players, ...players];
  emit("update:players", updatedPlayers);
  showAddModal.value = false;
};

const handleDeletePlayer = () => {
  const updatedPlayers = props.players.filter(
    (p) => p.id !== props.selectedPlayer
  );
  emit("update:players", updatedPlayers);
  emit("update:selectedPlayer", "");
};

const handleEditPlayer = () => {
  editingPlayer.value =
    props.players.find((p) => p.id === props.selectedPlayer) || null;

  if (editingPlayer.value) {
    showEditModal.value = true;
  }
};

const handleEditSave = (updatedPlayer: Player) => {
  const playerIndex = props.players.findIndex(
    (p) => p.id === props.selectedPlayer
  );

  if (playerIndex !== -1) {
    const updatedPlayers = [...props.players];
    updatedPlayers[playerIndex] = updatedPlayer;
    emit("update:players", updatedPlayers);
    emit("update:selectedPlayer", updatedPlayer.id);
  }

  showEditModal.value = false;
  editingPlayer.value = null;
};
</script>
