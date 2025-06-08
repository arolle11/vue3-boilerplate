<template>
  <aside
    class="bg-[#F1F2F7] text-black w-64 h-full md:static fixed top-0 left-0 transition-all duration-300 z-50 p-6"
    :class="{
      '-translate-x-full md:translate-x-0': !uiStore.isSidebarOpen,
      'translate-x-0': uiStore.isSidebarOpen,
    }"
  >
    <div class="flex items-center gap-2">
      <div
        class="text-white bg-[#5A67BA] flex items-center justify-center w-8 h-8 rounded-full text-xs"
      >
        G
      </div>
      <h1 class="text-xs font-bold text-[#5A67BA]">GOODFOOD</h1>
    </div>

    <nav @click="closeSidebar" class="space-y-6">
      <ul class="space-y-4 mt-12 text-[#273240]">
        <span class="">MENU</span>
        <li class="mt-4">
          <router-link
            to="/home"
            class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2 router-link-active:bg-[#e3e7f4] router-link-active:text-[#707FDD]"
          >
            <LayoutDashboard class="w-6 h-6" />Dashboard</router-link
          >
        </li>
        <li>
          <router-link
            to="/"
            class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
          >
            <ShoppingCart class="w-6 h-6" />{{
              t("sidebar.food_order")
            }}</router-link
          >
        </li>
        <li>
          <router-link
            to="/"
            class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
            ><BookText class="w-6 h-6" />{{
              t("sidebar.manage_menu")
            }}</router-link
          >
        </li>
        <li>
          <router-link
            to="/"
            class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
            ><MessageCircleMore class="w-6 h-6" />{{
              t("sidebar.customer_review")
            }}</router-link
          >
        </li>
      </ul>
      <ul class="space-y-4 text-[#273240]">
        <span></span>
        {{
          t("sidebar.others")
        }}
        <li class="mt-4">
          <router-link
            to="/setting"
            class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
            ><Settings class="w-6 h-6" />
            {{ t("sidebar.settings") }}</router-link
          >
        </li>
        <li>
          <router-link
            to="/"
            class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
            ><CreditCard class="w-6 h-6" />{{
              t("sidebar.payment")
            }}</router-link
          >
        </li>
        <li>
          <router-link
            to="/"
            class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
            ><User class="w-6 h-6" /> {{ t("sidebar.accounts") }}</router-link
          >
        </li>
        <li>
          <button
            class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2 cursor-pointer w-full"
            @click="handleLogout"
          >
            <LogOut class="w-6 h-6" />{{ t("sidebar.logout") }}
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useUIStore } from "@/stores/ui";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import {
  LayoutDashboard,
  ShoppingCart,
  BookText,
  MessageCircleMore,
  User,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-vue-next";

const { t, locale } = useI18n();
const uiStore = useUIStore();
const authStore = useAuthStore();
const router = useRouter();

const closeSidebar = () => {
  if (window.innerWidth < 768) {
    uiStore.isSidebarOpen = false;
  }
};
const handleLogout = () => {
  authStore.logout();
  router.push("/");
};
</script>
