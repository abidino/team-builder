<template>
  <div class="space-y-3">
    <label
      v-if="label"
      :for="selectId"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <select
      :id="selectId"
      :required="required"
      :disabled="disabled"
      :class="selectClasses"
      :value="modelValue"
      @change="handleChange"
      v-bind="$attrs"
    >
      <option value="" v-if="placeholder">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from "vue";

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  options: Option[];
}

interface Emits {
  (e: "update:modelValue", value: string | number): void;
  (e: "change", event: Event): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectId = useId();

const selectClasses = computed(() =>
  [
    "w-full px-3 py-2 border rounded-lg transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-1",
    props.error
      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    props.disabled
      ? "bg-gray-100 cursor-not-allowed"
      : "bg-white hover:border-gray-400",
  ].join(" ")
);

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
  emit("change", event);
};
</script>
