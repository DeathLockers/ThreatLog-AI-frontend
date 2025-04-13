<script setup lang="ts">
import HeaderLogo from './HeaderButtons/HeaderLogo.vue';
import HeaderButtonListLogs from './HeaderButtons/HeaderButtonListLogs.vue';
import HeaderButtonMenuNotifications from './HeaderButtons/HeaderButtonMenuNotifications.vue';
import HeaderButtonMenuUser from './HeaderButtons/HeaderButtonMenuUser.vue';
</script>

<template>
  <q-header reveal elevated class="bg-white text-dark q-py-sm">
    <q-toolbar>
      <HeaderLogo />
      <HeaderButtonListLogs />
      <HeaderButtonMenuNotifications />
      <HeaderButtonMenuUser />
    </q-toolbar>
  </q-header>
</template>

<style lang="sass" scoped></style>
