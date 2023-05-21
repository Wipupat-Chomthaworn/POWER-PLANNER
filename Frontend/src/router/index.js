
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
import Task from "../pages/Taskpage.vue";
import NewTask from "../pages/NewTask.vue";
import NewSubtask from "../pages/NewSubtask.vue";

import ResetPass from "../pages/Resetpass.vue"


import ViewUser from "../pages/ViewUser.vue";
import ViewTasks from "../pages/ViewTask.vue";




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
      path: "/taskGroups/:taskGroupId/tasks",
      meta: { login: true },
      component: NewTask,
    },
    {
      path: "/taskGroups/:taskId/subtask",
      meta: { login: true },
      component: NewSubtask,
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
      path: "/ViewTasks",
      meta: { login: true },
      component: ViewTasks,
    },

    {
      path: "/home",
      name: "home",
      meta: { login: true },
      component: Home,
    },
    {//try
      path: "/t",
      name: "t",
      meta: { login: true },
      component: Task,
    },
    {
      path: "/profile",
      name: "profile",
      meta: { login: true },
      component: Profile,
    },
    {
      path: "/resetPassword",
      name: "Resetpass",
      component: ResetPass,
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
  else{
    localStorage.setItem("t", "c")
  }

  next();
});

export default router;
