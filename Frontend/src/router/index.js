import { createRouter, createWebHistory } from "vue-router";
import Sign from "../pages/LoginandSignup.vue";
import Notfound from "../pages/404.vue";
// import Calendar from "../pages/Calendar.vue";
import Profile from "../pages/Profile.vue";
import Home from "../pages/Home.vue";
import Start from "../pages/FirstPage.vue";
import NewTask from "../pages/NewTask.vue";
import Remaining from "../pages/TaskRemining.vue";
// import Log from "../pages/Login.vue";




const routes = [
  {
    path: "/",
    component: Start,
  },
  {
    path: "/sign",
    component: Sign,
  },
  // {
  //   path: "/log",
  //   component: log,
  // },
  {
    path: "/:pathMatch(.*)*",
    component: Notfound,
  },
  {
    path: "/new",
    component: NewTask,
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
