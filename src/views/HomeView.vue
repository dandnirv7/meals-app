<template>
  <div class="flex flex-col justify-center p-8">
    <div class="flex justify-center gap-2 mt-2">
      <router-link
        v-for="letter in letters"
        :key="letter"
        :to="{ name: 'byLetter', params: { letter } }"
        @click="searchByLetter(letter)"
      >
        {{ letter }} /
      </router-link>
    </div>

    <pre>{{ ingredients }}</pre>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useMealsStore } from "../stores";
import axiosClient from "../axiosClient";

const mealsStore = useMealsStore();

const meals = computed(() => mealsStore.meal);
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ingredients = ref([]);

const searchByLetter = async (letter) => {
  mealsStore.keyword = letter;
  await mealsStore.firstLetter();
};

onMounted(async () => {
  const response = await axiosClient.get("/list.php?i=list");
  console.log(response.data);
  ingredients.value = response.data;
});

axiosClient;
</script>
