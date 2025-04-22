<script setup lang="ts">
import { onActivated, provide, reactive, ref, watch } from 'vue';
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

interface Props {
  datetime?: string;
}

const { datetime } = defineProps<Props>()

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

onActivated(async () => {
  if (!datetime) {
    await logStore.showLogs(formData)
    isLoading.value = false
  } else {
    onFormatDatetime()
  }
})

const onUpdateVerifiedLog = async (val: VerifiedLog): Promise<void> => {
  await logVerifiedStore.verifiedLog(val)
  logStore.setUpdateVerifiedListLog(val)
}

const onFormatDatetime = (): void => {
  if (datetime) {
    formData.page = 1
    formData.rangeDate = [datetime.split(' ')[0] ?? '', datetime.split(' ')[0] ?? '']
    formData.target = true
    formData.filter = datetime.split(' ')[1] ?? ''
  }
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

watch(
  () => datetime,
  async (val) => {
    if (val) onFormatDatetime()
  },
);
</script>

<template>
  <div>
    <LogListTable :rows="listLogs" :isLoading="isLoading" @onVerifiedLog="onUpdateVerifiedLog" />
  </div>
</template>

<style lang="sass" scoped></style>
