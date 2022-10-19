import { createRouter, createWebHistory } from "vue-router";
import OptionApi from "../views/OptionApi.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/optionapi",
      name: "optionapi",
      component: OptionApi,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/directive",
      name: "directive",
      component: () => import("../views/Directive.vue"),
    },
    {
      path: "/refs",
      name: "refs",
      component: () => import("../views/RefsView.vue"),
    },
  ],
});

export default router;
