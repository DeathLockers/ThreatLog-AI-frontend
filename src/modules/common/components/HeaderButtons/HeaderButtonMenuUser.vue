<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/modules/auth/stores/authStore';

const authStore = useAuthStore();
const { userAuth } = storeToRefs(authStore);
</script>

<template>
  <q-btn flat round size="lg" padding="none" color="dark" icon="mdi-incognito-circle">
    <q-menu>
      <q-list style="max-width: 300px">
        <q-item dense lines="1">
          <q-item-section>
            <q-item-label lines="1">{{ userAuth?.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item :to="{ name: 'login' }" @click="authStore.logout()" clickable v-close-popup>
          <q-item-section class="col-5" avatar>
            <q-icon name="mdi-logout" />
          </q-item-section>
          <q-item-section>{{ $t('Logout') }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn></template>

<style lang="sass" scoped></style>
