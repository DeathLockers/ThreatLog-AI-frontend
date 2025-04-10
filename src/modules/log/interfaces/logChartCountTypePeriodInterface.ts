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

interface Chart {
  type: string;
  height: number;
  stacked: boolean;
  toolbar: Toolbar;
  zoom: Zoom;
}

interface Toolbar {
  show: boolean;
}

interface Zoom {
  enabled: boolean;
}

interface Fill {
  opacity: number;
}

interface ChartCountTypePeriodOptionsLegend {
  position: string;
  offsetY: number;
}

interface PlotOptions {
  bar: Bar;
}

interface Bar {
  horizontal: boolean;
  borderRadius: number;
  borderRadiusApplication: string;
  borderRadiusWhenStacked: string;
  dataLabels: DataLabels;
}

interface DataLabels {
  total: Total;
}

interface Total {
  enabled: boolean;
  style: Style;
}

interface Style {
  fontSize: string;
  fontWeight: number;
}

interface Responsive {
  breakpoint: number;
  options: Options;
}

interface Options {
  legend: OptionsLegend;
}

interface OptionsLegend {
  position: string;
  offsetX: number;
  offsetY: number;
}

interface Xaxis {
  type: string;
  categories: string[];
}
