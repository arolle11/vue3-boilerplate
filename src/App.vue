<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
  import DefaultLayout from '@/components/layout/DefaultLayout.vue';
  import BlankLayout from '@/components/layout/BlankLayout.vue';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();
  const layoutComponent = computed(() => {
    return route.meta.layout === 'blank' ? BlankLayout : DefaultLayout;
  });
</script>
