<script setup lang="ts">
import { inject, onMounted, ref, toRefs, watch } from 'vue';
import { ListLogsParameterizedType } from '../../types/logType';
import { ListLogsParameterized } from '../../interfaces/logInterface';

interface Props {
  fromDateDefault: string,
  toDateDefault: string
}

interface TableRangeDates {
  from: string;
  to: string;
}

defineEmits<{
  updateDates: [TableRangeDates];
}>();

const { fromDateDefault, toDateDefault } = defineProps<Props>();

const { rangeDate } = toRefs(inject(ListLogsParameterizedType) as ListLogsParameterized);

const tableRangeDates = ref<TableRangeDates>({ from: '', to: '' })

onMounted(() => {
  tableRangeDates.value.to = fromDateDefault
  tableRangeDates.value.from = toDateDefault
})

watch(
  () => rangeDate.value,
  async (val) => {
    tableRangeDates.value.to = val[0]
    tableRangeDates.value.from = val[1]
  },
);
</script>

<template>
  <q-btn icon-right="mdi-calendar-month" outline square unelevated padding="sm" color="indigo" class="q-mr-md"
    :label="`${toDateDefault} - ${fromDateDefault}`">
    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
      <q-date v-model="tableRangeDates" color="indigo" range mask="YYYY-MM-DD">
        <div class="row items-center justify-end q-gutter-sm">
          <q-btn :label="$t('Cancel')" color="primary" flat v-close-popup />
          <q-btn :label="$t('Confirm')" color="primary" flat @click="$emit('updateDates', tableRangeDates)"
            v-close-popup />
        </div>
      </q-date>
    </q-popup-proxy>
  </q-btn>
</template>

<style lang="sass" scoped></style>
