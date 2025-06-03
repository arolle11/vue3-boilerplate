<template>
  <div
    v-if="uiStore.isSidebarOpen"
    class="inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    @click="uiStore.toggleSidebar"
  ></div>
  <div class="flex w-screen h-screen overflow-hidden">
    <AppSidebar />
    <div class="flex flex-col flex-1 min-h-screen bg-white overflow-hidden">
      <AppHeader />
      <main class="flex-1 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import { useUIStore } from "@/stores/ui";

const uiStore = useUIStore();
</script>
