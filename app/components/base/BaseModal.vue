<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>

        <!-- Modal Content -->
        <div
          :class="modalClasses"
          class="relative bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200"
          >
            <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
            <button
              @click="$emit('update:visible', false)"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="x" class="w-6 h-6" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-6">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  visible: boolean;
  title: string;
  size?: "sm" | "md" | "lg" | "xl";
  closable?: boolean;
}

interface Emits {
  (e: "update:visible", visible: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  closable: true,
});

const emit = defineEmits<Emits>();

const modalClasses = computed(() => {
  const sizeClasses = {
    sm: "w-full max-w-md",
    md: "w-full max-w-lg",
    lg: "w-full max-w-2xl",
    xl: "w-full max-w-4xl",
  };

  return sizeClasses[props.size];
});

const handleBackdropClick = () => {
  if (props.closable) {
    emit("update:visible", false);
  }
};
</script>
