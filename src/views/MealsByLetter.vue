<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../axiosClient";

const route = useRoute();
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const ingredients = ref([]);

watch(
  () => route.params.letter,
  async (newLetter) => {
    try {
      const { data } = await axiosClient.get(`search.php?f=${newLetter}`);
      ingredients.value = data.meals || [];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <h1 class="text-xl font-bold text-center">Browse Meals</h1>
    <div class="flex p-5 md:justify-center md:flex-col">
      <div class="gap-2 text-center">
        <router-link
          v-for="(letter, index) in letters"
          :key="letter"
          :to="{ name: 'byLetter', params: { letter: letter.toLowerCase() } }"
        >
          <span class="font-semibold">
            <span class="hover:text-amber-500">
              {{ letter }}
              <span v-if="index < letters.length - 1"> / </span>
            </span>
          </span>
        </router-link>
      </div>
    </div>
    <div
      class="grid grid-cols-1 gap-3 py-5 md:grid-cols-3 lg:grid-cols-4 place-items-center md:px-5 lg:px-10"
    >
      <div
        v-for="meal in ingredients"
        :key="meal.idMeal"
        class="w-64 p-4 mt-5 bg-white rounded-md shadow md:w-[240px] md:h-[500px] lg:h-full lg:w-72"
      >
        <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
          <img
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
            class="rounded-md"
          />
        </router-link>
        <div class="flex flex-col items-start justify-between my-4">
          <h1>Name: {{ meal.strMeal }}</h1>
          <router-link
            :to="{
              name: 'areaDetails',
              params: {
                area: meal.strArea,
              },
            }"
          >
            <h1>Area: {{ meal.strArea }}</h1>
          </router-link>
          <router-link
            :to="{
              name: 'categoryDetails',
              params: {
                category: meal.strCategory,
              },
            }"
          >
            <h1>Category: {{ meal.strCategory }}</h1>
          </router-link>
        </div>

        <router-link
          :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
          class="text-blue-500 underline"
        >
          Detail
        </router-link>

        <div class="flex flex-row mt-5 mb-5 gap-x-4">
          <a
            :href="meal.strYoutube"
            target="_blank"
            class="px-5 py-2 font-semibold text-center text-white transition-colors duration-200 bg-red-500 rounded-md shadow shadow-black/50 hover:bg-red-600"
            >Youtube</a
          >
          <a
            :href="meal.strSource"
            target="_blank"
            class="px-5 py-2 font-semibold text-center text-white transition-colors duration-200 bg-blue-500 rounded-md shadow shadow-black/50 hover:bg-blue-600"
            >Source</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
