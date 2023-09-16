<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../axiosClient";

const route = useRoute();
const meals = ref([]);

onMounted(async () => {
  try {
    const routeParams = route.params.ingredient;
    const { data } = await axiosClient.get(`filter.php?i=${routeParams}`);
    console.log(data);
    meals.value = data.meals;
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
});
</script>

<template>
  <div>
    <div
      class="grid grid-cols-1 gap-3 py-5 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 px-5 place-items-center"
    >
      <div
        v-for="meal in meals"
        :key="meal.idMeal"
        class="w-64 p-4 mt-5 bg-white rounded-md shadow h-[360px]"
      >
        <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
          <img
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
            class="rounded-md"
          />
        </router-link>
        <div class="mt-3">
          <h1>{{ meal.strMeal }}</h1>

          <router-link
            :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
            class="text-blue-500 underline"
          >
            Detail
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
