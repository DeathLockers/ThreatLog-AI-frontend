<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  target: boolean
}

defineEmits<{
  updateIsOnlyAnomalies: [boolean];
}>();

const { target } = defineProps<Props>();

const tableFilterIsAnomalies = ref<boolean>(false)

watch(
  () => target,
  async (val) => {
    tableFilterIsAnomalies.value = val
  },
);
</script>

<template>
  <q-checkbox left-label v-model="tableFilterIsAnomalies"
    @update:model-value="$emit('updateIsOnlyAnomalies', tableFilterIsAnomalies)" :label="$t('Anomalies detected')"
    color="anomaly" />
</template>

<style lang="sass" scoped></style>
