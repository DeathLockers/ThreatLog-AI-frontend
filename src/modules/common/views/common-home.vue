<script setup lang="ts">
import { onBeforeMount } from 'vue';
import ChartLinePeriods from 'src/modules/log/components/ChartLinePeriods.vue';
import ChartCountTypesPeriods from 'src/modules/log/components/ChartCountTypesPeriods.vue';
import ChartTotalTypes from 'src/modules/log/components/ChartTotalTypes.vue';
import { reloadDataChartsEvery5Minute } from 'src/modules/log/helpers/reloadDataCharts';

onBeforeMount(async () => {
  await reloadDataChartsEvery5Minute()
})
</script>

<template>
  <div class="q-px-md">
    <div class="text-h3 q-mb-xl div-title">{{ $t('Performance metrics') }}</div>
    <ChartLinePeriods />
    <div class="text-h5 div-chart-title q-mb-lg">{{ $t('Anomaly detection from the last week') }}</div>
    <div class="row">
      <div class="col-6 div-mobile-col-12">
        <ChartCountTypesPeriods />
      </div>
      <div class="col-6 justify-center row div-mobile-col-12">
        <ChartTotalTypes />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@media (max-width: 992px)
  .div-mobile-col-12
    width: 100%

@media (max-width: 520px)
  .div-title
    font-size: 30px
    margin-bottom: 14px
  .div-chart-title
    font-size: 17px
    margin-bottom: 16px
</style>
