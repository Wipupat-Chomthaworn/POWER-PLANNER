import { createRouter, createWebHistory } from "vue-router";
import Sign from "../pages/LoginandSignup.vue";
import Notfound from "../pages/404.vue";
// import Calendar from "../pages/Calendar.vue";
import Profile from "../pages/Profile.vue";
import Home from "../pages/Home.vue";
import Start from "../pages/FirstPage.vue";
import Remaining from "../pages/TaskRemining.vue";



const routes = [
  {
    path: "/",
    component: Start,
  },
  {
    path: "/sign",
    component: Sign,
  },
  {
    path: "/:pathMatch(.*)*",
    component: Notfound,
  },
  {
    path: "/remaining",
    component: Remaining,
  },
  {
    path: "/Home",
    component: Home,
  },
  {
    path: "/Profile",
    component: Profile,
  },
  {
    path: "/Main",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
