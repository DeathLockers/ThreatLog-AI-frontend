<script setup lang="ts">

interface Props {
  isLoading?: boolean;
  label?: string;
}

const { isLoading = false, label = '' } = defineProps<Props>()
</script>

<template>
  <q-inner-loading :showing="isLoading" size="50px" color="indigo" :label="label"
    label-class="text-indigo text-weight-bold" label-style="font-size: 1.1em">
  </q-inner-loading>
</template>

<style lang="sass" scoped></style>
