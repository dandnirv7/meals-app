<script setup>
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import ScrollUpButton from "../components/ScrollUpButton.vue";

const router = useRouter();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <a
        @click="router.go(-1)"
        class="cursor-pointer ml-5 mt-5 flex items-center w-max"
      >
        <span class="material-symbols-outlined"> arrow_back </span>
      </a>

      <router-view />
      <ScrollUpButton />
    </main>
    <Footer />
  </div>
</template>
