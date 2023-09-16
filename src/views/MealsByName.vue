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
</script>

<template>
  <div class="p-20">
    <div>
      <div class="flex flex-row items-center justify-center">
        <input
          v-model="keyword"
          @keyup.enter="searchMeals"
          type="text"
          name="search"
          id="search"
          class="border-2 border-gray-200 focus:border-[1.5px] rounded-s-lg md:w-2/4 focus:border-e-0"
          placeholder="Search for meals"
        />
        <button
          @click="searchMeals"
          class="flex items-center justify-center px-4 py-2.5 text-white bg-blue-500 hover:bg-blue-600 rounded-e-lg"
        >
          <span class="material-symbols-outlined">search</span>
        </button>
      </div>
      <div v-if="!meals" class="mt-2 text-center">Meals not found</div>

      <template v-else>
        <div
          class="grid grid-cols-1 gap-3 py-5 md:grid-cols-2 place-items-center lg:grid-cols-3 xl:grid-cols-4"
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
      </template>
    </div>
  </div>
</template>
