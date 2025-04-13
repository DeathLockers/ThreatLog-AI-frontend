import { useLogChartStore } from '../stores/logChartStore';

const logChartStore = useLogChartStore();

const getAllDataCharts = async (): Promise<void> => {
  await Promise.all([
    logChartStore.getChartLinesPeriods(),
    logChartStore.getChartTotalTypes(),
    logChartStore.getChartCountTypesPeriods(),
  ]);
};

const reloadDataChartsEvery5Minute = async (): Promise<void> => {
  const now: Date = new Date();
  const minutes: number = now.getMinutes();

  const timeUntilNextRun: number = (5 - (minutes % 5)) * 60 * 1000 - now.getSeconds() * 1000;

  setTimeout(() => {
    getAllDataCharts();

    setInterval(() => {
      getAllDataCharts();
    }, 5 * 60 * 1000);
  }, timeUntilNextRun);
};

export { reloadDataChartsEvery5Minute };
