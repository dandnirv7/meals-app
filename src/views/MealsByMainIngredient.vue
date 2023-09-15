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
    <a @click="$router.go(-1)" class="cursor-pointer ml-5 mt-5 block">back</a>

    <div class="grid grid-cols-1 gap-3 py-5 md:grid-cols-4 place-items-center">
      <div
        v-for="meal in meals"
        :key="meal.idMeal"
        class="w-64 p-4 mt-5 bg-white rounded-md shadow h-80"
      >
        <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
          <img
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
            class="rounded-md"
          />
        </router-link>
        <h1>Name: {{ meal.strMeal }}</h1>

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
  </div>
</template>
