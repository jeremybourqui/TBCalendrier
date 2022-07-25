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

// console.log(year);

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
let updateDayState = (newState, dayId, dayClicked, monthNumber, newActivity) => {
  let day = dayClicked.value;
  let month = monthNumber.value;
  // let activity = newActivity.value;
  console.log(`newacti ${newActivity}`);
  console.log(year.months[month].days[dayId.value]);
  // console.log(`newstate ${newState}`);
  // console.log(`dayupdate ${year.months[month].days[day].day}`);
  year.months[month].days[dayId.value].state = newState;
  year.months[month].days[dayId.value].activity = newActivity;
  countDayState();
  console.log(year.months[month].days[dayId.value]);
  // console.log(year);
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
  // console.log(e.code);
  if (e.code === "Digit1") {
    selectedParent.value = 1;
  } else if (e.code === "Digit2") {
    selectedParent.value = 2;
  } else if (e.code === "KeyC") {
    showCommentModal.value = true;
  };
});

// reset comment to false
let resetComment = () => {
  console.log("reset comment");
  showCommentModal.value = false;
};


let displayComment = (comment) => {
  displayedComment.value.push(comment);

// define a function to loop the local storage and display the comments  
    // for (let i = 0; i < localStorage.length; i++) {
    //   let key = localStorage.key(i);
    //   let value = localStorage.getItem(key);
    //   let obj = JSON.parse(value);
    //   if (obj.activity) {
    //     console.log(obj);
    //     displayedComment.value.push(obj.activity);
    //   };
    // };
  // console.log(displayedComment.value);
  };

//define a function to retrieve the comment in local storage
for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      let obj = JSON.parse(value);
      if (obj.activity) {
        // console.log(obj);
        displayedComment.value.push(obj.activity);
      };
    };


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
  <form>
    <label>{{ t("language") }}</label>
    <select v-model="locale">
      <option value="fr">fr</option>
      <option value="de">de</option>
    </select>
  </form>

  <div class="header">
    <select v-model="selectedYear">
      <option :value="year">{{ t("none") }}</option>
      <option :value="year_fr_enfantine_primaire_co">
        {{ t("school") }}
      </option>
    </select>
    <p>{{ t("day not assigned") }} : {{ neutralDay }}</p>
    <p class="parent1" @click="selectParent(1)">
      {{ t("day parent1") }} : {{ parent1Day }}
    </p>
    <p class="parent2" @click="selectParent(2)">
      {{ t("day parent2") }} : {{ parent2Day }}
    </p>
    <p>{{ t("conflict") }} : {{ conflict }}</p>
    <button class="print" @click="print()">{{ t("print") }}</button>
    <button class="print" @click="clearDay()">{{ t("clear") }}</button>
  </div>
  <Count
    :neutral-day="neutralDay"
    :parent1-day="parent1Day"
    :parent2-day="parent2Day"
    :conflict="conflict"
  />
  <div class="home-grid">
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
          <button
            v-show="isVisible == month.name"
            class="button-modal"
            @click="(isVisible = true), (gridMonth = 'grid')"
          >
            {{ t("back") }}
          </button>
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
                @state-change="updateDayState"
                @reset-comment="resetComment"
                @save-comment="displayComment"
                :is-displayed="month.days[indexDay].displayed"
                :showCommentModal="showCommentModal"
              />
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
      <p v-for="comment in displayedComment">
        {{ comment }}
      </p>
</template>

<style scoped>
.home-grid {
  display: v-bind("gridMonth");
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 15px;
}
</style>

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
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px 10px;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.parent1 {
  background-color: #2698d8;
}

.parent2 {
  background-color: #d82626;
}

.test {
  background-color: #1ea93a;
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

  .print {
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
    "day parent1": "Tag Parent 1",
    "day parent2": "Tag Parent 2",
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
