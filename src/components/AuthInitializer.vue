<script setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(() => {
  // Vérifie l'état d'authentification au chargement
  if (localStorage.getItem("isAuthenticated") === "true") {
    authStore.initializeFromLocalStorage();
  }
});
</script>

<template>
  <router-view />
</template>
