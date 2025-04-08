export interface ChartCountTypePeriodBackend {
  daily_anomalies: DailyAnomaliesBackend;
  daily_non_anomalies: DailyAnomaliesBackend;
}

export interface DailyAnomaliesBackend {
  dates: string[];
  count: number[];
}

export interface ChartCountTypePeriod {
  dailyAnomalies: DailyAnomalies;
  dailyNonAnomalies: DailyAnomalies;
}

export interface DailyAnomalies {
  dates: string[];
  count: number[];
}


export interface ChartCountTypePeriodSeries {
  name: string,
  data: number[]
}

export interface ChartCountTypePeriodOptions {
  chart: Chart;
  colors: string[];
  responsive: Responsive[];
  plotOptions: PlotOptions;
  xaxis: Xaxis;
  legend: ChartCountTypePeriodOptionsLegend;
  fill: Fill;
}

export interface Chart {
  type: string;
  height: number;
  stacked: boolean;
  toolbar: Toolbar;
  zoom: Zoom;
}

export interface Toolbar {
  show: boolean;
}

export interface Zoom {
  enabled: boolean;
}

export interface Fill {
  opacity: number;
}

export interface ChartCountTypePeriodOptionsLegend {
  position: string;
  offsetY: number;
}

export interface PlotOptions {
  bar: Bar;
}

export interface Bar {
  horizontal: boolean;
  borderRadius: number;
  borderRadiusApplication: string;
  borderRadiusWhenStacked: string;
  dataLabels: DataLabels;
}

export interface DataLabels {
  total: Total;
}

export interface Total {
  enabled: boolean;
  style: Style;
}

export interface Style {
  fontSize: string;
  fontWeight: number;
}

export interface Responsive {
  breakpoint: number;
  options: Options;
}

export interface Options {
  legend: OptionsLegend;
}

export interface OptionsLegend {
  position: string;
  offsetX: number;
  offsetY: number;
}

export interface Xaxis {
  type: string;
  categories: string[];
}
