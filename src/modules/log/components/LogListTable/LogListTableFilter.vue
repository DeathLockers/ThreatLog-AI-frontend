<script setup lang="ts">
import { inject, ref, toRefs, watch } from 'vue';
import { ListLogsParameterizedType } from '../../types/logType';
import { ListLogsParameterized } from '../../interfaces/logInterface';

const tableFilter = ref<string>('')

const { filter } = toRefs(inject(ListLogsParameterizedType) as ListLogsParameterized);

defineEmits<{
  updateFilter: [string];
}>();

watch(
  () => filter.value,
  async (val) => {
    tableFilter.value = val
  },
);
</script>

<template>
  <q-input dense debounce="500" color="indigo" :label="$t('Filter')" style="width: 210px" v-model="tableFilter"
    @update:model-value="$emit('updateFilter', tableFilter)">
    <template #append>
      <q-icon name="mdi-magnify" />
    </template>
  </q-input>
</template>

<style lang="sass" scoped></style>
