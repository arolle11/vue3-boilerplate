<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="flex flex-1">
      <AppSidebar />
      <div
        v-if="uiStore.isSidebarOpen"
        class="inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        @click="uiStore.toggleSidebar"
      ></div>
      <main class="flex-1 p-4 bg-gray-50">
        <RouterView />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import { useUIStore } from "@/stores/ui";

const uiStore = useUIStore();
</script>
