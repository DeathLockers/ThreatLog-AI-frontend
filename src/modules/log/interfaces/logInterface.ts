import { OrderBy, OrderColumns } from '../enums/logEnum';

export interface ListLogsParameterizedBackend {
  page: number;
  items: number;
  filter: string;
  target?: boolean;
  range_date: [string, string];
  order: OrderColumns;
  order_by: OrderBy;
}

export interface ListLogsParameterized {
  page: number;
  items: number;
  filter: string;
  target: boolean;
  rangeDate: [string, string];
  order: OrderColumns;
  orderBy: OrderBy;
}

export interface PredictedLog {
  target?: boolean | null;
}

export interface VerifiedLog {
  target?: boolean | null;
}

export interface ListLogsBackend {
  id: string;
  host: string;
  service: string;
  pid: number;
  message: string;
  datetime: string;
  time_execution: number;
  predicted_log: PredictedLog | null;
  verified_log: VerifiedLog | null;
}

export interface ListLogs {
  id: string;
  host: string;
  service: string;
  pid: number;
  message: string;
  datetime: string;
  timeExecution: number;
  predictedLog: boolean | null;
  verifiedLog: boolean | null;
}
