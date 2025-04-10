export interface ChartTotalTypeBackend {
  total_anomaly: number;
  total_non_anomaly: number;
}

export interface ChartTotalType {
  totalAnomaly: number;
  totalNonAnomaly: number;
}

export interface ChartTotalTypeOptions {
  chart: ChartOptionsChart;
  colors: string[];
  labels: string[];
  responsive: Responsive[];
  legend: Legend;
}

interface ChartOptionsChart {
  width: number;
  type: string;
}

interface Legend {
  position: string;
  horizontalAlign: string;
}

interface Responsive {
  breakpoint: number;
  options: Options;
}

interface Options {
  chart: OptionsChart;
}

interface OptionsChart {
  width: number;
}
