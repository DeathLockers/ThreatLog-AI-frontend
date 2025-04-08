export interface ChartLinePeriodBackend {
  periods: string[];
  total: number[];
}

export interface ChartLinePeriod {
  periods: string[];
  total: number[];
}

export interface ChartLinePeriodOptions {
  chart: Chart;
  dataLabels: DataLabels;
  stroke: Stroke;
  grid: Grid;
  xaxis: Xaxis;
}

export interface Chart {
  height: number;
  type: string;
  zoom: DataLabels;
}

export interface DataLabels {
  enabled: boolean;
}

export interface Grid {
  row: Row;
}

export interface Row {
  colors: string[];
  opacity: number;
}

export interface Stroke {
  curve: string;
}

export interface Xaxis {
  categories: string[];
}

export interface ChartLinePeriodSeries {
  name: string;
  data: number[];
}
