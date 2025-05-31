<script setup lang="ts">
import { useUIStore } from "@/stores/ui";

const uiStore = useUIStore();
</script>

<template>
  <header class="bg-blue-600 text-white p-4 shadow-md z-40">
    <div class="container mx-auto flex justify-between items-center">
      <button
        @click="uiStore.toggleSidebar"
        class="md:hidden p-2 focus:outline-none"
      >
        ☰
      </button>
      <h1 class="text-xl font-bold">Mon App</h1>
      <nav class="hidden md:block">
        <!-- Navigation desktop ici -->
      </nav>
    </div>
  </header>
</template>
