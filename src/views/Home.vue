<template>
  <div class="flex flex-col gap-8 p-6 w-full min-h-screen">
    <h1 class="text-2xl font-bold">{{ t('dashboard.title') }} {{ user?.username }}!</h1>

    <div class="flex flex-col md:flex-row gap-6 w-full h-[400px] md:h-[45vh]">
      <div class="flex-1 h-full min-h-[200px]">
        <BarChart
          :data="salesData"
          :options="{ responsive: true, maintainAspectRatio: false }"
          class="h-full w-full"
        />
      </div>
      <div class="flex-1 h-full min-h-[200px]">
        <DoughnutChart
          :data="datass"
          :options="{ responsive: true, maintainAspectRatio: false }"
          class="h-full w-full"
        />
      </div>
    </div>

    <div class="w-full flex-1 min-h-[300px]">
      <DataTable :data="recentOrders" :columns="orderColumns" :items-per-page="5" class="h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import DataTable from '@/components/ui/DataTable.vue';
  import BarChart from '@/components/charts/BarChart.vue';
  import DoughnutChart from '@/components/charts/DoughnutChart.vue';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/auth';

  const authStore = useAuthStore();
  const { currentUser: user } = storeToRefs(authStore);

  const { t } = useI18n();

  const salesData = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    datasets: [
      {
        label: t('dashboard.sales'),
        data: [65, 59, 80, 81, 56, 55, 40, 70, 60, 90, 100, 120],
        backgroundColor: '#707FDD',
      },
    ],
  };
  const datass = {
    labels: ['Ventes', 'Locations', 'Abonnements'],
    datasets: [
      {
        data: [300, 150, 100],
        backgroundColor: ['#707FDD', '#4FD1C5', '#F6AD55'],
      },
    ],
  };

  const recentOrders = [
    {
      id: 1,
      product: 'Product A',
      customer: 'John Doe',
      amount: 120,
      status: 'active',
      action: 'Edit',
    },
    {
      id: 2,
      product: 'Product B',
      customer: 'Jane Smith',
      amount: 89,
      status: 'Pending',
    },
    {
      id: 3,
      product: 'Product A',
      customer: 'John Doe',
      amount: 120,
      status: 'Completed',
    },
    {
      id: 4,
      product: 'Product B',
      customer: 'Jane Smith',
      amount: 89,
      status: 'inactive',
    },
    {
      id: 5,
      product: 'Product A',
      customer: 'John Doe',
      amount: 120,
      status: 'Completed',
    },
    {
      id: 6,
      product: 'Product B',
      customer: 'Jane Smith',
      amount: 89,
      status: 'Pending',
    },
    {
      id: 7,
      product: 'Product A',
      customer: 'John Doe',
      amount: 120,
      status: 'Completed',
    },
    {
      id: 8,
      product: 'Product B',
      customer: 'Jane Smith',
      amount: 89,
      status: 'Pending',
    },
    {
      id: 9,
      product: 'Product A',
      customer: 'John Doe',
      amount: 120,
      status: 'Completed',
    },
    {
      id: 10,
      product: 'Product B',
      customer: 'Jane Smith',
      amount: 89,
      status: 'Pending',
    },
    {
      id: 11,
      product: 'Product A',
      customer: 'John Doe',
      amount: 120,
      status: 'Completed',
    },
    {
      id: 12,
      product: 'Product B',
      customer: 'Jane Smith',
      amount: 89,
      status: 'Pending',
    },
    {
      id: 13,
      product: 'Product A',
      customer: 'John Doe',
      amount: 120,
      status: 'Completed',
    },
    {
      id: 14,
      product: 'Product B',
      customer: 'Jane Smith',
      amount: 89,
      status: 'Pending',
    },
    {
      id: 15,
      product: 'Product A',
      customer: 'John Doe',
      amount: 120,
      status: 'Completed',
    },
    {
      id: 16,
      product: 'Product B',
      customer: 'Jane Smith',
      amount: 89,
      status: 'Pending',
    },
    {
      id: 17,
      product: 'Product A',
      customer: 'John Doe',
      amount: 120,
      status: 'Completed',
    },
    {
      id: 18,
      product: 'Product B',
      customer: 'Jane Smith',
      amount: 89,
      status: 'Pending',
    },
    {
      id: 19,
      product: 'Product A',
      customer: 'John Doe',
      amount: 120,
      status: 'Completed',
    },
    {
      id: 20,
      product: 'Product B',
      customer: 'Jane Smith',
      amount: 89,
      status: 'Pending',
    },
  ];

  const orderColumns = [
    { key: 'product', label: t('dashboard.product') },
    { key: 'customer', label: t('dashboard.customer') },
    { key: 'amount', label: t('dashboard.amount') },
    { key: 'status', label: t('dashboard.status') },
    {
      key: 'action',
      label: t('dashboard.actions'),
      isAction: true,
    },
  ];
</script>
