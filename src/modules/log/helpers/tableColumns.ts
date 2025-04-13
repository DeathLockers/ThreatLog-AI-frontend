import { i18n } from 'boot/i18n';
import { TableColumnsLabel, TableColumnsName } from '../enums/logEnum';
import { PredictedLog, VerifiedLog } from '../interfaces/logInterface';

interface TableColumn {
  name: TableColumnsName;
  label: string;
  field: string | ((row: PredictedLog | VerifiedLog) => boolean | null);
  align: 'left' | 'center' | 'right';
  required: boolean;
  sortable: boolean;
  sort?: (a: string, b: string) => number;
  format?: (val: boolean | null) => string;
}

const listLogsColumns: TableColumn[] = [
  {
    name: TableColumnsName.VERIFIED_LOG,
    label: i18n.global.t(TableColumnsLabel.VERIFIED_LOG),
    field: (row: VerifiedLog) => row.target ?? null,
    align: 'center',
    format: (val: any) => `${val ? i18n.global.t('Verified') : 'Sin verificar'}`,
    required: true,
    sortable: false,
  },
  {
    name: TableColumnsName.DATETIME,
    label: i18n.global.t(TableColumnsLabel.DATETIME),
    field: TableColumnsName.DATETIME,
    sort: (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime(),
    align: 'left',
    required: false,
    sortable: true,
  },
  {
    name: TableColumnsName.PREDICTED_LOG,
    label: i18n.global.t(TableColumnsLabel.PREDICTED_LOG),
    field: TableColumnsName.PREDICTED_LOG,
    align: 'left',
    format: (val: any) => `${val ? i18n.global.t('Anomaly detected') : i18n.global.t('Log')}`,
    required: false,
    sortable: false,
  },
  {
    name: TableColumnsName.ID,
    label: i18n.global.t(TableColumnsLabel.ID),
    field: TableColumnsName.ID,
    align: 'left',
    required: false,
    sortable: false,
  },
  {
    name: TableColumnsName.HOST,
    label: i18n.global.t(TableColumnsLabel.HOST),
    field: TableColumnsName.HOST,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: TableColumnsName.SERVICE,
    label: i18n.global.t(TableColumnsLabel.SERVICE),
    field: TableColumnsName.SERVICE,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: TableColumnsName.PID,
    label: i18n.global.t(TableColumnsLabel.PID),
    field: TableColumnsName.PID,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: TableColumnsName.MESSAGE,
    label: i18n.global.t(TableColumnsLabel.MESSAGE),
    field: TableColumnsName.MESSAGE,
    align: 'left',
    required: true,
    sortable: true,
  },
  {
    name: TableColumnsName.TIME_EXECUTION,
    label: i18n.global.t(TableColumnsLabel.TIME_EXECUTION),
    field: TableColumnsName.TIME_EXECUTION,
    align: 'left',
    required: true,
    sortable: true,
  },
];

const logsVisibleColumns: string[] = [
  TableColumnsName.HOST,
  TableColumnsName.SERVICE,
  TableColumnsName.PID,
  TableColumnsName.MESSAGE,
  TableColumnsName.DATETIME,
  TableColumnsName.VERIFIED_LOG,
];

export { listLogsColumns, logsVisibleColumns };
