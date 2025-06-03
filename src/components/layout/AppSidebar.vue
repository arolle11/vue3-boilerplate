<template>
  <aside
    class="bg-[#F1F2F7] text-black w-64 h-full md:static fixed top-0 left-0 transition-all duration-300 z-50"
    :class="{
      '-translate-x-full md:translate-x-0': !uiStore.isSidebarOpen,
      'translate-x-0': uiStore.isSidebarOpen,
    }"
  >
    <div class="flex items-center gap-2 p-6 border-b border-[#d9c8d3]">
      <div
        class="text-white bg-[#5A67BA] flex items-center justify-center w-6 h-6 rounded-full text-xs"
      >
        G
      </div>
      <h1 class="text-xs font-bold text-[#5A67BA]">Good Food</h1>
    </div>

    <div class="p-6">
      <nav @click="closeSidebar" class="space-y-6">
        <ul class="space-y-4 mt-6 text-[#273240]">
          <span class="">MENU</span>
          <li class="mt-4">
            <RouterLink
              to="/"
              class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
            >
              <LayoutDashboard class="w-6 h-6" />Dashboard</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/"
              class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
            >
              <ShoppingCart class="w-6 h-6" />Food Order</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/"
              class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
              ><BookText class="w-6 h-6" />Manage Menu</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/"
              class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
              ><MessageCircleMore class="w-6 h-6" />Customer Review</RouterLink
            >
          </li>
        </ul>
        <ul class="space-y-4 text-[#273240]">
          <span></span>
          OTHERS
          <li class="mt-4">
            <RouterLink
              to="/"
              class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
              ><Settings class="w-6 h-6" /> Settings</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/"
              class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
              ><CreditCard class="w-6 h-6" />Payment</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/"
              class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
              ><User class="w-6 h-6" /> Accounts</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/"
              class="flex gap-2 hover:bg-[#e3e7f4] hover:text-[#707FDD] p-2"
              ><Info class="w-6 h-6" />Help</RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
import {
  LayoutDashboard,
  ShoppingCart,
  BookText,
  MessageCircleMore,
  Info,
  User,
  CreditCard,
  Settings,
} from "lucide-vue-next";

const uiStore = useUIStore();

const closeSidebar = () => {
  if (window.innerWidth < 768) {
    uiStore.isSidebarOpen = false;
  }
};
</script>
