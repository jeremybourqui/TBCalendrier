<script setup>
import { ref, toRefs, watch } from "vue";
import modal from "./Modal.vue";

const props = defineProps({
  dayNumber: Number,
  monthNumber: Number,
  selectedParent: Number,
  isHoliday: Boolean,
  isDisplayed: Boolean,
  state: String,
  clear: Boolean,
  showCommentModal: Boolean,
  hasActivity: Boolean,
  dayId: Number,
  comment: String,
});

let { hasActivity } = toRefs(props);
const { dayNumber } = toRefs(props);
const { monthNumber } = toRefs(props);
const { selectedParent } = toRefs(props);
const { isHoliday } = toRefs(props);
const { isDisplayed } = toRefs(props);
const { dayId } = toRefs(props);
let { state } = toRefs(props);
let { clear } = toRefs(props);
let { showCommentModal } = toRefs(props);
let { comment } = toRefs(props);

let colorDay = ref("");
let showActivity = ref(false);
const textComment = ref("");


let storedState = localStorage.getItem(
  `year.months[${monthNumber.value}].days[${dayNumber.value}]`
);
let jsonState = JSON.parse(storedState);
if (jsonState !== null) {
  // console.log(jsonState.comment);
  colorDay.value = jsonState.state;
  textComment.value = jsonState.comment;
  emit(
    "stateChange",
    state,
    dayId,
    dayNumber,
    monthNumber,
    false,
    textComment.value
  );
  // console.log("jsonStateactivity"+ jsonState.activity);
  if (typeof jsonState.activity == "undefined") {
    showActivity.value = false;
    // console.log("undefined log");
  } else {
    showActivity.value = jsonState.activity;
    // console.log("defined log");
  }
  // hasActivity.value = jsonState.hasActivity;
  // console.log("jsont "+jsonState.activity);
  // console.log("hasactivity "+hasActivity.value);
}

// console.log("text  "+textComment.value);

watch(
  () => props.clear,
  (clear, prevClear) => {
    clearDay();
    // localStorage.clear();
  }
);

let clearDay = () => {
  // localStorage.removeItem((`year.months[${monthNumber.value}].days[${dayNumber.value}]`));
  localStorage.clear();
  colorDay.value = "";
  showActivity.value = "";
  textComment.value = "";
  if (state.value != "neutral" || comment.value != "") {
    state.value = "neutral";
    emit(
      "stateChange",
      "neutral",
      dayId,
      dayNumber,
      monthNumber,
      showActivity.value,
      ""
    );
  }
  emit("resetClear");
};

const emit = defineEmits([
  "stateChange",
  "resetComment",
  "resetClear",
]);

let toggleColor = () => {
  console.log(comment.value);

  if (selectedParent.value === 1) {
    colorDay.value = "parent1";
    localStorage.setItem(
      `year.months[${monthNumber.value}].days[${dayNumber.value}]`,
      JSON.stringify({
        id: dayId.value,
        day: dayNumber.value,
        state: "parent1",
        holiday: isHoliday.value,
        activity: showActivity.value,
        comment: comment.value,
        displayed: true,
      })
    );
    emit(
      "stateChange",
      "parent1",
      dayId,
      dayNumber,
      monthNumber,
      showActivity.value,
      comment
    );
  } else if (selectedParent.value === 2) {
    colorDay.value = "parent2";
    emit(
      "stateChange",
      "parent2",
      dayId,
      dayNumber,
      monthNumber,
      showActivity.value,
      comment
    );
    localStorage.setItem(
      `year.months[${monthNumber.value}].days[${dayNumber.value}]`,
      JSON.stringify({
        id: dayId.value,
        day: dayNumber.value,
        state: "parent2",
        holiday: isHoliday.value,
        activity: showActivity.value,
        comment: comment.value,
        displayed: true,
      })
    );
  } else if (selectedParent.value === 4) {
    console.log("parent3");
    colorDay.value = "conflict";
    emit(
      "stateChange",
      "conflict",
      dayId,
      dayNumber,
      monthNumber,
      showActivity.value,
      comment
    );
    localStorage.setItem(
      `year.months[${monthNumber.value}].days[${dayNumber.value}]`,
      JSON.stringify({
        id: dayId.value,
        day: dayNumber.value,
        state: "conflict",
        holiday: isHoliday.value,
        activity: showActivity.value,
        comment: comment.value,
        displayed: true,
      })
    );
  } else if (selectedParent.value === 3) {
    colorDay.value = "shared";
    emit(
      "stateChange",
      "shared",
      dayId,
      dayNumber,
      monthNumber,
      showActivity.value,
      comment
    );
    localStorage.setItem(
      `year.months[${monthNumber.value}].days[${dayNumber.value}]`,
      JSON.stringify({
        id: dayId.value,
        day: dayNumber.value,
        state: "shared",
        holiday: isHoliday.value,
        activity: showActivity.value,
        comment: comment.value,
        displayed: true,
      })
    );
  } else if (selectedParent.value === 5) {
    colorDay.value = "neutral";
    emit(
      "stateChange",
      "neutral",
      dayId,
      dayNumber,
      monthNumber,
      showActivity.value,
      comment
    );
    localStorage.setItem(
      `year.months[${monthNumber.value}].days[${dayNumber.value}]`,
      JSON.stringify({
        id: dayId.value,
        day: dayNumber.value,
        state: "neutral",
        holiday: isHoliday.value,
        activity: showActivity.value,
        comment: comment.value,
        displayed: true,
      })
    );
  } 
  // else if (selectedParent.value === 6) {
  //   colorDay.value = "neutral";
  //   emit(
  //     "stateChange",
  //     "neutral",
  //     dayId,
  //     dayNumber,
  //     monthNumber,
  //     showActivity.value,
  //     comment
  //   );
  //   localStorage.setItem(
  //     `year.months[${monthNumber.value}].days[${dayNumber.value}]`,
  //     JSON.stringify({
  //       id: dayId.value,
  //       day: dayNumber.value,
  //       state: "neutral",
  //       holiday: isHoliday.value,
  //       activity: showActivity.value,
  //       comment: comment.value,
  //       displayed: true,
  //     })
  //   );
  // }
};

