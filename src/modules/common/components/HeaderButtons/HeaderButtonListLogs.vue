<script setup lang="ts"></script>

<template>
  <q-btn flat dense round :to="{ name: 'log-list' }" size="md" color="dark" padding="none" icon="mdi-table-eye"
    class="q-mr-md">
    <q-tooltip>
      {{ $t('View log list') }}
    </q-tooltip>
  </q-btn>
</template>

<style lang="sass" scoped></style>
