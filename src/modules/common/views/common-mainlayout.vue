<script setup lang="ts">
import { ref } from 'vue';
import HeaderPrincipal from '../components/HeaderPrincipal.vue';
import ViewPageContainer from '../components/ViewPageContainer.vue';

const excludeViews = ref<string[]>(['common-home']);

</script>

<template>
  <q-layout view="hHh lpR fFf">
    <HeaderPrincipal />
    <ViewPageContainer>
      <template #content>
        <router-view v-slot="{ Component, route }">
          <KeepAlive :exclude="excludeViews">
            <component :is="Component" :key="route.name" />
          </KeepAlive>
        </router-view>
      </template>
    </ViewPageContainer>
  </q-layout>
</template>

<style lang="sass" scoped>
</style>
