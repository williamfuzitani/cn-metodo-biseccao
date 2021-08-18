<template>
  <div class="flex items-center">
    <input
      name="x5"
      class="
        w-16
        h-8
        px-1
        text-sm
        rounded
        focus:ring-indigo-500
        focus:border-indigo-500
        text-gray-500
      "
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
    <label for="x5" class="mx-1 font-semibold">{{ label }}</label>
  </div>
</template>

<script setup>
const props = defineProps({
  value: [String, Number],
  label: String,
});

const emit = defineEmits(["update:value"]);
</script>