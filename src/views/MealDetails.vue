<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../axiosClient";

const meal = ref({});
const images = ref([]);
const route = useRoute();

const extractIngredientsMeasures = (prefix) => {
  if (meal.value) {
    return Object.keys(meal.value)
      .filter((key) => key.startsWith(prefix) && meal.value[key]?.trim() !== "")
      .map((key) => meal.value[key]);
  }
  return [];
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

const formatName = (name) => {
  return name.replaceAll(" ", "%20");
};

onMounted(async () => {
  try {
    const { data } = await axiosClient.get(`lookup.php?i=${route.params.id}`);
    meal.value = data.meals[0] || {};

    const imageUrls = mealIngredients.value.map((item) => {
      return `https://themealdb.com/images/ingredients/${item}.png`;
    });
    images.value = imageUrls;
  } catch (error) {
    console.log("error fetching data: ", error);
  }
});
</script>

<template>
  <div>
    <div
      class="flex flex-col justify-center items-center md:justify-start md:items-start md:flex-row px-8 py-8 md:space-x-5"
    >
      <div class="md:w-2/5 space-y-5">
        <h1 class="text-2xl font-bold text-center md:text-start">
          {{ meal.strMeal }}
        </h1>
        <img :src="meal.strMealThumb" :alt="meal.strMeal" />
        <div class="flex flex-col justify-between">
          <span
            >Category:

            <router-link
              :to="{
                name: 'byCategories',
                params: {
                  categories: meal.strCategory,
                },
              }"
              >{{ meal.strCategory }}</router-link
            >
          </span>
          <span
            >Area:

            <router-link :to="'/by-area/' + meal.strArea">{{
              meal.strArea
            }}</router-link>
          </span>
        </div>
      </div>
      <div class="w-full mt-5 md:mt-0">
        <div>
          <h2 class="text-2xl font-bold text-center md:text-start">
            Ingredients
          </h2>
          <ul
            class="mt-5 grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 gap-y-5 place-items-start justify-items-center"
          >
            <li
              v-for="(ingredient, index) in mealIngredients"
              :key="index"
              class="flex flex-col items-center capitalize space-y-3.5"
            >
              <div class="">
                <img :src="formatName(images[index])" alt="" class="w-24" />
              </div>
              <p class="text-center">
                {{ mealMeasures[index] }} {{ ingredient }}
              </p>
            </li>
          </ul>
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
  </div>
</template>
