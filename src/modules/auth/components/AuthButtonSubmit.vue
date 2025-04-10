<script setup lang="ts">
interface Props {
  label: string;
}

const { label } = defineProps<Props>();
</script>

<template>
  <q-btn color="indigo-12" type="submit" class="full-width" :label="$t(label)" />
</template>

<style lang="sass" scoped></style>
