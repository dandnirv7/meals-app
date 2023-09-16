<script setup>
import { ref, onMounted } from "vue";
import axiosClient from "../axiosClient";

const areas = ref([]);
const images = ref([]);

const formatAreas = (area) => {
  switch (area.toLowerCase()) {
    case "american":
      return "us";
    case "british":
      return "gb";
    case "canadian":
      return "ca";
    case "french":
      return "fr";
    case "jamaican":
      return "jm";
    case "chinese":
      return "cn";
    case "croatian":
      return "hr";
    case "dutch":
      return "nl";
    case "egyptian":
      return "eg";
    case "filipino":
      return "ph";
    case "greek":
      return "gr";
    case "indian":
      return "in";
    case "irish":
      return "ie";
    case "italian":
      return "it";
    case "japanese":
      return "jp";
    case "kenyan":
      return "ke";
    case "malaysian":
      return "my";
    case "mexican":
      return "mx";
    case "moroccan":
      return "ma";
    case "polish":
      return "pl";
    case "portuguese":
      return "pt";
    case "russian":
      return "ru";
    case "spanish":
      return "es";
    case "thai":
      return "th";
    case "tunisian":
      return "tn";
    case "turkish":
      return "tr";
    case "vietnamese":
      return "vn";
    default:
      return area.toLowerCase();
  }
};

onMounted(async () => {
  try {
    const { data } = await axiosClient.get("list.php?a=list");
    areas.value = data.meals;

    const imageUrls = data.meals.map((item) => {
      return `https://www.themealdb.com/images/icons/flags/big/64/${formatAreas(
        item.strArea
      )}.png`;
    });
    images.value = imageUrls;
  } catch (error) {
    console.log("error fetching data: ", error);
  }
});
</script>

<template>
  <div class="my-10 px-5">
    <h1 class="text-xl font-bold text-center">Browse Country</h1>
    <div
      class="flex flex-wrap items-center justify-center mt-4 gap-x-2 xl:w-4/5 mx-auto"
    >
      <template v-for="(area, index) in areas" :key="area.strArea">
        <router-link
          :to="{
            name: 'areaDetails',
            params: {
              area: area.strArea,
            },
          }"
        >
          <img
            :src="images[index]"
            :alt="area.strArea"
            class="w-16 h-16 bg-cover"
          />
        </router-link>
      </template>
    </div>
  </div>
</template>
