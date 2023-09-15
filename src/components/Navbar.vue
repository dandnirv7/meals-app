<template>
  <header
    class="flex items-stretch justify-between h-16 px-4 bg-white shadow-md"
  >
    <router-link :to="{ name: 'home' }" class="inline-flex items-center h-full">
      Home
    </router-link>

    <div>
      <router-link
        :to="{ name: 'byName' }"
        class="inline-flex items-center h-full px-2 transition-colors hover:bg-blue-200"
      >
        Search Meals
      </router-link>
      <router-link
        :to="{ name: 'byLetter' }"
        class="inline-flex items-center h-full px-2 transition-colors hover:bg-blue-200"
      >
        Meals By Letter
      </router-link>
      <router-link
        :to="{ name: 'byIngredients' }"
        class="inline-flex items-center h-full px-2 transition-colors hover:bg-blue-200"
      >
        Meals By Ingredients
      </router-link>
      <router-link
        :to="{ name: 'byArea' }"
        class="inline-flex items-center h-full px-2 transition-colors hover:bg-blue-200"
      >
        Meals By Area
      </router-link>
    </div>
  </header>
</template>
