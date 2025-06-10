<template>
  <div class="bg-white rounded-xl overflow-hidden border border-gray-100 max-md:mt-6">
    <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div class="relative md:w-1/3 w-full">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="h-5 w-5 text-[#707FDD]" />
        </div>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('table.search')"
          class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-white shadow-sm outline-none placeholder-gray-400 transition duration-200"
        />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-[#f9fbfc]">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="column.key"
              scope="col"
              :class="[
                'px-6 py-3 text-left text-xs font-semibold text-[#707FDD] uppercase tracking-wider',
                index === 0 ? 'rounded-tl-xl' : '',
                index === columns.length - 1 ? 'rounded-tr-xl' : '',
              ]"
            >
              <div class="flex items-center">
                <component :is="getColumnIcon(column.key)" class="h-4 w-4 mr-2" />
                {{ column.label }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="(item, itemIndex) in paginatedData"
            :key="item.id"
            :class="itemIndex % 2 === 0 ? 'bg-white' : 'bg-blue-50'"
            class="hover:bg-blue-100 transition duration-150"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="[
                'px-6 py-4 whitespace-nowrap text-sm',
                isStatusColumn(column.key) ? 'font-medium' : 'text-gray-700',
              ]"
            >
              <div class="flex items-center">
                <template v-if="isStatusColumn(column.key)">
                  <span
                    :class="getStatusClasses(item[column.key])"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    <component :is="getStatusIcon(item[column.key])" class="h-3 w-3 mr-1" />
                    {{ item[column.key] }}
                  </span>
                </template>
                <template v-else-if="isActionColumn(column.key)">
                  <div class="flex gap-4 items-center">
                    <button
                      @click="$emit('action', item)"
                      class="text-[#707FDD] hover:text-indigo-900 flex items-center gap-1"
                    >
                      <Edit class="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      @click="$emit('action', item)"
                      class="text-red-500 hover:text-indigo-900 flex items-center gap-1"
                    >
                      <Trash class="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                </template>
                <template v-else>
                  {{ item[column.key] }}
                </template>
              </div>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td :colspan="columns.length" class="px-6 py-4 text-center text-sm text-gray-500">
              <div class="flex flex-col items-center justify-center py-8">
                <FolderSearch class="h-10 w-10 text-gray-300 mb-2" />
                {{ t('table.no_results') }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="px-4 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50 rounded-b-xl"
    >
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft class="h-4 w-4 mr-1" />
          {{ t('table.previous') }}
        </button>
        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ t('table.next') }}
          <ChevronRight class="h-4 w-4 ml-1" />
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            {{ t('table.showing') }}
            <span class="font-medium text-[#707FDD]">{{ startItem }}</span>
            {{ t('table.to') }}
            <span class="font-medium text-[#707FDD]">{{ endItem }}</span>
            {{ t('table.of') }}
            <span class="font-medium text-[#5A67BA]">{{ filteredData.length }}</span>
            {{ t('table.results') }}
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="page !== '...' ? (currentPage = page) : null"
              :disabled="page === '...'"
              :class="{
                'bg-[#5A67BA] text-white border-[#5A67BA]': page === currentPage,
                'bg-white border-gray-300 text-gray-500 hover:bg-gray-50':
                  page !== currentPage && page !== '...',
                'cursor-default': page === '...',
              }"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              {{ page }}
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    Search,
    ChevronLeft,
    ChevronRight,
    Edit,
    Trash,
    FolderSearch,
    CheckCircle,
    XCircle,
    Clock,
    User,
    Mail,
    Calendar,
    Tag,
  } from 'lucide-vue-next';
  import { computed, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const props = defineProps({
    data: {
      type: Array as () => Record<string, any>[],
      required: true,
    },
    columns: {
      type: Array as () => { key: string; label: string }[],
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    maxVisiblePages: {
      type: Number,
      default: 5,
    },
  });

  const emit = defineEmits(['action']);

  const searchQuery = ref('');
  const currentPage = ref(1);

  // Fonctions to manage icons and dynamics styles
  const getColumnIcon = (key: string) => {
    const icons: Record<string, any> = {
      name: User,
      email: Mail,
      date: Calendar,
      status: Tag,
      // add other correspondances
    };
    return icons[key] || Tag;
  };

  const isStatusColumn = (key: string) => {
    return key.toLowerCase().includes('status');
  };

  const isActionColumn = (key: string) => {
    return key.toLowerCase().includes('action');
  };

  const getStatusClasses = (status: string) => {
    const statusMap: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-blue-100 text-[#5A67BA]',
      // add other status
    };
    return statusMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      active: CheckCircle,
      inactive: XCircle,
      pending: Clock,
      completed: CheckCircle,
      // add other icons
    };
    return icons[status.toLowerCase()] || Tag;
  };

  // Computed properties
  const filteredData = computed(() => {
    if (!searchQuery.value) return props.data;
    return props.data.filter((item) =>
      props.columns.some((column) =>
        String(item[column.key]).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  });

  const totalPages = computed(() => Math.ceil(filteredData.value.length / props.itemsPerPage));
  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * props.itemsPerPage;
    const end = start + props.itemsPerPage;
    return filteredData.value.slice(start, end);
  });

  const startItem = computed(() => (currentPage.value - 1) * props.itemsPerPage + 1);
  const endItem = computed(() =>
    Math.min(currentPage.value * props.itemsPerPage, filteredData.value.length)
  );

  const visiblePages = computed(() => {
    const pages = [];
    const total = totalPages.value;
    const current = currentPage.value;
    const maxVisible = props.maxVisiblePages;

    // always display the first page
    pages.push(1);

    // Calculate the range around the current page
    let start = Math.max(2, current - Math.floor(maxVisible / 2));
    let end = Math.min(total - 1, start + maxVisible - 1);

    // Adjust if you are near the beginning or the end
    if (current <= Math.floor(maxVisible / 2) + 1) {
      end = Math.min(total - 1, maxVisible);
    } else if (current >= total - Math.floor(maxVisible / 2)) {
      start = Math.max(2, total - maxVisible + 1);
    }

    // Ajouter les points de suspension avant si nécessaire
    if (start > 2) {
      pages.push('...');
    }

    // Add front suspension points if necessary
    for (let i = start; i <= end; i++) {
      if (i > 1 && i < total) {
        pages.push(i);
      }
    }

    // Add suspension points after if necessary
    if (end < total - 1) {
      pages.push('...');
    }

    // Always display the last page if different from the first
    if (total > 1) {
      pages.push(total);
    }

    return pages;
  });
</script>
