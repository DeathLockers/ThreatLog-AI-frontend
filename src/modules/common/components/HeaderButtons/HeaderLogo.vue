<script setup lang="ts">
import { useAuthStore } from 'src/modules/auth/stores/authStore';
import useRedirect from '../../composables/useRedirect';

const authStore = useAuthStore();
const { redirectHome } = useRedirect()
</script>

<template>
  <q-toolbar-title>
    <q-img class="cursor-pointer" @click="redirectHome(), authStore.check()" no-spinner src="/images/logo.png"
      style="width: 185px" />
  </q-toolbar-title>
</template>

<style lang="sass" scoped></style>
