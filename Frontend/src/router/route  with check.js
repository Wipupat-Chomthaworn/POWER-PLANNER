import Vue from "vue";
import VueRouter from "vue-router";
import Sign from "../pages/LoginandSignup.vue";
import Notfound from "../pages/404.vue";
// import Calendar from "../pages/Calendar.vue";
import Profile from "../pages/Profile.vue";
import Home from "../pages/Home.vue";
import Start from "../pages/FirstPage.vue";
import NewTask from "../pages/NewTask.vue";
import Remaining from "../pages/TaskRemining.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Start,
  },
  {
    path: "/sign",
    meta: { guess: true },
    component: Sign,
  },
  {
    path:"/login",
    meta: { guess: true },
    component:log,
  },
  {
    path: "/:pathMatch(.*)*",
    component: Notfound,
  },
  {
    path: "/new",
    meta: { login: true },
    component: NewTask,
  },
  {
    path: "/remaining",
    meta: { login: true },
    component: Remaining,
  },
  {
    path: "/Home",
    meta: { login: true },
    component: Home,
  },
  {
    path: "/Profile",
    meta: { login: true },
    component: Profile,
  },
  {
    path: "/Main",
    meta: { login: true },
    component: Profile,
  }
];
const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (to.meta.login && !isLoggedIn) {
    alert("Please login first!");
    next({ path: "/user/login" });
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in");
    next({ path: "/" });
  }

  next();
});


export default router;
