<script setup>
import { ref } from 'vue'

defineProps({
  neutralDay: Number,
  parent1Day: Number,
  parent2Day: Number,
  conflict: Number,
})

</script>

<template>
  <div class="count">
      <template v-for="(n, i) in parent1Day" :key="i">
          <div class="count-item green"></div>
      </template>
        <template v-for="(n, i) in neutralDay" :key="i">
            <div class="count-item grey"></div>
        </template>
        <template v-for="(n, i) in conflict" :key="i">
            <div class="count-item red"></div>
        </template>
        <template v-for="(n, i) in parent2Day" :key="i">
            <div class="count-item blue"></div>
        </template>
    </div>


</template>

<style scoped>
.count {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px 0 10px 0;
  }

  .count-item {
    width: 15px;
    height: 30px;
  }

  .green {
    background-color:#26D882;
  }

  .grey {
    background-color:#DADADA;
  }

  .blue {
    background-color: #2698D8;
  }
  .red {
    background-color: #D82626;
  }
</style>

