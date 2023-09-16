<template>
  <div class="flex flex-col justify-center p-8 gap-y-5">
    <MealsByName />
    <MealsByIngredients />
    <MealsByArea />
    <MealsByLetter />
  </div>
</template>

<script setup>
import MealsByArea from "./MealsByArea.vue";
import MealsByIngredients from "./MealsByIngredients.vue";
import MealsByLetter from "./MealsByLetter.vue";
import MealsByName from "./MealsByName.vue";
</script>
