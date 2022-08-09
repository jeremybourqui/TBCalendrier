<script setup>
import { ref, toRefs, watch } from "vue";

const props = defineProps({
  neutralDay: Number,
  parent1Day: Number,
  parent2Day: Number,
  conflict: Number,
  shared: Number,
});
</script>

<template>
  <div class="count">
    <template v-for="(n, i) in parent1Day" :key="i">
      <div class="count-item parent1"></div>
    </template>
    <template v-for="(n, i) in shared" :key="i">
      <div class="count-item shared"></div>
    </template>
    <template v-for="(n, i) in conflict" :key="i">
      <div class="count-item conflict"></div>
    </template>
    <template v-for="(n, i) in parent2Day" :key="i">
      <div class="count-item parent2"></div>
    </template>
  </div>
</template>

<style scoped>
.count {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px 0 10px 0;
  width: 800px;
}

.count-item {
  width: 15px;
  height: 30px;
  border: 1px solid var(--color-gray-dark);
}

.neutral {
  background-color: #dadada;
}

.parent1 {
  background-color: #2698d8;
}

.parent2 {
  background-color: #d82626;
}

.conflict {
  background-color: #ebfc30;
}

.shared {
  background-color: #15b039;
  background: linear-gradient(60deg, #2698d8 50%, #d82626 50%);
}
</style>
