<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../axiosClient";
const route = useRoute();

const meals = ref([]);

onMounted(async () => {
  try {
    const strArea = route.params.area;
    const { data } = await axiosClient.get(`filter.php?a=${strArea}`);
    meals.value = data.meals;
  } catch (error) {
    console.log("error fetching data: ", error);
  }
});
</script>

<template>
  <div>
    <div
      class="grid grid-cols-1 gap-3 pb-8 md:grid-cols-3 place-items-center lg:grid-cols-4"
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

        <div class="flex flex-col mt-4 gap-y-4">
          <h1>{{ meal.strMeal }}</h1>

          <router-link
            :to="{ name: 'mealDetails', params: { id: meal.idMeal } }"
            class="text-blue-500 underline w-max"
          >
            Detail
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
