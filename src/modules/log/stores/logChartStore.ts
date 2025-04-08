import { computed, ref, reactive, readonly } from 'vue';
import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import type {
  ChartLinePeriodBackend,
  ChartLinePeriod,
  ChartTotalTypeBackend,
  ChartTotalType,
  ChartCountTypePeriodBackend,
  ChartCountTypePeriod,
} from '../interfaces/logChartInterface';

export const useLogChartStore = defineStore('logChart', () => {
  //State
  const chartLinesPeriodsBackendInital: ChartLinePeriodBackend = { periods: [], total: [] };
  const chartTotalTypesBackendInitial: ChartTotalTypeBackend = { total_anomaly: 0, total_non_anomaly: 0 };
  const chartCountTypesPeriodsBackendInitial: ChartCountTypePeriodBackend = {
    daily_anomalies: { dates: [], count: [] },
    daily_non_anomalies: { dates: [], count: [] },
  };

  let chartLinesPeriodsBackend = reactive<ChartLinePeriodBackend>(chartLinesPeriodsBackendInital);
  let chartTotalTypesBackend = reactive<ChartTotalTypeBackend>(chartTotalTypesBackendInitial);
  let chartCountTypesPeriodsBackend = reactive<ChartCountTypePeriodBackend>(chartCountTypesPeriodsBackendInitial);

  const prefixPathLogChart = readonly(ref<string>('logs/charts'));
  //End State

  //Getters
  const chartLinesPeriods = computed<ChartLinePeriod>(() => {
    return {
      periods: chartLinesPeriodsBackend.periods ?? [],
      total: chartLinesPeriodsBackend.total ?? [],
    };
  });

  const chartTotalTypes = computed<ChartTotalType>(() => {
    return {
      totalAnomaly: chartTotalTypesBackend.total_anomaly ?? 0,
      totalNonAnomaly: chartTotalTypesBackend.total_non_anomaly ?? 0,
    };
  });

  const chartCountTypesPeriods = computed<ChartCountTypePeriod>(() => {
    return {
      dailyAnomalies: chartCountTypesPeriodsBackend.daily_anomalies ?? { dates: [], count: [] },
      dailyNonAnomalies: chartCountTypesPeriodsBackend.daily_non_anomalies ?? { dates: [], count: [] },
    };
  });
  //End Getters

  //Actions
  const getChartLinesPeriods = async (): Promise<void> => {
    try {
      const { data } = await api.get<ChartLinePeriodBackend>(`${prefixPathLogChart.value}/line_periods`);
      chartLinesPeriodsBackend.periods = data.periods;
      chartLinesPeriodsBackend.total = data.total;
    } catch (error) {
    } finally {
    }
  };

  const getChartTotalTypes = async (): Promise<void> => {
    try {
      const { data } = await api.get<ChartTotalTypeBackend>(`${prefixPathLogChart.value}/log_total_types`);
      chartTotalTypesBackend.total_anomaly = data.total_anomaly;
      chartTotalTypesBackend.total_non_anomaly = data.total_non_anomaly;
    } catch (error) {
    } finally {
    }
  };

  const getChartCountTypesPeriods = async (): Promise<void> => {
    try {
      const { data } = await api.get<ChartCountTypePeriodBackend>(`${prefixPathLogChart.value}/log_count_types_period`);
      chartCountTypesPeriodsBackend.daily_anomalies = data.daily_anomalies;
      chartCountTypesPeriodsBackend.daily_non_anomalies = data.daily_non_anomalies;
    } catch (error) {
    } finally {
    }
  };
  //End Actions

  //Setters
  const $reset = (): void => {
    chartLinesPeriodsBackend.periods = chartLinesPeriodsBackendInital.periods;
    chartLinesPeriodsBackend.total = chartLinesPeriodsBackendInital.total;

    chartTotalTypesBackend.total_anomaly = chartTotalTypesBackendInitial.total_anomaly;
    chartTotalTypesBackend.total_non_anomaly = chartTotalTypesBackendInitial.total_non_anomaly;

    chartCountTypesPeriodsBackend.daily_anomalies = chartCountTypesPeriodsBackendInitial.daily_anomalies;
    chartCountTypesPeriodsBackend.daily_non_anomalies = chartCountTypesPeriodsBackendInitial.daily_non_anomalies;
  };
  //End Setters

  return {
    //State

    //Getters
    chartLinesPeriods,
    chartTotalTypes,
    chartCountTypesPeriods,

    //Actions
    getChartLinesPeriods,
    getChartTotalTypes,
    getChartCountTypesPeriods,

    //Setters
    $reset,
  };
});
