<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <Icon v-if="icon" :name="icon" class="w-4 h-4" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  icon?: string;
  tag?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  tag: "button",
});

const buttonClasses = computed(() => {
  const baseClasses = [
    "inline-flex items-center justify-center gap-2",
    "font-medium rounded-lg transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ];

  // Size classes
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary: [
      "bg-blue-500 hover:bg-blue-600 text-white",
      "focus:ring-blue-500 active:bg-blue-700",
    ],
    secondary: [
      "bg-gray-200 hover:bg-gray-300 text-gray-700",
      "focus:ring-gray-500 active:bg-gray-400",
    ],
    success: [
      "bg-green-500 hover:bg-green-600 text-white",
      "focus:ring-green-500 active:bg-green-700",
    ],
    warning: [
      "bg-yellow-500 hover:bg-yellow-600 text-white",
      "focus:ring-yellow-500 active:bg-yellow-700",
    ],
    danger: [
      "bg-red-500 hover:bg-red-600 text-white",
      "focus:ring-red-500 active:bg-red-700",
    ],
  };

  return [
    ...baseClasses,
    sizeClasses[props.size],
    ...variantClasses[props.variant],
  ].join(" ");
});
</script>
