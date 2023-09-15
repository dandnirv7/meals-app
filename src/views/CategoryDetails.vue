<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../axiosClient";

const route = useRoute();
const meals = ref([]);
const strCategory = route.params.category;

onMounted(async () => {
  try {
    const { data } = await axiosClient.get(`filter.php?c=${strCategory}`);
    // console.log(strCategory);
    meals.value = data.meals;
  } catch (error) {
    console.log("error fetching data: ", error);
  }
});
</script>

<template>
  <div class="grid grid-cols-1 gap-3 py-5 md:grid-cols-4 place-items-center">
    <div
      v-for="meal in meals"
      :key="meal.idMeal"
      class="p-4 pb-10 mt-5 bg-white rounded-md shadow w-72"
    >
      <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
        <img :src="meal.strMealThumb" :alt="meal.strMeal" class="rounded-md" />
      </router-link>
      <div class="flex flex-col items-start justify-between my-4">
        <h1>Name: {{ meal.strMeal }}</h1>
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
