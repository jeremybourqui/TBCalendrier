<script setup>
  import {
    ref
  } from 'vue';
  import Count from './components/Count.vue';
  import DayShortcut from './components/DayShortcut.vue';
  import { year } from './assets/year.js';
  import { year_fr_enfantine_primaire_co } from './assets/year_fr_enfantine_primaire_co.js';

  let selectedParent = ref(1);
  let selectedYear = ref(year);

  let neutralDay = ref(31);
  let parent1Day = ref(0);
  let parent2Day = ref(0);
  let conflict = ref(0);



  let print = () => window.print();
  

  let updateDayState = (newState, dayClicked, monthNumber) => {
    let day = dayClicked.value;
    let month = monthNumber.value;
    year.months[month].days[day].state = newState;
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
    neutralDay.value = countValuesInObj(year, 'neutral');
    parent1Day.value = countValuesInObj(year, 'parent1');
    parent2Day.value = countValuesInObj(year, 'parent2');
    conflict.value = countValuesInObj(year, 'conflict');
  }

  window.addEventListener('keydown', function (e) {
    if (e.code === 'Digit1') {
      selectedParent.value = 1;
    } else if (e.code === 'Digit2') {
      selectedParent.value = 2;
    }
  });
</script>

<template>
    <div class="header">
      <select v-model="selectedYear">
        <option :value="year">Aucune</option>
        <option :value="year_fr_enfantine_primaire_co">Enfantine, primaire, CO</option>
      </select>
      <p>Jour non attribué : {{ neutralDay }} </p>
      <p class="parent1" @click="selectParent(1)"> Jour parent 1 : {{ parent1Day }} </p>
      <p class="parent2" @click="selectParent(2)"> Jour parent 2 : {{ parent2Day }} </p>
      <p> Conflit : {{ conflict }} </p>
      <button class="print" @click="print()">Imprimer</button>
    </div>
    <Count :neutral-day="neutralDay" :parent1-day="parent1Day" :parent2-day="parent2Day" :conflict="conflict" />
  <template v-for="(month, indexMonth) in selectedYear.months">
    <div class="month">
      <p> {{ selectedYear.months[indexMonth].name }}</p>
      <template v-for="(day, indexDay) in selectedYear.months[indexMonth].days">
        <div>
          <DayShortcut :day-number="parseInt(indexDay)" :month-number="parseInt(indexMonth)" :selected-parent="selectedParent" :is-holiday="selectedYear.months[indexMonth].days[indexDay].holiday" @state-change="updateDayState" />
        </div>
      </template>
    </div>
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
    background-color: #2698D8;
  }

  .parent2 {
    background-color: #D82626;
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