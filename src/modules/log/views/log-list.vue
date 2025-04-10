<script setup lang="ts">
import { onBeforeMount, provide, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useLogStore } from '../stores/logStore';
import { useLogVerifiedStore } from '../stores/logVerifiedStore'
import type { ListLogsParameterized } from '../interfaces/logInterface';
import type { VerifiedLog } from '../interfaces/logVerifiedInterface';
import getRangeDates from 'src/modules/common/helpers/rangeDates';
import { OrderBy, OrderColumns } from '../enums/logEnum';
import { ListLogsParameterizedType } from '../types/logType';
import LogListTable from '../components/LogListTable.vue';

const logStore = useLogStore();
const { listLogs, isLastPage } = storeToRefs(logStore);

const logVerifiedStore = useLogVerifiedStore()

const formData = reactive<ListLogsParameterized>({
  page: 1,
  items: 50,
  filter: '',
  target: false,
  rangeDate: getRangeDates(),
  order: OrderColumns.DATETIME,
  orderBy: OrderBy.DESC,
});

const isLoading = ref<boolean>(true)

provide(ListLogsParameterizedType, formData);

onBeforeMount(async () => {
  await logStore.showLogs(formData)
  isLoading.value = false
});

const onUpdateVerifiedLog = async (val: VerifiedLog): Promise<void> => {
  await logVerifiedStore.verifiedLog(val)
  logStore.setUpdateVerifiedListLog(val)
}

watch(
  () => formData,
  async (val) => {
    if (!isLastPage.value || val.page === 1) {
      isLoading.value = true
      await logStore.showLogs(val)
      isLoading.value = false
    }
  },
  { deep: true }
);
</script>

<template>
  <div>
    <LogListTable :rows="listLogs" :isLoading="isLoading" @onVerifiedLog="onUpdateVerifiedLog" />
  </div>
</template>

<style lang="sass" scoped></style>
