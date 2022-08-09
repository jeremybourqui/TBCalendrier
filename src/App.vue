<script setup>
import { ref, watch, onMounted, watchEffect } from "vue";
import Count from "./components/Count.vue";
import Day from "./components/Day.vue";
import { year } from "./assets/year.js";
import { year_fr_enfantine_primaire_co_2022 } from "./assets/year_fr_enfantine_primaire_co_2022.js";
import { year_fr_enfantine_primaire_co_2023 } from "./assets/year_fr_enfantine_primaire_co_2023.js";
import { year_secondaire2_2022} from "./assets/year_secondaire2_2022.js";
import { year_secondaire2_2023} from "./assets/year_secondaire2_2023.js";
import { year_2023} from "./assets/year_2023.js";
import { useI18n } from "vue-i18n";
import { countValuesInObj} from "./utils/countValuesInObj.js";

const { t, locale } = useI18n({
  inheritLocale: true,
  useScope: "local",
});

let selectedParent = ref(1);
let selectedYear = ref(year);
let yearSelection = ref(1);
let showCommentModal = ref(false);

watch(
  () => yearSelection.value,
  (newYear, oldYear) => {
    console.log(newYear);
    // console.log(selectedYear);
    if (newYear == 1) {
      selectedYear.value = year;
    } else if (newYear == 2) {
      selectedYear.value = year_fr_enfantine_primaire_co_2022;
    } else if (newYear == 3) {
      selectedYear.value = year_secondaire2_2022;
    } else if (newYear == 4) {
      selectedYear.value = year_fr_enfantine_primaire_co_2023;
    } else if (newYear == 5) {
      selectedYear.value = year_secondaire2_2023;
    } else if (newYear == 6) {
      selectedYear.value = year_2023;
    }
  }
);

let neutralDay = ref(0);
let parent1Day = ref(0);
let parent2Day = ref(0);
let conflict = ref(0);
let shared = ref(0);

let retrieveYear = localStorage.getItem('year');
yearSelection.value = retrieveYear;


watch(
  () => yearSelection.value,
  (newYear, oldYear) => {
    console.log(newYear);
    if (newYear == 1) {
      selectedYear.value = year;
      localStorage.setItem('year', '1');
    } else if (newYear == 2) {
      selectedYear.value = year_fr_enfantine_primaire_co_2022;
      localStorage.setItem('year', '2');	
    } else if (newYear == 3) {
      selectedYear.value = year_fr_enfantine_primaire_co_2023;
      localStorage.setItem('year', '3');
    }
      countDayState();
  }
);

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  if (key != "year") {
    // console.log(key);
    let month = key.substring(12, 13);
    let value = localStorage.getItem(key);
    let obj = JSON.parse(value);
    let newState = obj.state;
    // console.log(obj.state);
    year.months[month].days[obj.id].state = newState;
  }
}




let displayedComment = ref([]);


const gridMonth = ref("grid");

const isVisible = ref(true);

//print
let print = () => window.print();

let clear = ref(false);


let clearDay = () => {
  clear.value = true;
  neutralDay.value = 0;
  parent1Day.value = 0;
  parent2Day.value = 0;
  conflict.value = 0;
  shared.value = 0;
};

let resetClear = () => {
  clear.value = false;
};

//update the selected day
let updateDayState = (
  newState,
  dayId,
  dayClicked,
  monthNumber,
  newActivity,
  comment
) => {
  let day = dayClicked.value;
  let month = monthNumber.value;
  selectedYear.value.months[month].days[dayId.value].state = newState;
  selectedYear.value.months[month].days[dayId.value].activity = newActivity;
  selectedYear.value.months[month].days[dayId.value].comment = comment;
  countDayState();
  setTimeout(() => {
    countDayState();
  }, 1);
  if (selectedParent.value === 6) {
    selectedParent.value = 1;
    selectedParent.value = 6;
  }
};


//count each day state
let countDayState = () => {

  neutralDay.value = Math.ceil(countValuesInObj(selectedYear, "neutral")/2);
  parent1Day.value = Math.ceil(countValuesInObj(selectedYear, "parent1")/2);
  parent2Day.value = Math.ceil(countValuesInObj(selectedYear, "parent2")/2);
  conflict.value = Math.ceil(countValuesInObj(selectedYear, "conflict")/2);
  shared.value = Math.ceil(countValuesInObj(selectedYear, "shared")/2);
};

