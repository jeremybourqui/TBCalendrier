<script setup>
import { ref } from 'vue';

defineProps({
  dayNumber: String
})

let colorDay = ref('.neutral');
let count = 0;

function toggleColor() {

  let colors = ['neutral', 'parent1', 'parent2'];

  function cycleArray(){
    let index = count % colors.length;
    // console.log("index " + index);
    colorDay.value = colors[index];

    //emit la valeur

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
