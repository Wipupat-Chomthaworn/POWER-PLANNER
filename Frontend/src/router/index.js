// import { createRouter, createWebHistory } from "vue-router";
// import Sign from "../pages/LoginandSignup.vue";
// import Notfound from "../pages/404.vue";
// // import Calendar from "../pages/Calendar.vue";
// import Profile from "../pages/Profile.vue";
// import Home from "../pages/Home.vue";
// import Start from "../pages/FirstPage.vue";
// import AddTask from "../pages/AddTask.vue";
// import NewGroup from "../pages/NewGroup.vue";

// import Remaining from "../pages/TaskRemining.vue";
// // import Log from "../pages/Login.vue";

// const routes = [
//   {
//     path: "/",
//     component: Start,
//   },
//   {
//     path: "/sign",
//     component: Sign,
//   },
//   // {
//   //   path: "/log",
//   //   component: log,
//   // },
//   {
//     path: "/:pathMatch(.*)*",
//     component: Notfound,
//   },
//   {
//     path: "/new",
//     component: NewGroup,
//   },
//   {
//     path: "/newtask/:group_id",
//     component: AddTask,
//   },
//   {
//     path: "/remaining",
//     component: Remaining,
//   },
//   {
//     path: "/Home",
//     component: Home,
//   },
//   {
//     path: "/Profile",
//     component: Profile,
//   },
//   {
//     path: "/Main",
//     component: Profile,
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
import { createRouter, createWebHistory } from "vue-router";
import Sign from "../pages/Signup.vue";
import Log from "../pages/Login.vue";

import Notfound from "../pages/404.vue";
import Profile from "../pages/Profile.vue";
import Home from "../pages/Home.vue";
import Start from "../pages/FirstPage.vue";
import AddTask from "../pages/AddTask.vue";
import NewGroup from "../pages/NewGroup.vue";
import Remaining from "../pages/TaskRemining.vue";
import Kanban from "../pages/Kanban.vue";
import Task from "../pages/Task.vue"


import ViewUser from "../pages/ViewUser.vue";



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Start,
    },
    {
      path: "/sign",
      component: Sign,
    },
    {
      path: "/log",
      component: Log,
    },
    {
      path: "/new",
      meta: { login: true },
      component: NewGroup,
    },
    {
      path: "/newtask/:group_id",
      meta: { login: true },
      component: AddTask,
    },
    {
      path: "/remaining",
      meta: { login: true },
      component: Remaining,
    },
    {
      path: "/kanban",
      meta: { login: true },
      component: Kanban,
    },
    {
      path: "/task",
      meta: { login: true },
      component: Task,
    },

    {
      path: "/Viewusers",
      meta: { login: true },
      component: ViewUser,
    },

    {
      path: "/home",
      name: "home",
      meta: { login: true },
      component: Home,
    },
    {
      path: "/profile",
      name: "profile",
      meta: { login: true },
      component: Profile,
    },
    {
      path: "/:pathMatch(.*)*",
      component: Notfound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (to.meta.login && !isLoggedIn) {
    alert("Please login first!");
    next({ path: "/log" });
  }

  next();
});

export default router;
