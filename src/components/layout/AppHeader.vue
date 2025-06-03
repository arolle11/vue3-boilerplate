<template>
  <header class="p-6 z-40 md:border-b md:border-[#C8CBD9]">
    <div class="container mx-auto flex justify-between items-center">
      <button
        @click="uiStore.toggleSidebar"
        class="md:hidden p-2 focus:outline-none text-[#C8CBD9] text-3xl"
      >
        ☰
      </button>

      <nav class="hidden md:block">
        <div class="flex items-center justify-between">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. molestias,
            blanditiis eum aliquid dignissimos fuga eveniet nesciunt nam cumque!
            Doloribus, distinctio excepturi
          </div>
          <div class="flex items-center">
            <div
              class="p-2 bg-orange-200 flex items-center justify-center rounded-full text-xs"
            >
              <Hamburger class="w-6 h-6" />
            </div>
            <BellDot class="w-6 h-6" />
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
import { BellDot, Hamburger } from "lucide-vue-next";
const uiStore = useUIStore();
</script>
