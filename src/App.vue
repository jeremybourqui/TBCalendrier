<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Day from './components/Day.vue'
import { ref } from 'vue';

let colorDay = ref('.neutral');
let count = 0;

let week = ref({
  monday: {
    state: 'neutral'
  },
  tuesday: {
    state: 'neutral'
  },
  wednesday: {
    state: 'neutral'
  },
  thursday: {
    state: 'neutral'
  },
  friday: {
    state: 'neutral'
  },
  saturday: {
    state: 'parent1'
  },
  sunday: {
    state: 'parent2'
  }, 
});


let updateDayState = (day) => {
  console.log(day.state+"sdf");
};

//listen to la valeur du day

</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <h1>Calendrier</h1>
    <div class="month">
      <template v-for="(day, index) in week">
        <div @click="updateDayState(day)">
          <Day :day-number="index" />
        </div>
      </template>
    </div>

    <p>{{week.friday.state}}</p>

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

.month {
  display: flex;
  flex-direction: row;
}


</style>
