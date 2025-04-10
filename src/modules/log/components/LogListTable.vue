<script setup lang="ts">
import { inject, onMounted, ref, toRefs, useTemplateRef } from 'vue';
import { QTable } from 'quasar';
import type { ListLogs, ListLogsParameterized } from '../interfaces/logInterface';
import { OrderBy, OrderColumns, TableColumnsName, TableRowKey } from '../enums/logEnum';
import { ListLogsParameterizedType } from '../types/logType';
import useLog from '../composables/useLog';
import { listLogsColumns, logsVisibleColumns } from '../helpers/tableColumns';

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

const { rows, isLoading } = defineProps<Props>();
const { anomalyColor } = useLog()
const pagination = ref<Pagination>({
  page: 1,
  rowsPerPage: rows.length,
  sortBy: TableColumnsName.DATETIME,
  descending: true,
  rowsNumber: rows.length
});

const tableFilter = ref<string>('')

const tableRangeDates = ref<TableRangeDates>({ from: '', to: '' })

const { filter, page, order, orderBy, rangeDate } = toRefs(inject(ListLogsParameterizedType) as ListLogsParameterized);

const tableLogsRef = useTemplateRef<QTable>('table-logs')

onMounted(() => {
  tableRangeDates.value.to = rangeDate.value[0]
  tableRangeDates.value.from = rangeDate.value[1]
})

const rowStyleAnomalyDetectFn = (row: ListLogs): string => {
  if (row.predictedLog)
    return `background-color: ${anomalyColor}`

  return ''
}

const onRequest = (props: RequestProps) => {
  const { /*page: propPage, rowsPerPage,*/ sortBy, descending } = props.pagination
  // filter.value = props.filter ?? ''

  pagination.value.sortBy = sortBy
  pagination.value.descending = descending
  pagination.value.page = 1

  order.value = sortBy as OrderColumns ?? OrderColumns.DATETIME
  orderBy.value = descending ? OrderBy.DESC : OrderBy.ASC
  page.value = pagination.value.page

  tableLogsRef.value?.scrollTo(0)
}

const onVirtualScroll = (props: VirtualScrollProps) => {
  if (rows.length) {
    const { to } = props;

    if (rows.length - to <= 10) {
      pagination.value.page++
      page.value = pagination.value.page
    }
  }
}

const onUpdateFilter = (val: string | number | null) => {
  filter.value = val as string
  pagination.value.page = 1
  page.value = pagination.value.page

  tableLogsRef.value?.scrollTo(0)
}

const onUpdateDates = () => {
  !tableRangeDates.value.from
    ? rangeDate.value = [tableRangeDates.value as any, tableRangeDates.value as any]
    : rangeDate.value = [tableRangeDates.value.from, tableRangeDates.value.to]

  pagination.value.page = 1
  page.value = pagination.value.page

  tableLogsRef.value?.scrollTo(0)
}

</script>

<template>
  <div class="q-pa-md">
    <q-table class="table-logs-sticky-dynamic" :rows="rows" :columns="listLogsColumns"
      :visible-columns="logsVisibleColumns" flat bordered :row-key="TableRowKey.ID" binary-state-sort
      :loading="isLoading" v-model:pagination="pagination" hide-bottom virtual-scroll
      :table-row-style-fn="rowStyleAnomalyDetectFn" :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48" @request="onRequest" @virtual-scroll="onVirtualScroll" ref="table-logs">

      <template v-slot:[`body-cell-${TableColumnsName.VERIFIED_LOG}`]="props">
        <q-td :props="props">
          <div class="text-blue">
          <!-- TODO verified switch -->
            {{ props.value }}
          </div>
        </q-td>
      </template>

      <template #top="props">
        <div class="q-table__title table-mg-bottom-mobile">{{ $t('List of logs') }}</div>

        <q-space />

        <div class="table-mg-bottom-mobile">
          <q-btn icon-right="mdi-calendar-month" outline square unelevated padding="sm" color="indigo" class="q-mr-md"
            :label="`${rangeDate[0]} - ${rangeDate[1]}`">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tableRangeDates" color="indigo" range mask="YYYY-MM-DD">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn :label="$t('Cancel')" color="primary" flat v-close-popup />
                  <q-btn :label="$t('Confirm')" color="primary" flat @click="onUpdateDates" v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>

        <q-input dense debounce="500" color="indigo" :label="$t('Filter')" style="width: 210px" v-model="tableFilter"
          @update:model-value="onUpdateFilter">
          <template #append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>

      </template>

      <template #loading>
        <q-inner-loading showing color="indigo" />
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

@media (max-width: 620px)
  .table-mg-bottom-mobile
    margin-bottom: 15px

@media (max-width: 520px)
  .div-table-logs-title
    font-size: 17px
</style>
