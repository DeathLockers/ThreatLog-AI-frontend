<script setup lang="ts">
import { inject, ref, toRefs, useTemplateRef } from 'vue';
import { QTable } from 'quasar';
import type { ListLogs, ListLogsParameterized } from '../interfaces/logInterface';
import type { VerifiedLog } from '../interfaces/logVerifiedInterface';
import { OrderBy, OrderColumns, TableColumnsName, TableRowKey } from '../enums/logEnum';
import { ListLogsParameterizedType } from '../types/logType';
import { listLogsColumns, logsVisibleColumns } from '../helpers/tableColumns';
import LogListTableFilter from './LogListTable/LogListTableFilter.vue';
import LogListTableFilterDates from './LogListTable/LogListTableFilterDates.vue';
import LogListTableFilterOnlyAnomalies from './LogListTable/LogListTableFilterOnlyAnomalies.vue';

interface Props {
  rows: ListLogs[];
  isLoading: boolean
}

interface Pagination {
  page: number;
  rowsPerPage: number;
  sortBy: TableColumnsName | string | null;
  descending: boolean;
  rowsNumber?: number;
}

interface RequestProps {
  pagination: Pagination;
  filter?: string;
}

interface VirtualScrollProps {
  to: number;
}

interface TableRangeDates {
  from: string;
  to: string;
}

defineEmits<{
  onVerifiedLog: [VerifiedLog];
}>();

const { rows, isLoading } = defineProps<Props>();
const pagination = ref<Pagination>({
  page: 1,
  rowsPerPage: rows.length,
  sortBy: TableColumnsName.DATETIME,
  descending: true,
  rowsNumber: rows.length
});

const { filter, page, target, order, orderBy, rangeDate } = toRefs(inject(ListLogsParameterizedType) as ListLogsParameterized);

const tableLogsRef = useTemplateRef<QTable>('table-logs')

const rowClassAnomalyDetectFn = (row: ListLogs): string => {
  if (row.predictedLog)
    return 'bg-anomaly'

  return ''
}

const resetPage = () => {
  pagination.value.page = 1
  page.value = pagination.value.page
  tableLogsRef.value?.scrollTo(0)
}

const onRequest = (props: RequestProps) => {
  const { /*page: propPage, rowsPerPage,*/ sortBy, descending } = props.pagination
  // filter.value = props.filter ?? ''

  pagination.value.sortBy = sortBy
  pagination.value.descending = descending

  order.value = sortBy as OrderColumns ?? OrderColumns.DATETIME
  orderBy.value = descending ? OrderBy.DESC : OrderBy.ASC

  resetPage()
}

const onVirtualScroll = (props: VirtualScrollProps) => {
  if (rows.length) {
    const { to } = props;

    if ((rows.length - to) <= 1) {
      pagination.value.page++
      page.value = pagination.value.page
    }
  }
}

const onUpdateFilter = (val: string) => {
  filter.value = val as string
  resetPage()
}

const onUpdateDates = (val: TableRangeDates) => {
  !val.from
    ? rangeDate.value = [val as any, val as any]
    : rangeDate.value = [val.from, val.to]

  resetPage()
}

const onUpdateIsShowAnomalies = (val: boolean) => {
  target.value = val
  resetPage()
}
</script>

<template>
  <div class="q-pa-md">
    <q-table class="table-logs-sticky-dynamic" :rows="rows" :columns="listLogsColumns"
      :visible-columns="logsVisibleColumns" bordered :row-key="TableRowKey.ID" binary-state-sort :loading="isLoading"
      v-model:pagination="pagination" :hide-bottom="!!rows.length ? true : false" virtual-scroll
      :table-row-class-fn="rowClassAnomalyDetectFn" :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48" @request="onRequest" @virtual-scroll="onVirtualScroll" ref="table-logs">

      <template v-slot:[`body-cell-${TableColumnsName.VERIFIED_LOG}`]="props">
        <q-td :props="props">
          <q-toggle toggle-indeterminate v-model="props.row[TableColumnsName.VERIFIED_LOG]" color="indigo"
            checked-icon="mdi-check-decagram" unchecked-icon="mdi-window-close" @update:model-value="$emit('onVerifiedLog', {
              logId: props.row[TableColumnsName.ID],
              target: props.row[TableColumnsName.VERIFIED_LOG]
            })" />

        </q-td>
      </template>

      <template #top="props">
        <div class="row col-12 q-pt-md">
          <div class="q-table__title text-h5 table-mg-bottom-mobile">{{ $t('List of logs') }}</div>

          <q-space />

          <div class="table-mg-bottom-mobile q-mr-md">
            <LogListTableFilterOnlyAnomalies :target="target" @update-is-only-anomalies="onUpdateIsShowAnomalies" />
          </div>

          <div class="table-mg-bottom-mobile q-mr-md">
            <LogListTableFilterDates :fromDateDefault="rangeDate[1]" :toDateDefault="rangeDate[0]"
              @update-dates="onUpdateDates" />
          </div>

          <div class="table-mg-bottom-mobile">
            <LogListTableFilter @update-filter="onUpdateFilter" />
          </div>
        </div>
      </template>

      <template #loading>
        <q-inner-loading showing color="indigo" />
      </template>

      <template #no-data>
        <div class="full-width row flex-center text-indigo q-gutter-sm">
          <q-icon size="sm" name="mdi-alert" />
          <div class="text-subtitle1">{{ $t('No results found') }}</div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<style lang="sass">
.table-logs-sticky-dynamic
  /* height or max-height is important */
  height: 600px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #FFFFFF

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px

@media (max-width: 792px)
  .table-mg-bottom-mobile
    width: 100%
    margin-bottom: 15px

@media (max-width: 520px)
  .div-table-logs-title
    font-size: 17px
</style>
