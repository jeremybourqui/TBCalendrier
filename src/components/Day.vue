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

  let colors = ['parent1', 'parent2', 'conflict', 'neutral'];

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
  background-color: #DADADA;

}

.neutral {
  background-color: #DADADA;
}

.parent1 {
  background-color: #26D882;
}

.parent2 {
  background-color: #2698D8;
}

.conflict {
  background-color: #D82626;
}

</style>
