import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Setting from "../views/Setting.vue";
import { useAuthStore } from "@/stores/auth";
import { i18n } from "../plugins/i18n";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      layout: "blank",
      // title: "auth.login.title",
      // title: "login",
      requiresGuest: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      layout: "blank",
      // title: "register",
      requiresGuest: true,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      layout: "default",
      // title: "home",
      requiresAuth: true,
    },
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: {
      layout: "default",
      // title: "settings",
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/home",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.afterEach((to) => {
  const { t } = i18n.global;

  if (to.meta.title) {
    document.title = `${t(to.meta.title as string)} | ${t("app.name")}`;
  }
});

// Garde de navigation
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "Login", query: { redirect: to.fullPath } });
    return;
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: "Home" });
    return;
  }

  next();
});

export default router;
