<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
import { computed } from "vue";

const uiStore = useUIStore();

// Fermer le sidebar sur mobile quand on clique sur un lien
const closeSidebar = () => {
  if (window.innerWidth < 768) {
    uiStore.isSidebarOpen = false;
  }
};
</script>

<template>
  <aside
    class="absolute bg-gray-800 text-white w-64 md:static h-full transition-all duration-300 z-1000"
    :class="{
      '-translate-x-full md:translate-x-0': !uiStore.isSidebarOpen,
      'translate-x-0': uiStore.isSidebarOpen,
    }"
  >
    <div class="p-4">
      <nav @click="closeSidebar">
        <!-- Liens de navigation -->
        <RouterLink to="/" class="block py-2 hover:bg-blue-700"
          >Accueil</RouterLink
        >
      </nav>
    </div>
  </aside>
</template>
