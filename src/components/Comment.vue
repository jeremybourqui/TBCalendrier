<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({
  dayId: Number,
  monthNumber: Number,
  dayNumber: Number,
  state: String,
  hasActivity: Boolean,
  comment: String,
});

const { dayId } = toRefs(props);
const { dayNumber } = toRefs(props);
const { state } = toRefs(props);
const { monthNumber } = toRefs(props);
const { hasActivity } = toRefs(props);
const { comment } = toRefs(props);

const emit = defineEmits(["stateChange"]);




</script>

<template>
  <p>{{ dayNumber }}.{{ monthNumber }} {{ comment }}</p>
</template>

<style scoped></style>
