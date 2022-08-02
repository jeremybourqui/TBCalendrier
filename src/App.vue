<script setup>
import { ref, watch, onMounted } from "vue";
import Count from "./components/Count.vue";
import DayShortcut from "./components/DayShortcut.vue";
import { year } from "./assets/year.js";
import { year_fr_enfantine_primaire_co } from "./assets/year_fr_enfantine_primaire_co.js";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({
  inheritLocale: true,
  useScope: "local",
});

let selectedParent = ref(1);
let selectedYear = ref(year);
let showCommentModal = ref(false);

let neutralDay = ref(31);
let parent1Day = ref(0);
let parent2Day = ref(0);
let conflict = ref(0);

let displayedComment = ref([]);

const gridMonth = ref("grid");

const isVisible = ref(true);

//print
let print = () => window.print();

let clear = ref(false);

//define a function to assign clear to false and then to true after a while
let clearDay = () => {
  clear.value = false;
  neutralDay.value = 0;
  parent1Day.value = 0;
  parent2Day.value = 0;
  conflict.value = 0;
  displayedComment.value = [];
  setTimeout(() => {
    clear.value = true;
  }, 10);
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
  year.months[month].days[dayId.value].state = newState;
  year.months[month].days[dayId.value].activity = newActivity;
  year.months[month].days[dayId.value].comment = comment;
  countDayState();

  if (selectedParent.value === 6) {
    selectedParent.value = 1;
    selectedParent.value = 6;
  }
  
  watch(dayId, (newValue) => {
    console.log(newValue);
  });
};

//count each day state
let countDayState = () => {
  let countValuesInObj = (obj, value) => {
    let count = 0;
    for (const property in obj) {
      if (typeof obj[property] === "object") {
        count = count + countValuesInObj(obj[property], value);
      }
      if (obj[property] === value) {
        return 1; // count = count + 1; // count++;
      }
    }
    return count;
  };
  neutralDay.value = countValuesInObj(year, "neutral");
  parent1Day.value = countValuesInObj(year, "parent1");
  parent2Day.value = countValuesInObj(year, "parent2");
  conflict.value = countValuesInObj(year, "conflict");
};

//shortcut for selectedParent
window.addEventListener("keydown", function (e) {
  if (e.code === "Digit1") {
    selectedParent.value = 1;
  } else if (e.code === "Digit2") {
    selectedParent.value = 2;
  } else if (e.code === "Digit6") {
    showCommentModal.value = true;
    selectedParent.value = 6;
  } else if (e.code === "Digit3") {
    selectedParent.value = 3;
  } else if (e.code === "Digit4") {
    selectedParent.value = 4;
  } else if (e.code === "Digit5") {
    selectedParent.value = 5;
  }
});

// reset comment to false
let resetComment = () => {
  console.log("reset comment");
  // showCommentModal.value = false;
};


//define a function to retrieve the comment in local storage
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  let value = localStorage.getItem(key);
  let obj = JSON.parse(value);
  if (obj.comment) {
    // console.log(obj);
    displayedComment.value.push(obj.comment);
  }
}

// a loop that goes through each day of year
// let updateYear = () => {
//   for (let i = 0; i < year.months.length; i++) {

//     for (let j = 0; j < year.months[i].days.length; j++) {
//       localStorage.setItem(
//         `year.months[${i}].days[${j}]`,
//         JSON.stringify(year.months[i].days[j])
//       );
//     }
//   }
// };

// if (localStorage.length === 0) {
//   updateYear();
// } else {
//   console.log("plein");
// }
</script>

