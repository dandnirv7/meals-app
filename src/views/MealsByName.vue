<script setup>
import { ref, computed } from "vue";
import { useMealsStore } from "../stores";

const mealsStore = useMealsStore();

const keyword = ref(mealsStore.keyword);
const meals = computed(() => mealsStore.meal);

const searchMeals = async () => {
  mealsStore.keyword = keyword.value;
  await mealsStore.searchMeals();
};

const numberedInstructions = computed(() => {
  const instructions = mealsStore.meal[0].strInstructions;
  if (!instructions) return [];

  const lines = instructions.split("\n");
  return lines
    .filter((line) => line.trim() && !line.includes("STEP"))
    .map((line, index) => `${index + 1}. ${line}`);
});
</script>

<template>
  <div class="p-20">
    <input
      v-model="keyword"
      @input="searchMeals"
      type="text"
      name="search"
      id="search"
      class="w-full border-2 border-gray-200 rounded"
      placeholder="Search for meals"
    />

    <div v-if="!meals" class="mt-2 text-center">not found</div>

    <template v-else>
      <div
        class="grid grid-cols-1 gap-3 py-5 md:grid-cols-4 place-items-center"
      >
        <div
          v-for="meal in meals"
          :key="meal.idMeal"
          class="w-64 p-4 mt-5 bg-white rounded-md shadow"
        >
          <router-link
            :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
          >
            <img
              :src="meal.strMealThumb"
              :alt="meal.strMeal"
              class="rounded-md"
            />
          </router-link>
          <div class="flex flex-col items-start justify-between my-4">
            <h1>Name: {{ meal.strMeal }}</h1>
            <h1>Area: {{ meal.strArea }}</h1>
            <h1>Category: {{ meal.strCategory }}</h1>
          </div>

          <router-link
            :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
            class="text-blue-500 underline"
          >
            Detail
          </router-link>

          <!-- <div class="flex flex-row items-center mt-5 mb-4 gap-x-2">
            <a
              :href="meal.strYoutube"
              target="_blank"
              class="bg-red-500 px-5 py-2.5 rounded-md shadow shadow-black/50 text-white text-center hover:bg-red-600 transition-colors duration-200 font-semibold"
              >Youtube</a
            >
            <a
              :href="meal.strSource"
              target="_blank"
              class="bg-red-500 px-5 py-2.5 rounded-md shadow shadow-black/50 text-white text-center hover:bg-red-600 transition-colors duration-200 font-semibold"
              >Source</a
            >
          </div> -->
        </div>
      </div>
    </template>
  </div>
</template>
