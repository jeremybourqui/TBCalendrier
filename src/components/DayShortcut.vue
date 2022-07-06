<script setup>
  import {
    ref,
    toRefs
  } from 'vue';

  const props = defineProps({
    dayNumber: String,
    monthNumber: String,
    selectedParent: Number
  });

  const { dayNumber } = toRefs(props);
  const { monthNumber } = toRefs(props);
  let { selectedParent } = toRefs(props);

  let colorDay = ref('neutral');

  const emit = defineEmits(['stateChange']);

  function toggleColor() {

    console.log(`initial parent ${selectedParent.value}`);
    console.log(`initial color ${colorDay.value}`);

    //si neutre, conflit= parent selectionné
    if (colorDay.value === 'neutral') {
      if (selectedParent.value === 1) {
        colorDay.value = 'parent1';
        emit('stateChange', 'parent1', dayNumber, monthNumber);
      } else if (selectedParent.value === 2) {
        colorDay.value = 'parent2';
        emit('stateChange', 'parent2', dayNumber, monthNumber);
      }
    } else if (colorDay.value === 'parent1' && selectedParent.value === 2) {
      colorDay.value = 'conflict';
      emit('stateChange', 'conflict', dayNumber, monthNumber);
    } else if (colorDay.value === 'parent2' && selectedParent.value === 1) {
      colorDay.value = 'conflict';
      emit('stateChange', 'conflict', dayNumber, monthNumber);
    } else if (colorDay.value === 'conflict') {
      colorDay.value = 'neutral';
      emit('stateChange', 'neutral', dayNumber, monthNumber);
    }

  };
</script>

<template>

  <div :class="colorDay" class="day" @click="toggleColor()">
    <p>{{ dayNumber }}</p>
  </div>

</template>

<style scoped>
  .day {
    height: 100px;
    width: 100px;
    border: 1px solid black;
    background-color: #DADADA;

  }

  .neutral {
    background-color: #DADADA;
  }

  .parent1 {
    background-color: #2698D8;
  }

  .parent2 {
    background-color: #D82626;
  }

  .conflict {
    background-color: #ebfc30;
  }
</style>