let modalComment = ref(false);

let addComment = () => {
  if (showCommentModal.value) {
    modalComment.value = true;
  }
};

let deleteComment = () => {
  // console.log("actiday " + activity.value);
  showActivity.value = false;
  textComment.value = "";
  // emit("saveComment", textComment);
  emit("stateChange", state, dayId, dayNumber, monthNumber, false, textComment);
  emit("resetComment");
  // console.log(`${state.value} ${dayNumber.value} ${monthNumber.value}`);
  localStorage.setItem(
    `year.months[${monthNumber.value}].days[${dayNumber.value}]`,
    JSON.stringify({
      id: dayId.value,
      day: dayNumber.value,
      state: state.value,
      holiday: true,
      activity: false,
      comment: textComment.value,
      displayed: true,
    })
  );
};

let saveComment = () => {
  showActivity.value = true;
  emit(
    "stateChange",
    state,
    dayId,
    dayNumber,
    monthNumber,
    true,
    textComment.value
  );
  emit("resetComment");
  // console.log(`${state.value} ${dayNumber.value} ${monthNumber.value}`);
  localStorage.setItem(
    `year.months[${monthNumber.value}].days[${dayNumber.value}]`,
    JSON.stringify({
      id: dayId.value,
      day: dayNumber.value,
      state: state.value,
      holiday: true,
      activity: true,
      comment: textComment.value,
      displayed: true,
    })
  );
};

let isMouseDown = false;

addEventListener("mousedown", () => {
  isMouseDown = true;
});

addEventListener("mouseup", () => {
  isMouseDown = false;
});

let slide = () => {
  if (isMouseDown) {
    addEventListener("mouseenter", () => {});
    toggleColor();
  }
};
</script>

<template>
  <modal :show="modalComment" @close="modalComment = false">
    <slot>
      <p>Commentaire</p>
      <p>{{ dayNumber }}.{{ monthNumber + 1 }}</p>
      <textarea v-model="textComment"></textarea>
      <button @click="saveComment(), (modalComment = false)">Enregister</button>
      <button @click="deleteComment(), (modalComment = false)">Effacer</button>
    </slot>
  </modal>
  <template v-if="isDisplayed === false">
    <div class="blank"></div>
  </template>
  <template v-else="">
    <div
      :class="[isHoliday ? 'holiday' : '', colorDay]"
      class="day"
      @mousedown="toggleColor(), addComment()"
      @mouseenter="slide()"
    >
      <p>{{ dayNumber }}</p>
      <div v-if="showActivity">
        <div class="activity"></div>
      </div>
    </div>
    <!-- <div v-if="isHoliday" class="holiday day" @click="toggleColor(), addComment()"
>
      <p>{{ dayNumber }}</p>
      <div v-if="showActivity">
      <div class="activity"></div>
      </div>
    
    </div> -->
  </template>
</template>

<style scoped>
.day {
  /* height: 100px;
    width: 100px; */
  display: inline-block;
  background-color: #dadada;
  place-self: center;
  align-self: stretch;
  justify-self: stretch;
  border-radius: 8px;
}

.day:nth-child(7n -1),
.day:nth-child(7n) {
  filter: brightness(70%);
}

.neutral {
  background-color: #dadada;
}

.parent1 {
  background-color: #2698d8;
}

.parent2 {
  background-color: #d82626;
}

.conflict {
  background-color: #ebfc30;
}

.shared {
  background-color: #15b039;
  background: linear-gradient(60deg, #2698d8 50%, #d82626 50%);
}

.holiday {
  border-color: #000000;
  border-width: 5px;
  border-style: solid;
}

.blank {
  visibility: hidden;
}

.activity {
  background-color: black;
  height: 10px;
  width: 10px;
  border-radius: 100%;
}
</style>
