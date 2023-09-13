import { defineStore } from "pinia";
import axiosClient from "../axiosClient";

export const useMealsStore = defineStore("mealsStore", {
  state: () => ({
    keyword: "",
    meal: [],
  }),
  actions: {
    async searchMeals() {
      if (this.keyword.trim() === "") {
        this.meal = [];
        return;
      }

      try {
        const response = await axiosClient.get(`search.php?s=${this.keyword}`);
        if (response.status === 200) {
          this.meal = response.data.meals;
        } else {
          throw new Error("Failed to fetch data from the API.");
        }
      } catch (error) {
        console.error(error);
        this.meal = [];
      }
    },
    async firstLetter() {
      if (this.keyword.trim() === "") {
        this.meal = [];
        return;
      }

      try {
        const response = await axiosClient.get(`search.php?f=${this.keyword}`);
        if (response.status === 200) {
          this.meal = response.data.meals;
        } else {
          throw new Error("Failed to fetch data from the API.");
        }
      } catch (error) {
        console.error(error);
        this.meal = [];
      }
    },
  },
});