<template>
  <div class="shortcut">
    <div
      @click="selectedParent = 1"
      class="shortcut-item"
      :class="selectedParent === 1 ? 'parent1' : ''"
    >
      Parent 1
    </div>
    <div
      @click="selectedParent = 2"
      class="shortcut-item"
      :class="selectedParent === 2 ? 'parent2' : ''"
    >
      Parent 2
    </div>
    <div
      @click="selectedParent = 3"
      class="shortcut-item"
      :class="selectedParent === 3 ? 'shared' : ''"
    >
      Partagé
    </div>
    <div
      @click="selectedParent = 4"
      class="shortcut-item"
      :class="selectedParent === 4 ? 'conflict' : ''"
    >
      Conflict
    </div>
    <div
      @click="selectedParent = 5"
      class="shortcut-item"
      :class="selectedParent === 5 ? 'neutral' : ''"
    >
      Neutre
    </div>
    <div
      @click="selectedParent = 6"
      class="shortcut-item"
      :class="selectedParent === 6 ? 'comment' : ''"
    >
      Commentaire
    </div>
  </div>
  <div class="header print-hidden">
    <form class="print-hidden">
      <label>{{ t("language") }}</label>
      <select v-model="locale">
        <option value="fr">fr</option>
        <option value="de">de</option>
      </select>
    </form>
    <select v-model="selectedYear">
      <option :value="year">{{ t("none") }}</option>
      <option :value="year_fr_enfantine_primaire_co">
        {{ t("school") }}
      </option>
    </select>
    <!-- <p>{{ t("day not assigned") }} : {{ neutralDay }}</p> -->
    <p class="parent1" @click="selectParent(1)">
      {{ t("day parent1") }} : {{ parent1Day }}
    </p>
    <p class="parent2" @click="selectParent(2)">
      {{ t("day parent2") }} : {{ parent2Day }}
    </p>
    <p>{{ t("conflict") }} : {{ conflict }}</p>
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
    />
  </div>
  <div class="home-grid print-position">
    <template v-for="month in selectedYear.months">
      <div>
        <p
          v-show="isVisible == true"
          class="button-modal"
          @click="(isVisible = month.name), (gridMonth = none)"
        >
          {{ t(month.name) }}
        </p>
        <div v-show="isVisible == true || isVisible == month.name">
          <p v-show="isVisible == month.name">{{ t(month.name) }}</p>
          <div>
            <button
              v-show="isVisible == month.name"
              class="button-modal print-hidden"
              @click="(isVisible = true), (gridMonth = 'grid')"
            >
              {{ t("back") }}
            </button>
          </div>
          <div class="month">
            <template v-for="(days, indexDay) in month.days">
              <!-- {{ indexDay }} -->
              <DayShortcut
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
                :is-displayed="month.days[indexDay].displayed"
                :showCommentModal="showCommentModal"
              />
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>

  <template v-for="month in selectedYear.months">
    <div v-for="day in month.days">
      <div v-if="day.comment">
        {{ day.day }}.{{ month.id + 1 }} {{ day.comment }}
      </div>
    </div>
  </template>
</template>

<style scoped>
.home-grid {
  display: v-bind("gridMonth");
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 25px;
  user-select: none;
}

.conflict {
  border-radius: 8px;
  border: solid 5px #ebfc30;
}

.parent1 {
  border: solid 5px #2698d8;
  border-radius: 8px;
}

.parent2 {
  border: 5px solid #d82626;
  border-radius: 8px;
}
.neutral {
  border: 5px solid #dadada;
  border-radius: 8px;
}
.comment {
  border: 5px solid #000000;
  border-radius: 8px;
}

.shared {
  border-radius: 8px;
  border: solid 5px;
  border-color: #d82626 #d82626 #2698d8 #2698d8;
}

.count {
  display: flex;
  justify-content: center;
}
</style>

<style>
html {
  background-color: #f8f9fa;
}

.shortcut {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 20px;
}

.shortcut-item {
  padding: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  background-color: #f8f9fa;
}

.month {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px 10px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.button-modal {
  cursor: pointer;
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
    "language": "Sprache",
    "print": "Drucken",
    "clear": "Löschen",
    "day parent1": "Tag Eltern 1",
    "day parent2": "Tag Eltern 2",
    "day not assigned": "Tag nicht zugewiesen",
    "conflict": "Konflikt",
    "back": "Zurück",
    "none": "Keine",
    "school": "Kindergarten, die Primar-und Orientierungsschule",
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
    "language": "langue",
    "print": "Imprimer",
    "clear": "Effacer",
    "day parent1": "Parent 1",
    "day parent2": "Parent 2",
    "day not assigned": "Jour non attribué",
    "conflict": "Conflit",
    "back": "Retour",
    "none": "Aucune",
    "school": "Enfantine, primaire, CO",
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
