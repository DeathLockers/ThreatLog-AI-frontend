<script setup lang="ts">
</script>

<template>
  <q-page-container>
    <q-page class="q-py-xl q-px-md row no-wrap">
      <div class="col">
        <div class="full-height">
          <slot name="content"></slot>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<style lang="sass" scoped></style>
