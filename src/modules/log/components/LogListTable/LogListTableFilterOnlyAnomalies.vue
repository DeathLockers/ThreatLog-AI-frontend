<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  target: boolean
}

defineEmits<{
  updateIsOnlyAnomalies: [boolean];
}>();

const { target } = defineProps<Props>();

const tableFilterIsAnomalies = ref<boolean>(false)

onMounted(() => {
  tableFilterIsAnomalies.value = target
})
</script>

<template>
  <q-checkbox left-label v-model="tableFilterIsAnomalies"
    @update:model-value="$emit('updateIsOnlyAnomalies', tableFilterIsAnomalies)" :label="$t('Anomalies detected')"
    color="anomaly"  />
</template>

<style lang="sass" scoped></style>