//shortcut for selectedParent
window.addEventListener("keydown", function (e) {

  switch (e.code) {
    case "Digit1":
      showCommentModal.value = false;
      selectedParent.value = 1;
      break;
    case "Digit2":
      showCommentModal.value = false;
      selectedParent.value = 2;
      break;
    case "Digit3":
      showCommentModal.value = false;
      selectedParent.value = 3;
      break;
    case "Digit4":
      showCommentModal.value = false;
      selectedParent.value = 4;
      break;
    case "Digit5":
      showCommentModal.value = false;
      selectedParent.value = 5;
      break;
    case "Digit6":
      showCommentModal.value = true;
      selectedParent.value = 6;
      break;
    default:
      break;
  }
});

// reset comment to false
let resetComment = () => {
  console.log("reset comment");
};

</script>

<template>
  <div class="sticky">
    <div class="header print-hidden">
        <label>{{ t("language") }}</label>
        <select v-model="locale">
          <option value="fr">fr</option>
          <option value="de">de</option>
        </select>
     
      <div>

        <label>{{ t("holiday") }}</label>
        <select v-model="yearSelection">
        <option value="1">{{t("none")}} 2022</option>
        <option value="2">{{t("school")}} 2022</option>
        <option value="3">{{t("school")}} 2023</option>
        </select>
      </div>
    
      <p
        class="parent1"
        :class="selectedParent === 1 ? 'item-selected' : ''"
        @click="(selectedParent = 1), (showCommentModal = false)"
      >
        {{ t("day parent1") }} : {{ parent1Day }}
      </p>
      <p
        class="parent2"
        :class="selectedParent === 2 ? 'item-selected' : ''"
        @click="(selectedParent = 2), (showCommentModal = false)"
      >
        {{ t("day parent2") }} : {{ parent2Day }}
      </p>
      <p
        class="shared"
        :class="selectedParent === 3 ? 'item-selected' : ''"
        @click="(selectedParent = 3), (showCommentModal = false)"
      >
        {{ t("shared") }} : {{ shared }}
      </p>
      <p
        class="conflict"
        :class="selectedParent === 4 ? 'item-selected' : ''"
        @click="(selectedParent = 4), (showCommentModal = false)"
      >
        {{ t("conflict") }} : {{ conflict }}
      </p>
      <p
        class="neutral"
        :class="selectedParent === 5 ? 'item-selected' : ''"
        @click="(selectedParent = 5), (showCommentModal = false)"
      >
        {{ t("neutral") }}
      </p>
      <p
        class="comment"
        :class="selectedParent === 6 ? 'item-selected' : ''"
        @click="(selectedParent = 6), (showCommentModal = true)"
      >
        {{ t("comment") }}
      </p>
      <button class="print-hidden" @click="print()">{{ t("print") }}</button>
      <button class="print-hidden" @click="clearDay()">{{ t("clear") }}</button>
    </div>
    <div class="count">
      <Count
        class="print-hidden"
        :neutral-day="neutralDay"
        :parent1-day="parent1Day"
        :parent2-day="parent2Day"
        :conflict="conflict"
        :shared="shared"
      />
    </div>
  </div>
  <div class="home-grid print-position">
    <template v-for="month in selectedYear.months">
      <div>
        <p
          v-show="isVisible == true"
          class="button-modal"
          @click="(isVisible = month.name), (gridMonth = none)"
        >
          <div class="text-white-background"> {{ t(month.name) }} </div>
        </p>
        <div v-show="isVisible == true || isVisible == month.name">
          <p class="text-white-background" v-show="isVisible == month.name">{{ t(month.name) }}</p>
        

          <div class="month">
            <template v-for="(days, indexDay) in month.days">
              <Day
                :clear="clear"
                :day-id="month.days[indexDay].id"
                :day-number="month.days[indexDay].day"
                :month-number="parseInt(month.id)"
                :selected-parent="selectedParent"
                :is-holiday="month.days[indexDay].holiday"
                :state="month.days[indexDay].state"
                :has-activity="month.days[indexDay].activity"
                :comment="month.days[indexDay].comment"
                @state-change="updateDayState"
                @reset-comment="resetComment"
                @reset-clear="resetClear"
                :is-displayed="month.days[indexDay].displayed"
                :showCommentModal="showCommentModal"
                :localeProp="locale"
              />
            </template>
          </div>
          <template v-for="monthComment in selectedYear.months">
            <div v-if="month.id == monthComment.id">
              <div v-for="day in monthComment.days">

                <div class="comment-display" v-if="day.comment">{{ day.day }}. {{ day.comment }}</div>

              </div>
            </div>
          </template>
          <div>
            <button
              v-show="isVisible == month.name"
              class="button-modal print-hidden"
              @click="(isVisible = true), (gridMonth = 'grid')"
            >
              {{ t("back") }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.home-grid {
  display: v-bind("gridMonth");
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 25px;
  user-select: none;
}

.item-selected {
  border-width: 5px;
  border-style: solid;
  border-radius: 8px 8px 8px 8px;
  background-color: var(--color-white);
}

.conflict, .shared, .neutral, .comment, .parent1, .parent2 {
  padding: 6px;
  border-bottom: solid 5px;
  background-color: var(--color-white);

.parent1 {
  border-color: var(--color-parent1);}

.conflict {
  border-color: var(--color-conflict);}

.parent2 {

  border-color: var(--color-parent2);}
.neutral {

  border-color: var(--color-neutral);}

.comment {
  padding: 4px;
  padding: 4px;
  border-bottom: solid 5px;
  border-color: #000000;
}

.comment-display {
  padding: 4px;
  margin: 4px;
  background-color: var(--color-white);
  border-radius: 8px;
}

.text-white-background {
  margin: 1% 30% 1% 30% ;; 
  padding: 4px 0px 4px 0px;; 
  background-color: var(--color-white);
  border-radius: 8px;
}

.shared {

  padding: 4px;
  margin: 4px;
  background-color: var(--color-white);
  border-radius: 8px;
}

.shared {
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #2698d8 50%, #d82626 50%);
}

.count {
  display: flex;
  justify-content: center;
}

.text-white-background {
  margin: 1% 30% 1% 30% ;; 
  padding: 4px 0px 4px 0px;; 
  background-color: var(--color-white);
  border-radius: 8px;
}
</style>

<style>
:root {
  --gray-middle: #cfcdcd;
  --color-gray-middle: #cfcdcd;
  --gray-light: #d3d3d3;
  --color-gray-light: #d3d3d3;
  --gray-dark: #171717;
  --color-gray-dark: #171717;
  --color-white: #fff;
  --color-parent1: #2698d8;
  --color-parent2: #d82626;
  --color-shared: linear-gradient(60deg, #2698d8 50%, #d82626 50%);
  --color-conflict: #ebfc30;
  --color-neutral: #dadada;
}


html {
background-color: var(--color-gray-middle);}



.shortcut {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 20px;
}

.shortcut-item {
  padding: 10px;
}

.sticky {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--color-gray-middle);
  box-shadow: 0px 2px #6f6f6f;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  background-color: var(--color-gray-middle);
}

.month {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px 10px;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  border-radius: 6px;
  padding: 10px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: baseline;
}

.button-modal {
  cursor: pointer;
  margin: 5px;
}

@media print {
  * {
    color-adjust: exact !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .print-position {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 9999;
  }

  .print-hidden {
    visibility: hidden;
  }
}
</style>

<i18n>
{
  "de": {
    "language": "Sprache ",
    "print": "Drucken",
    "clear": "Löschen",
    "day parent1": "Tag Eltern 1",
    "day parent2": "Tag Eltern 2",
    "day not assigned": "Tag nicht zugewiesen",
    "conflict": "Konflikt",
    "shared": "Gemeinsam",
    "neutral": "Nicht zugewiesen",
    "comment": "Kommentar",
    "back": "Zurück",
    "none": "Keine",
    "save": "Speichern",
    "school": "Kindergarten, die Primar-und Orientierungsschule",
    "highschool": "Sekundarstufe",
    "publicHoliday": "Feiertag",
    "holiday": "Ferien ",
    "january": "Januar",
    "february": "Februar",
    "march": "März",
    "april": "April",c
    "may": "Mai",
    "june": "Juni",
    "july": "Juli",
    "august": "August",
    "september": "September",
    "october": "Oktober",
    "november": "November",
    "december": "Dezember",
  },
  "fr": {
    "language": "Langue ",
    "print": "Imprimer",
    "clear": "Effacer",
    "day parent1": "Parent 1",
    "day parent2": "Parent 2",
    "day not assigned": "Jour non attribué",
    "conflict": "Conflit",
    "shared": "Partagé",
    "neutral":"Non attribué",
    "comment": "Commentaire",
    "back": "Retour",
    "none": "Aucune",
    "save": "Enregistrer",
    "school": "Enfantine, primaire, CO",
     "highschool": "Secondaire supérieur",
    "publicHoliday": "Jours fériés",
    "holiday": "Vacances ",
    "january": "Janvier",
    "february": "Février",
    "march": "Mars",
    "april": "Avril",
    "may": "Mai",
    "june": "Juin",
    "july": "Juillet",
    "august": "Août",
    "september": "Septembre",
    "october": "Octobre",
    "november": "Novembre",
    "december": "Décembre",
  }
}
</i18n>
