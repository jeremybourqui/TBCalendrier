<script setup>
  import {
    ref,
    toRefs
  } from 'vue';

  const props = defineProps({
    dayNumber: Number,
    monthNumber: Number,
    selectedParent: Number,
    isHoliday: Boolean,
    isDisplayed: Boolean,
  });

  const { dayNumber } = toRefs(props);
  const { monthNumber } = toRefs(props);
  let { selectedParent } = toRefs(props);
  let { isHoliday } = toRefs(props);
  let { isDisplayed } = toRefs(props);

  let colorDay = ref('neutral');

  const emit = defineEmits(['stateChange']);


  function toggleColor() {
    console.log(isDisplayed.value);

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
  <template v-if="isDisplayed === false">
  <div class="blank"></div>
  </template>
  <template v-else-if="isHoliday">
    <div :class="colorDay" class="day holiday" @click="toggleColor()">
      <p>{{ dayNumber }}</p>
    </div>
  </template>
  <template v-else>
    <div :class="colorDay" class="day" @click="toggleColor()">
      <p>{{ dayNumber }}</p>
    </div>
  </template>

</template>

<style scoped>
  .day {
    /* height: 100px;
    width: 100px; */
    display: inline-block;
    border: 1px solid black;
    background-color: #DADADA;
    place-self: center;
    align-self: stretch;
    justify-self: stretch;

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

  .holiday {
    border-color: #47115a;
    border-width: 5px;
  }

  .blank {
    visibility: hidden;
  }
</style>