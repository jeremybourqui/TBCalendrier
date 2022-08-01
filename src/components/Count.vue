<script setup>
defineProps({
  neutralDay: Number,
  parent1Day: Number,
  parent2Day: Number,
  conflict: Number,
});
</script>

<template>
  <div class="count">
      <template v-for="(n, i) in parent1Day" :key="i">
          <div class="count-item parent1"></div>
      </template>
        <template v-for="(n, i) in neutralDay" :key="i">
            <div class="count-item neutral"></div>
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
    width: 300px;
  }

  .count-item {
    width: 15px;
    height: 30px;
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
</style>

