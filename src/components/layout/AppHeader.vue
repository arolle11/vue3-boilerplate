<template>
  <header class="md:border-b md:border-[#C8CBD9] shadow py-6 px-12">
    <div class="container flex justify-between items-center">
      <button
        @click="uiStore.toggleSidebar"
        class="md:hidden p-2 focus:outline-none text-[#C8CBD9] text-3xl"
      >
        ☰
      </button>

      <nav class="hidden md:block w-full">
        <div class="flex items-center justify-between gap-12">
          <div class="flex flex-1">
            <form class="w-full">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only"
                >Search</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                  <Search class="w-4 h-4 text-[#1F384C]" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-[#1F384C] rounded-lg bg-[#F1F2F7] outline-none"
                  placeholder="Search..."
                  required
                />
              </div>
            </form>
          </div>

          <div class="flex items-center gap-4">
            <div
              class="p-2 bg-orange-200 flex items-center justify-center rounded-full text-xs"
            >
              <Hamburger class="w-6 h-6" />
            </div>

            <button
              class="text-[#273240] rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              Delicious Burger
              <ChevronDown class="w-4 h-4" />
            </button>
            <BellDot class="w-6 h-6" />
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useUIStore } from "@/stores/ui";
import { BellDot, Hamburger, ChevronDown, Search } from "lucide-vue-next";
const uiStore = useUIStore();
</script>
