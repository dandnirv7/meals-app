import { createPinia, defineStore } from "pinia";
import axiosClient from "../axiosClient";

const pinia = createPinia();

import { useMealsStore } from "./meals";

export { pinia, useMealsStore };
