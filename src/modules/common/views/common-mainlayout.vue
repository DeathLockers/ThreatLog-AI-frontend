<script setup lang="ts">
import { reactive } from 'vue';
import HeaderPrincipal from '../components/HeaderPrincipal.vue';
import ViewPageContainer from '../components/ViewPageContainer.vue';

const excludeViews = reactive<string[]>(['']);
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <HeaderPrincipal />
    <router-view v-slot="{ Component, route }">
      <KeepAlive :exclude="excludeViews">
        <ViewPageContainer>
          <template #content>
            <component :is="Component" :key="route.name" />
          </template>
        </ViewPageContainer>
      </KeepAlive>
    </router-view>
  </q-layout>
</template>

<style lang="sass" scoped>
</style>
