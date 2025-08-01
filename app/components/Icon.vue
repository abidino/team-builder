<template>
  <svg
    :class="className"
    :width="size"
    :height="size"
    :viewBox="iconViewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="iconPath"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  name: string;
  size?: string | number;
  className?: string;
  stroke?: string;
  strokeWidth?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  className: "",
  stroke: "currentColor",
  strokeWidth: 2,
});

const icons = {
  plus: {
    viewBox: "0 0 24 24",
    path: "M12 5v14m-7-7h14",
  },
  users: {
    viewBox: "0 0 24 24",
    path: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
  },
  edit: {
    viewBox: "0 0 24 24",
    path: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  },
  trash: {
    viewBox: "0 0 24 24",
    path: "M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6",
  },
  x: {
    viewBox: "0 0 24 24",
    path: "M18 6 6 18M6 6l12 12",
  },
  upload: {
    viewBox: "0 0 24 24",
    path: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  },
  download: {
    viewBox: "0 0 24 24",
    path: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  },
  file: {
    viewBox: "0 0 24 24",
    path: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  },
  github: {
    viewBox: "0 0 24 24",
    path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  },
  "volume-2": {
    viewBox: "0 0 24 24",
    path: "M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14",
  },
  "volume-x": {
    viewBox: "0 0 24 24",
    path: "M11 5L6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6",
  },
};

const iconData = computed(
  () => icons[props.name as keyof typeof icons] || icons.plus
);
const iconViewBox = computed(() => iconData.value.viewBox);
const iconPath = computed(() => iconData.value.path);
</script>
