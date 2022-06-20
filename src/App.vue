<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Day from './components/Day.vue'
import { ref } from 'vue';

let colorDay = ref('.neutral');
let count = 0;

function toggleColor() {

  let colors = ['neutral', 'parent1', 'parent2'];

  function cycleArray(){
    let index = count % colors.length;
    console.log("index " + index);
    colorDay.value = colors[index];

    count++;

    console.log(colorDay.value);
    console.log("count"+ count);
  }
  cycleArray();
};


</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <h1>Calendrier</h1>
    <template v-for="(day, index) in 31">
      <Day :day-number="index+1"/>
    </template>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



</style>
