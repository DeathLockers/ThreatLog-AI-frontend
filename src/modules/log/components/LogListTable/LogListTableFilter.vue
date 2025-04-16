<script setup lang="ts">
import { ref } from 'vue';

const tableFilter = ref<string>('')

defineEmits<{
  updateFilter: [string];
}>();
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
