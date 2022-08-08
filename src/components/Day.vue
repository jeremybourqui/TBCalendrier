<script setup>
import { ref, toRefs, watch } from "vue";
import modal from "./Modal.vue";
import { useI18n } from "vue-i18n";

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
  localeProp: String,
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
let { localeProp } = toRefs(props);

const { t, locale } = useI18n({
  inheritLocale: true,
  useScope: "local",
});

watch(
  () => props.localeProp,
  (newLocale, oldLocale) => {
    locale.value = newLocale;
  }
);

let colorDay = ref("");
let showActivity = ref(false);
const textComment = ref("");

let storedState = localStorage.getItem(
  `year.months[${monthNumber.value}].days[${dayNumber.value}]`
);
let jsonState = JSON.parse(storedState);
if (jsonState !== null) {
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
  if (typeof jsonState.activity == "undefined") {
    showActivity.value = false;
  } else {
    showActivity.value = jsonState.activity;
  }
}

watch(
  () => props.clear,
  (clear, prevClear) => {
    clearDay();
  }
);

let clearDay = () => {
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

const emit = defineEmits(["stateChange", "resetComment", "resetClear"]);

let toggleColor = () => {
  switch (selectedParent.value) {
    case 1:
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
      break;
    case 2:
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
      break;
    case 3:
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
      break;
    case 4:
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
      break;
    case 5:
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
      break;
    default:
      break;
  }
};

let modalComment = ref(false);

let addComment = () => {
  if (showCommentModal.value) {
    modalComment.value = true;
  }
};

let deleteComment = () => {
  showActivity.value = false;
  textComment.value = "";
  emit("stateChange", state, dayId, dayNumber, monthNumber, false, textComment);
  emit("resetComment");
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
      <p>{{ t("comment") }}</p>
      <p>{{ dayNumber }}.{{ monthNumber + 1 }}</p>
      <textarea v-model="textComment" rows="4" cols="50"></textarea>
      <br>
      <button @click="saveComment(), (modalComment = false)">
        {{ t("save") }}
      </button>
      <button @click="deleteComment(), (modalComment = false)">
        {{ t("clear") }}
      </button>
      <br>
      <button @click="modalComment = false">{{ t("back") }}</button>
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
  </template>
</template>

<style scoped>
.day {
  box-sizing: border-box;
  display: inline-block;
  background-color: #dadada;
  place-self: center;
  align-self: stretch;
  justify-self: stretch;
  border-radius: 8px;
  padding: 3px;
}

.day:nth-child(7n -1),
.day:nth-child(7n) {
  filter: brightness(70%);
}

.neutral {
  background-color: var(--color-neutral);
}

.parent1 {
  background-color: var(--color-parent1);
}

.parent2 {
  background-color: var(--color-parent2);
}

.conflict {
  background-color: var(--color-conflict);
}

.shared {
  background: var(--color-shared);
}

.holiday {
  border-color: #000000;
  border-style: solid;
  padding: 0px;
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

button {
  margin: 5px;
}
</style>

<i18n>
{
  "de": {
    "comment": "Kommentar",
    "back": "Zurück",
    "save": "Speichern",
    "clear": "Löschen",
  },
  "fr": {
    "comment": "Commentaire",
    "back": "Retour",
    "clear": "Effacer",
    "save": "Enregistrer"
  }
}
</i18n>
