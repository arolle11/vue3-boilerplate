import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "blank" },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { layout: "blank" },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { layout: "default" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
