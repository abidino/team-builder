<template>
  <div class="space-y-3">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :min="min"
      :max="max"
      :step="step"
      :class="inputClasses"
      :value="modelValue"
      @input="handleInput"
      @change="handleChange"
      @blur="handleBlur"
      v-bind="$attrs"
    />

    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from "vue";

interface Props {
  modelValue?: string | number;
  type?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

interface Emits {
  (e: "update:modelValue", value: string | number): void;
  (e: "input", event: Event): void;
  (e: "change", event: Event): void;
  (e: "blur", event: Event): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

const emit = defineEmits<Emits>();

const inputId = useId();

const inputClasses = computed(() =>
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

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = props.type === "number" ? Number(target.value) : target.value;
  emit("update:modelValue", value);
  emit("input", event);
};

const handleChange = (event: Event) => {
  emit("change", event);
};

const handleBlur = (event: Event) => {
  emit("blur", event);
};
</script>
