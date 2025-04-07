<script setup lang="ts">
import { ref } from 'vue';
import HeaderPrincipal from '../components/HeaderPrincipal.vue';
import ViewPageContainer from '../components/ViewPageContainer.vue';

const excludeViews = ref<string[]>(['']);
</script>

<template>
  <q-layout view="lHh lpr lFf" class="my-class-layout">
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
.my-class-layout
  :deep(div.q-drawer-container aside)
    position: fixed
</style>
