<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
  import HelloWorld from './components/HelloWorld.vue'
  import Day from './components/Day.vue'
  import {
    ref
  } from 'vue';
  import Count from './components/Count.vue';

  let week = {
    1: {
      state: 'neutral'
    },
    2: {
      state: 'neutral'
    },
    3: {
      state: 'neutral'
    },
    4: {
      state: 'neutral'
    },
    5: {
      state: 'neutral'
    },
    6: {
      state: 'neutral'
    },
    7: {
      state: 'neutral'
    },
    8: {
      state: 'neutral'
    },
    9: {
      state: 'neutral'
    },
    10: {
      state: 'neutral'
    },
    11: {
      state: 'neutral'
    },
    12: {
      state: 'neutral'
    },
    13: {
      state: 'neutral'
    },
    14: {
      state: 'neutral'
    },
    15: {
      state: 'neutral'
    },
    16: {
      state: 'neutral'
    },
    17: {
      state: 'neutral'
    },
    18: {
      state: 'neutral'
    },
    19: {
      state: 'neutral'
    },
    20: {
      state: 'neutral'
    },
    21: {
      state: 'neutral'
    },
    22: {
      state: 'neutral'
    },
    23: {
      state: 'neutral'
    },
    24: {
      state: 'neutral'
    },
    25: {
      state: 'neutral'
    },
    26: {
      state: 'neutral'
    },
    27: {
      state: 'neutral'
    },
    28: {
      state: 'neutral'
    },
    29: {
      state: 'neutral'
    },
    30: {
      state: 'neutral'
    },
    31: {
      state: 'neutral'
    },
  };

  let neutralDay = ref(31);
  let parent1Day = ref(0);
  let parent2Day = ref(0);
  let conflict = ref(0);

  function print() {
    window.print();
  }

  let updateDayState = (newState, dayClicked) => {
    let day = dayClicked.value;

    console.log(newState + " " + dayClicked.value);
    // console.log(week[day]);
    week[day].state = newState;

    watchDayState();

  };

  let watchDayState = () => {

    let countValuesInObj = (obj, value) => {
      let count = 0;
      for (const property in obj) {

        if (typeof obj[property] === 'object') {
          count = count + countValuesInObj(obj[property], value);
        }

        if (obj[property] === value) {
          return 1; // count = count + 1; // count++;
        }
      }
      return count;
    };

    neutralDay.value = countValuesInObj(week, 'neutral');
    parent1Day.value = countValuesInObj(week, 'parent1');
    parent2Day.value = countValuesInObj(week, 'parent2');
    conflict.value = countValuesInObj(week, 'conflict');

  }
</script>

<template>

  <div class="header">
    <p>Jour non attribué : {{ neutralDay }} </p>
    <p class="parent1"> Jour parent 1 : {{ parent1Day }} </p>
    <p class="parent2"> Jour parent 2 : {{ parent2Day }} </p>
    <p> Conflit : {{ conflict }} </p>
    <button class="print" @click="print()"> Imprimer</button>
  </div>
  <Count :neutral-day="neutralDay" :parent1-day="parent1Day" :parent2-day="parent2Day" :conflict="conflict" />
  <div class="month">
    <template v-for="(day, index) in week">
      <div>
        <Day :day-number="index" @state-change="updateDayState" />
      </div>
    </template>
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
    flex-wrap: wrap;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .parent1 {
    background-color: #26D882;
  }

  .parent2 {
    background-color: #2698D8;
  }

  @media print {

    * {
      color-adjust: exact !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .print {
      visibility: hidden;
    }

  }
</style>