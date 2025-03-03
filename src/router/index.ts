import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MenuDND from "../views/MenuDND.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/menu-dnd",
      name: "home",
      component: HomeView,
    },
    {
      path: "/menu-dnd",
      name: "Menu-DND",
      component: MenuDND,
    },
  ],
});

export default router;
