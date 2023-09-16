<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const toggle = ref(false);

const toggleMenu = () => {
  toggle.value = !toggle.value;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  const scrollY = window.scrollY;

  if (scrollY >= 1) {
    document.querySelector("header").style.position = "fixed";
    document.querySelector("header").style.top = "0";
    document.querySelector("header").style.right = "0";
    document.querySelector("header").style.left = "0";
  } else {
    document.querySelector("header").style.position = "static";
  }
};
</script>

<template>
  <header class="bg-white shadow-md">
    <div class="container px-4 mx-auto">
      <div class="flex items-stretch justify-between h-16">
        <router-link
          :to="{ name: 'home' }"
          class="inline-flex items-center h-full"
          @click="toggleMenu"
        >
          <div class="flex items-center justify-center flex-row">
            <span class="material-symbols-outlined"> cooking </span>
            <span class="text-xl font-semibold ml-2">The Meal</span>
          </div>
        </router-link>

        <div class="hidden md:flex">
          <router-link
            :to="{ name: 'byName' }"
            class="inline-flex items-center h-full px-2 transition-colors hover:bg-blue-200"
            @click="toggleMenu"
          >
            Search Meals
          </router-link>
          <router-link
            :to="{ name: 'byIngredients' }"
            class="inline-flex items-center h-full px-2 transition-colors hover:bg-blue-200"
            @click="toggleMenu"
          >
            Meals By Ingredients
          </router-link>
          <router-link
            :to="{ name: 'byArea' }"
            class="inline-flex items-center h-full px-2 transition-colors hover:bg-blue-200"
            @click="toggleMenu"
          >
            Meals By Area
          </router-link>
        </div>

        <button
          @click="toggleMenu"
          class="inline-flex items-center justify-center w-16 h-16 md:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-show="toggle"
      class="absolute left-0 right-0 z-20 text-center bg-white md:hidden top-16 py-5 shadow"
    >
      <router-link
        :to="{ name: 'byName' }"
        class="block px-4 py-2 hover:bg-blue-200"
        @click="toggleMenu"
      >
        Search Meals
      </router-link>

      <router-link
        :to="{ name: 'byIngredients' }"
        class="block px-4 py-2 hover:bg-blue-200"
        @click="toggleMenu"
      >
        Meals By Ingredients
      </router-link>
      <router-link
        :to="{ name: 'byArea' }"
        class="block px-4 py-2 hover:bg-blue-200"
        @click="toggleMenu"
      >
        Meals By Area
      </router-link>
    </div>
  </header>
</template>
