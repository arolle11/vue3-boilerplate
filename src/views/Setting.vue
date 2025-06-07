<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">{{ t("settings.title") }}</h1>

    <div class="grid grid-cols-1 gap-6">
      <BarChart :data="activityData" :title="t('settings.activity_chart')" />
    </div>

    <DataTable :data="settingsLog" :columns="logColumns" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import DataTable from "@/components/ui/DataTable.vue";
import BarChart from "@/components/charts/BarChart.vue";

const { t } = useI18n();

const activityData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: t("settings.activities"),
      data: [5, 10, 7, 12, 8, 3, 1],
      backgroundColor: "#F6AD55",
    },
  ],
};

const settingsLog = [
  { id: 1, action: "Password changed", user: "admin", date: "2023-05-01" },
  { id: 2, action: "Profile updated", user: "johndoe", date: "2023-05-02" },
  // ... autres données
];

const logColumns = [
  { key: "action", label: t("settings.action") },
  { key: "user", label: t("settings.user") },
  { key: "date", label: t("settings.date") },
];
</script>
