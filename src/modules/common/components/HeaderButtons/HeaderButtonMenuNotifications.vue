<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from 'src/modules/notification/stores/notificationStore';
import useRedirect from '../../composables/useRedirect';

const notificationStore = useNotificationStore();
const { listNotifications, countNotifications } = storeToRefs(notificationStore);
const { redirectListLogs } = useRedirect()

let isCloseNotification: boolean = false

onMounted(async () => {
  await notificationStore.showNotifications()
})

const redirectLog = async (id: string, datetime: string) => {
  if (!isCloseNotification) {
    redirectListLogs(datetime.replace("T", " "))
    await markAsReadNotification(id)
  }
}

const markAsReadNotification = async (id: string) => {
  isCloseNotification = true
  await notificationStore.readNotification(id)
  setTimeout(() => (isCloseNotification = false), 100);
}

const markAsReadAllNotifications = async () => {
  await notificationStore.readAllNotifications()
}
</script>

<template>
  <q-btn flat dense round color="grey-8" padding="none" icon="mdi-bell" class="q-mr-md">
    <q-badge v-show="countNotifications != '0'" floating rounded color="red">{{ countNotifications }}</q-badge>
    <q-menu v-if="countNotifications != '0'">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title class="text-h6 text-grey-8">{{ $t('Notifications') }}</q-toolbar-title>
        <q-btn flat round color="grey-8" size="sm" style="margin-top: 3px" padding="none" icon="mdi-inbox-full"
          @click="markAsReadAllNotifications()">
          <q-tooltip>{{ $t('Mark all messages as read') }}</q-tooltip>
        </q-btn>
      </q-toolbar>

      <q-separator size="1px" />

      <q-list v-for="{ id, message, datetime } in listNotifications" :key="id" class="list-notifications">
        <q-item class="q-my-sm" clickable v-ripple @click="redirectLog(id, datetime)">
          <q-item-section avatar>
            <q-icon name="mdi-alert-circle" size="xl" color="anomaly" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-grey-8" lines="1">{{ $t('New anomaly detected') }}</q-item-label>
            <q-item-label caption lines="1">{{ message }}</q-item-label>
            <q-item-label caption lines="1">{{ datetime }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn flat icon="mdi-window-close" size="sm" round padding="none" text-color="grey-8"
              @click="markAsReadNotification(id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<style lang="sass" scoped>
.list-notifications
  width: 415px
  max-width: 415px

@media (max-width: 480px)
  .list-notifications
    width: 295px
    max-width: 295px
</style>
