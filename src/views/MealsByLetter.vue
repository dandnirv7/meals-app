<template>
  <div class="flex flex-col justify-center p-8">
    <div class="flex justify-center gap-2 mt-2">
      <router-link
        v-for="letter in letters"
        :key="letter"
        :to="{ name: 'byLetter', params: { letter: letter.toLowerCase() } }"
      >
        {{ letter }} /
      </router-link>
    </div>
    <div
      class="grid grid-cols-1 gap-3 py-5 md:grid-cols-4 place-items-center justify-items-center"
    >
      <div
        v-for="meal in ingredients"
        :key="meal.idMeal"
        class="w-64 p-4 mt-5 bg-white rounded-md shadow"
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
          <h1>Area: {{ meal.strArea }}</h1>
          <h1>Category: {{ meal.strCategory }}</h1>
        </div>

        <router-link
          :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
          class="text-blue-500 underline"
        >
          Detail
        </router-link>
      </div>
    </div>
  </div>
</template>

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
