<script setup lang="ts">
import useRedirect from '../../composables/useRedirect';

const { routeName } = useRedirect()
</script>

<template>
  <q-btn flat dense round :to="{ name: 'log-list' }" size="md" :color="routeName === 'log-list' ? 'primary' : 'dark'"
    padding="none" icon="mdi-table-eye" class="q-mr-md">
    <q-tooltip>
      {{ $t('View log list') }}
    </q-tooltip>
  </q-btn>
</template>

<style lang="sass" scoped></style>
