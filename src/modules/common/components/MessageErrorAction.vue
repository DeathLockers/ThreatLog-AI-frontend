<script setup lang="ts">
interface Props {
  messageError: string;
  isShow?: boolean;
}

const { messageError = '', isShow = false } = defineProps<Props>()
</script>

<template>
  <div v-if="isShow" class="text-left text-negative">
    <div>{{ messageError }}</div>
  </div>
</template>

<style lang="sass" scoped></style>
