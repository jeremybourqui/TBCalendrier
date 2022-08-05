<script setup>

import { ref, toRefs, watch } from "vue";


const props = defineProps({
  neutralDay: Number,
  parent1Day: Number,
  parent2Day: Number,
  conflict: Number,
  shared: Number,
});

// console.log(props);

// let { neutralDay } = toRefs(props);
// let { parent1Day } = toRefs(props);
// let { parent2Day } = toRefs(props);
// let { conflict } = toRefs(props);
// let { shared } = toRefs(props);

// console.log(parent1Day.value);

// let parent1Day2 = ref(0);
// parent1Day2.value = parent1Day.value;

// parent1Day2.value = 3;

// for (let i = 0; i < localStorage.length; i++) {
//     let key = localStorage.key(i);
//     let value = localStorage.getItem(key);
//     let obj = JSON.parse(value);
//     // console.log(obj);
//     switch (obj.state) {
//       case "neutral":
//         neutralDay.value++;
//         break;
//       case "parent1":
//         parent1Day2.value++;
//         break;
//       case "parent2":
//         parent2Day.value++;
//         break;
//       case "conflict":
//         conflictDay.value++;
//         break;
//       case "shared":
//         shared.value++;
//         break;
//       default:
//         break;
//     };
//   };

// console.log(parent1Day2.value);

// let storedState = localStorage.getItem(
//   `year.months[${monthNumber.value}].days[${dayNumber.value}]`
// );
// let jsonState = JSON.parse(storedState);
// if (jsonState !== null) {
//   console.log(jsonState.comment);
//   colorDay.value = jsonState.state;
//   textComment.value = jsonState.comment;
  // emit(
  //   "stateChange",
  //   state,
  //   dayId,
  //   dayNumber,
  //   monthNumber,
  //   showActivity.value,
  //   textComment.value
  // );
  // console.log("jsonStateactivity"+ jsonState.activity);
  // if (typeof jsonState.activity == "undefined") {
    // showActivity.value = false;
    // console.log("undefined log");
  // } else {
    // showActivity.value = jsonState.activity;
    // console.log("defined log");
  // }
  // hasActivity.value = jsonState.hasActivity;
  // console.log("jsont "+jsonState.activity);
  // console.log("hasactivity "+hasActivity.value);
// }

</script>

<template>
  <div class="count">
      <template v-for="(n, i) in parent1Day" :key="i">
          <div class="count-item parent1"></div>
      </template>
        <!-- <template v-for="(n, i) in neutralDay" :key="i">
            <div class="count-item neutral"></div>
        </template> -->
        <template v-for="(n, i) in shared" :key="i">
            <div class="count-item shared"></div>
        </template>
        <template v-for="(n, i) in conflict" :key="i">
            <div class="count-item conflict"></div>
        </template>
        <template v-for="(n, i) in parent2Day" :key="i">
            <div class="count-item parent2"></div>
        </template>
        
    </div>
</template>

<style scoped>
.count {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px 0 10px 0;
    width: 800px;
  }

  .count-item {
    width: 15px;
    height: 30px;
    border: 1px solid var(--gray-dark);
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

  .shared {
    background-color: #15b039;
    background: linear-gradient(60deg, #2698D8 50%, #D82626 50%);
  }
</style>

