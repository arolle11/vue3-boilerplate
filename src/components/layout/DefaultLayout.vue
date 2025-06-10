<template>
  <div class="flex w-screen h-screen overflow-hidden">
    <AppSidebar />
    <div class="flex flex-col flex-1 min-h-screen bg-white overflow-hidden">
      <AppHeader />
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
  import AppHeader from '@/components/layout/AppHeader.vue';
  import AppSidebar from '@/components/layout/AppSidebar.vue';
</script>
