<script setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
  dayNumber: String
});

const { dayNumber } = toRefs(props);

let colorDay = ref('.neutral');
let count = 0;

const emit = defineEmits(['stateChange']);

// function someEvent() {
//   emit('submit')
// }

function toggleColor() {

  let colors = ['parent1', 'parent2', 'neutral'];

  function cycleArray(){
    let index = count % colors.length;
    // console.log("index " + index);
    colorDay.value = colors[index];

    //emit la valeur
    emit('stateChange', colors[index], dayNumber);

    count++;

    // console.log(colorDay.value);
    // console.log("count"+ count);
  }
  cycleArray();
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
}

.neutral {
  background-color: white;
}

.parent1 {
  background-color: green;
}

.parent2 {
  background-color: blue;
}
</style>
