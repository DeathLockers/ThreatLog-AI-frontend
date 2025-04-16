import { computed, ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import type {
  ListLogsParameterizedBackend,
  ListLogsParameterized,
  ListLogs,
  ListLogsBackend,
} from '../interfaces/logInterface';
import type { VerifiedLog } from '../interfaces/logVerifiedInterface';
import { OrderBy, OrderColumns } from '../enums/logEnum';
import getRangeDates from 'src/modules/common/helpers/rangeDates';
import { PrefixPath } from 'src/modules/common/enums/prefixPathEnum';

export const useLogStore = defineStore('log', () => {
  //State
  const listLogsParameterizedBackendInitial: ListLogsParameterizedBackend = {
    page: 1,
    items: 0,
    filter: '',
    target: true,
    range_date: getRangeDates(),
    order: OrderColumns.DATETIME,
    order_by: OrderBy.DESC,
  };

  const listLogsBackendInitial: ListLogsBackend[] = [];

  let listLogsParameterizedBackend = reactive<ListLogsParameterizedBackend>(listLogsParameterizedBackendInitial);
  let listLogsBackend = reactive<ListLogsBackend[]>(listLogsBackendInitial);
  const isLastPage = ref<boolean>(false);
  const prefixPathLogs = ref<string>(PrefixPath.LOG);
  //End State

  //Getters
  const listLogs = computed<ListLogs[]>(() => {
    return listLogsBackend.map((l) => {
      return {
        id: l.id ?? '',
        host: l.host ?? '',
        service: l.service ?? '',
        pid: l.pid ?? 0,
        message: l.message ?? '',
        datetime: l.datetime ?? '',
        timeExecution: l.time_execution ?? 0,
        predictedLog: l.predicted_log?.target ?? null,
        verifiedLog: l.verified_log?.target ?? null,
      };
    });
  });
  //End Getters

  //Actions
  const showLogs = async (listLogsParameterizedForm: ListLogsParameterized): Promise<void> => {
    setListLogsParameterizedBackend(listLogsParameterizedForm);
    try {
      const { data } = await api.post<ListLogsBackend[]>(`${prefixPathLogs.value}/`, listLogsParameterizedBackend);
      setListLogs(data);
    } catch (error) {
    } finally {
    }
  };
  //End Actions

  //Setters
  const setListLogsParameterizedBackend = (data: ListLogsParameterized) => {
    listLogsParameterizedBackend.page = data.page;
    listLogsParameterizedBackend.items = data.items;
    listLogsParameterizedBackend.filter = data.filter;
    listLogsParameterizedBackend.target = data.target ?? false;
    listLogsParameterizedBackend.range_date = data.rangeDate;
    listLogsParameterizedBackend.order = data.order;
    listLogsParameterizedBackend.order_by = data.orderBy;
  };

  const setListLogs = (data: ListLogsBackend[]): void => {
    !data.length ? (isLastPage.value = true) : (isLastPage.value = false);

    if (listLogsParameterizedBackend.page === 1) listLogsBackend.length = 0;

    listLogsBackend.push(...data);
  };

  const setUpdateVerifiedListLog = (data: VerifiedLog) => {
    const logIndex = listLogsBackend.findIndex((l) => l.id === data.logId);

    if (logIndex !== -1 && listLogsBackend[logIndex]) {
      const log = listLogsBackend[logIndex];

      if (data.target !== null) {
        log.verified_log == undefined
          ? (log.verified_log = { target: data.target })
          : (log.verified_log.target = data.target);
      } else {
        delete log.verified_log?.target;
        log.verified_log = data.target;
      }
    }
  };

  const $reset = (): void => {
    listLogsParameterizedBackend = listLogsParameterizedBackendInitial;
    listLogsBackend = listLogsBackend;
  };
  //End Setters

  return {
    //State
    isLastPage,

    //Getters
    listLogs,

    //Actions
    showLogs,

    //Setters
    setUpdateVerifiedListLog,
    $reset,
  };
});
