<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { i18n } from 'boot/i18n';
import { useLogChartStore } from '../stores/logChartStore';
import useLog from '../composables/useLog';
import type { ChartCountTypePeriodOptions, ChartCountTypePeriodSeries } from '../interfaces/logChartInterface';

const logChartStore = useLogChartStore();
const { chartCountTypesPeriods } = storeToRefs(logChartStore);
const { logColor, anomalyColor } = useLog()


onBeforeMount(async () => {
  if (!chartCountTypesPeriods.value.dailyAnomalies.count.length)
    await logChartStore.getChartCountTypesPeriods()
});

const series = computed<ChartCountTypePeriodSeries[]>(() => {
  return [
    {
      name: i18n.global.t('Logs'),
      data: chartCountTypesPeriods.value.dailyNonAnomalies.count
    },
    {
      name: i18n.global.t('Logs detected as anomaly'),
      data: chartCountTypesPeriods.value.dailyAnomalies.count
    }];
});

const chartOptions = computed<ChartCountTypePeriodOptions>(() => {
  return {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    colors: [logColor, anomalyColor],
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    xaxis: {
      type: 'datetime',
      categories: chartCountTypesPeriods.value.dailyAnomalies.dates,
    },
    legend: {
      position: 'bottom',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  }
});

</script>

<template>
  <div class="q-mb-lg">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>

</template>

<style lang="sass" scoped></style>
