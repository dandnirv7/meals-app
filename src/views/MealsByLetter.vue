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
    {{ ingredients[0] }}
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../axiosClient";

const route = useRoute();
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ingredients = ref([]);

const refreshPage = router.push.onMounted(async () => {
  try {
    if (route.params && route.params.letter) {
      const letter = route.params.letter;

      const { data } = await axiosClient.get(`search.php?f=${letter}`);
      console.log("ini response", data);
      ingredients.value = data.meals || [];
    }
  } catch (error) {
    console.error("Error fetching ingredients:", error);
  }
});

// watch(
//   () => route.params.letter,
//   async (newLetter) => {
//     try {
//       const { data } = await axiosClient.get(`search.php?f=${newLetter}`);
//       console.log("ini response", data);
//       ingredients.value = data.meals || [];
//     } catch (error) {
//       console.error("Error fetching ingredients:", error);
//     }
//   }
// );
</script>
