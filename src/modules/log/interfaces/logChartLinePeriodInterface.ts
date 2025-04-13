export interface ChartLinePeriodBackend {
  periods: string[];
  total: number[];
}

export interface ChartLinePeriod {
  periods: string[];
  total: number[];
}

export interface ChartLinePeriodSeries {
  name: string;
  data: number[];
}

export interface ChartLinePeriodOptions {
  chart: Chart;
  dataLabels: DataLabels;
  stroke: Stroke;
  grid: Grid;
  xaxis: Xaxis;
}

interface Chart {
  height: number;
  type: string;
  zoom: DataLabels;
}

interface DataLabels {
  enabled: boolean;
}

interface Grid {
  row: Row;
}

interface Row {
  colors: string[];
  opacity: number;
}

interface Stroke {
  curve: string;
}

interface Xaxis {
  categories: string[];
}
