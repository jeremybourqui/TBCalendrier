<script setup>
import { ref } from 'vue'

defineProps({
  neutralDay: Number,
  parent1Day: Number,
  parent2Day: Number,
})

</script>

<template>
  <div class="count">
        <template v-for="(n, i) in neutralDay" :key="i">
            <div class="count-item red"></div>
        </template>
        <template v-for="(n, i) in parent1Day" :key="i">
            <div class="count-item black"></div>
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
  }

  .count-item {
    width: 20px;
    height: 10px;
    border-radius: 4px;
    margin-right: 15px;
  }

  .red {
    background-color:#da291c;
  }

  .black {
    background-color:#DADADA;
  }

  .blue {
    background-color: blue;
  }
</style>

