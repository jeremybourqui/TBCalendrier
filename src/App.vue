<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Day from './components/Day.vue'
import { ref } from 'vue';

let colorDay = ref('.neutral');
let count = 0;

let week = {
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
};

let neutralDay = ref();
let parent1Day = ref();
let parent2Day = ref();

let updateDayState = (newState, dayClicked) => {
  let day = dayClicked.value;
  
  console.log(newState +" "+ dayClicked.value);
  // console.log(week[day]);
  week[day].state = newState;

  watchDayState();

};

let watchDayState = () => {

    let countValuesInObj = function(obj, value) {
      let count = 0;
      for ( const property in obj ) {
     
        if( typeof obj[property] === 'object') {
          count = count + countValuesInObj(obj[property], value);
        } 
     
        if(obj[property] === value ) {
          return 1; // count = count + 1; // count++;
        }
      }
      return count;
    };

    console.log(countValuesInObj(week, 'neutral'));
    neutralDay = countValuesInObj(week, 'neutral');

    console.log(countValuesInObj(week, 'parent1')); 
    parent1Day = countValuesInObj(week, 'parent1');

    console.log(countValuesInObj(week, 'parent2'));
    parent2Day = countValuesInObj(week, 'parent2');
}


</script>

<template>

  <h1>Calendrier</h1>
    <div class="month">
      <template v-for="(day, index) in week">
        <div>
          <Day :day-number="index" @state-change="updateDayState"/>
        </div>
      </template>
    </div>

    <div>
      <p> {{ neutralDay }}</p>
    </div>



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
