<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const showButton = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleScroll = () => {
  if (window.scrollY > 200) {
    showButton.value = true;
  } else {
    showButton.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <button
    @click="scrollToTop"
    v-show="showButton"
    class="fixed bottom-4 right-4 bg-amber-500 text-white px-4 py-2 w-10 h-10 lg:w-12 lg:h-12 md:w-10 md:h-10 rounded-full shadow-md cursor-pointer flex items-center justify-center"
  >
    <i class="material-symbols-outlined">arrow_drop_up</i>
  </button>
</template>

<style scoped>
.material-symbols-outlined {
  font-size: 28px;
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 0;
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .material-symbols-outlined {
    font-size: 32px;
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 0;
  }
}
@media screen and (min-width: 1024px) {
  .material-symbols-outlined {
    font-size: 40px;
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 0;
  }
}
</style>
