import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../views/DefaultLayout.vue";
import HomeView from "../views/HomeView.vue";
import MealList from "../views/MealList.vue";
import MealsByName from "../views/MealsByName.vue";
import MealsByLetter from "../views/MealsByLetter.vue";
import MealsByIngredients from "../views/MealsByIngredients.vue";
import MealDetails from "../views/MealDetails.vue";
import MealsByMainIngredient from "../views/MealsByMainIngredient.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      {
        path: "letter/:letter",
        name: "letter",
        component: MealList,
      },
      {
        path: "by-name/:name?",
        name: "byName",
        component: MealsByName,
      },
      {
        path: "by-letter/:letter?",
        name: "byLetter",
        component: MealsByLetter,
      },
      {
        path: "by-ingredients/:ingredients?",
        name: "byIngredients",
        component: MealsByIngredients,
      },
      {
        path: "/meal/:id",
        name: "mealDetails",
        component: MealDetails,
      },
      {
        path: "/by-main-ingredient/:ingredient",
        name: "byMainIngredient",
        component: MealsByMainIngredient,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
