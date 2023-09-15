<script setup>
import { ref, onMounted } from "vue";
import axiosClient from "../axiosClient";
import MealsByLetter from "../views/MealsByLetter.vue";

const ingredients = ref([]);
const images = ref([]);

const formatIngredient = (ingredient) => {
  return ingredient.toLowerCase().replaceAll(" ", "_");
};

onMounted(async () => {
  try {
    const { data } = await axiosClient.get("list.php?i=list");
    ingredients.value = data.meals;

    const imageUrls = data.meals.map((item) => {
      return `https://www.themealdb.com/images/ingredients/${item.strIngredient}.png`;
    });
    images.value = imageUrls;
  } catch (error) {
    console.log("error fetching data: ", error);
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-5">
    <h2 class="text-2xl font-bold">Popular Ingredients</h2>
    <div class="grid grid-cols-8 gap-10 px-10 py-5 place-items-center">
      <template
        v-for="(ingredient, index) in ingredients.slice(0, 24)"
        :key="ingredient"
      >
        <router-link
          :to="{
            name: 'byMainIngredient',
            params: {
              ingredient: formatIngredient(ingredient.strIngredient),
            },
          }"
          class="hover:text-amber-500"
        >
          <div class="flex flex-col items-center">
            <div>
              <div class="flex justify-center">
                <img
                  :src="images[index]"
                  :alt="ingredient.strIngredient"
                  class="w-24"
                />
              </div>
            </div>
            <p class="text-center w-max">
              {{ ingredient.strIngredient }}
            </p>
          </div>
        </router-link>
      </template>
    </div>
    <MealsByLetter />
  </div>
</template>
