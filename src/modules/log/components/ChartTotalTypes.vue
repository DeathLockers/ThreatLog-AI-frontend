<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { i18n } from 'boot/i18n';
import { useLogChartStore } from '../stores/logChartStore';
import useLog from '../composables/useLog';
import type { ChartTotalTypeOptions } from '../interfaces/logChartInterface';

const logChartStore = useLogChartStore();
const { chartTotalTypes } = storeToRefs(logChartStore);
const { logColor, anomalyColor } = useLog()


onBeforeMount(async () => {
  if (chartTotalTypes.value.totalNonAnomaly === 0)
    await logChartStore.getChartTotalTypes()
});

const series = computed<number[]>(() => {
  return [chartTotalTypes.value.totalAnomaly, chartTotalTypes.value.totalNonAnomaly];
});

const chartOptions = computed<ChartTotalTypeOptions>(() => {
  return {
    chart: {
      width: 380,
      type: 'pie',
    },
    colors: [anomalyColor, logColor],
    labels: [i18n.global.t('Logs detected as anomaly'), i18n.global.t('Logs')],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
      },
    }],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
  }
});

</script>

<template>
  <div>
    <apexchart type="pie" width="395" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style lang="sass" scoped></style>
