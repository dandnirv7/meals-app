import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../views/DefaultLayout.vue";
import HomeView from "../views/HomeView.vue";
import MealsByName from "../views/MealsByName.vue";
import MealsByLetter from "../views/MealsByLetter.vue";
import MealsByIngredients from "../views/MealsByIngredients.vue";
import MealDetails from "../views/MealDetails.vue";
import MealsByMainIngredient from "../views/MealsByMainIngredient.vue";
import MealsByArea from "../views/MealsByArea.vue";
import AreaDetails from "../views/AreaDetails.vue";
import MealsByCategories from "../views/MealsByCategories.vue";
import CategoryDetails from "../views/CategoryDetails.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
    component: DefaultLayout,
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      // {
      //   path: "letter/:letter",
      //   name: "letter",
      //   component: MealList,
      // },
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
      {
        path: "/by-area/:areas?",
        name: "byArea",
        component: MealsByArea,
      },
      {
        path: "/by-area/:area",
        name: "areaDetails",
        component: AreaDetails,
      },
      {
        path: "/by-categories/:categories?",
        name: "byCategories",
        component: MealsByCategories,
      },
      {
        path: "/by-categories/:category",
        name: "categoryDetails",
        component: CategoryDetails,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
