<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold">Bienvenue, , {{ user?.name }}!</h2>
    <p>Contenu de la page d'accueil...</p>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { currentUser: user } = storeToRefs(authStore);
</script>
