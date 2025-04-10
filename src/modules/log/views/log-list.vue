<script setup lang="ts">
import { onBeforeMount, provide, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useLogStore } from '../stores/logStore';
import type { ListLogsParameterized } from '../interfaces/logInterface';
import getRangeDates from 'src/modules/common/helpers/rangeDates';
import { OrderBy, OrderColumns } from '../enums/logEnum';
import { ListLogsParameterizedType } from '../types/logType';
import LogListTable from '../components/LogListTable.vue';

const logStore = useLogStore();
const { listLogs, isLastPage } = storeToRefs(logStore);

const formData = reactive<ListLogsParameterized>({
  page: 1,
  items: 50,
  filter: '',
  target: null,
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
    <LogListTable :rows="listLogs" :isLoading="isLoading" />
  </div>
</template>

<style lang="sass" scoped></style>
