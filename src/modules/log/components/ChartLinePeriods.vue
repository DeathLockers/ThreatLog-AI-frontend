<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { i18n } from 'boot/i18n';
import { useLogChartStore } from '../stores/logChartStore';
import useLog from '../composables/useLog';
import type { ChartLinePeriodSeries, ChartLinePeriodOptions } from '../interfaces/logChartInterface';

const logChartStore = useLogChartStore();
const { chartLinesPeriods } = storeToRefs(logChartStore);
const { anomalyColor } = useLog()

onBeforeMount(async () => {
  if (!chartLinesPeriods.value.periods.length)
    await logChartStore.getChartLinesPeriods()
});

const series = computed<ChartLinePeriodSeries[]>(() => {
  return [{
    name: i18n.global.t('Anomalies detected'),
    data: chartLinesPeriods.value.total
  }];
});

const chartOptions = computed<ChartLinePeriodOptions>(() => {
  return {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },

    grid: {
      row: {
        colors: ['#F3F3F3', 'transparent'],
        opacity: 0.5,
      },
    },
    colors: [anomalyColor],
    xaxis: {
      categories: chartLinesPeriods.value.periods,
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return val.toFixed(0);
        }
      },
    },
  }
});
</script>

<template>
  <div class="text-h5 div-chart-title q-mb-md">{{ $t('Real-time anomaly detection') }}</div>
  <q-card class="q-mb-xl">
    <q-card-section>
      <div class="div-chart">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
    </q-card-section>
  </q-card>

</template>

<style lang="sass" scoped>
@media (max-width: 520px)
  .div-chart-title
    font-size: 17px
  .div-chart
    margin-bottom: 5px
</style>
