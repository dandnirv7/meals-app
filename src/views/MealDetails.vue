<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../axiosClient";

const meal = ref({});
const route = useRoute();

const extractIngredientsMeasures = (prefix) => {
  return Object.keys(meal.value)
    .filter((key) => key.startsWith(prefix) && meal.value[key].trim() !== "")
    .map((key) => meal.value[key]);
};

const mealIngredients = computed(() => {
  return extractIngredientsMeasures("strIngredient");
});

const mealMeasures = computed(() => {
  return extractIngredientsMeasures("strMeasure");
});

const numberedInstructions = computed(() => {
  const instructions = meal.value.strInstructions || "";

  const lines = instructions.split("\n");
  return lines
    .filter((line) => line.trim() && !line.includes("STEP"))
    .map((line, index) => `${index + 1}. ${line}`);
});

onMounted(async () => {
  const { data } = await axiosClient.get(`lookup.php?i=${route.params.id}`);
  meal.value = data.meals[0] || {};
});
</script>

<template>
  <div class="p-8 flex flex-row space-x-5">
    <div class="w-2/5 space-y-5">
      <h1 class="text-3xl font-bold">{{ meal.strMeal }}</h1>
      <img :src="meal.strMealThumb" :alt="meal.strMeal" />
      <div class="flex flex-col justify-between">
        <span>Category: {{ meal.strCategory }}</span>
        <span>Area: {{ meal.strArea }}</span>
      </div>
    </div>
    <div class="w-full py-12">
      <div class="flex flex-row space-x-52">
        <div>
          <h2 class="text-2xl font-bold">Ingredients</h2>
          <ul class="mt-2">
            <li
              v-for="(ingredient, index) in mealIngredients"
              :key="index"
              class="flex flex-row justify-start gap-x-1 capitalize"
            >
              <p class="w-5 text-center">{{ index + 1 }}.</p>
              <p>
                {{ ingredient }}
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-bold">Measures</h2>
          <ul class="mt-2">
            <li
              v-for="(measure, index) in mealMeasures"
              :key="index"
              class="flex flex-row justify-start gap-x-1 capitalize"
            >
              <p class="w-5 text-center">{{ index + 1 }}.</p>
              <p>
                {{ measure }}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-2xl font-bold">Instructions</h2>
        <template
          v-for="instruction in numberedInstructions"
          :key="instruction"
        >
          <p class="mt-2">
            {{ instruction }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>
