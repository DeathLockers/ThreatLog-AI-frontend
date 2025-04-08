<script setup lang="ts">
import CardSpinnerLoading from 'src/modules/common/components/CardSpinnerLoading.vue';

interface Props {
  isLoading?: boolean;
  labelLoading?: string;
}

const { isLoading = false, labelLoading = '' } = defineProps<Props>()
</script>

<template>
  <div class="div-background height-100vh">
    <div class="flex justify-center items-center height-100vh">
      <q-card class="card-auth-layout q-pa-lg">
        <slot name="card-header"></slot>
        <q-img no-spinner class="q-mb-sm" src="/images/logo.png" />
        <slot name="card-content"></slot>
        <CardSpinnerLoading :isLoading="isLoading" :label="labelLoading" />
      </q-card>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.div-background
  background-image: url('/images/background.jpg')
  background-repeat: no-repeat
  background-size: cover
  background-position: center
  min-width: 100%
  min-height: 100%
  position: absolute

.height-100vh
  height: 100vh

.card-auth-layout
  width: 450px

@media (max-width: 500px)
  .card-auth-layout
    width: 90%
</style>
