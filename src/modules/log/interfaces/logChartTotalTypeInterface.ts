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

export interface ChartOptionsChart {
  width: number;
  type: string;
}

export interface Legend {
  position: string;
  horizontalAlign: string;
}

export interface Responsive {
  breakpoint: number;
  options: Options;
}

export interface Options {
  chart: OptionsChart;
}

export interface OptionsChart {
  width: number;
}
