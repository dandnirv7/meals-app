<script setup>
import { ref, onMounted } from "vue";
import axiosClient from "../axiosClient";

const categories = ref([]);

onMounted(async () => {
  try {
    const { data } = await axiosClient.get("list.php?c=list");
    categories.value = data.meals;
  } catch (error) {
    console.log("error fetching data: ", error);
  }
});
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-x-2">
    <template v-for="category in categories" :key="category.strCategory">
      <router-link
        :to="{
          name: 'categoryDetails',
          params: {
            category: category.strCategory,
          },
        }"
      >
        {{ category.strCategory }}
      </router-link>
    </template>
  </div>
</template>
