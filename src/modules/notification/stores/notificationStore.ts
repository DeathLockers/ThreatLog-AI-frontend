import { computed, ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import type { NotificationBackend, Notification } from '../interfaces/notificationInterface';
import { PrefixPath } from 'src/modules/common/enums/prefixPathEnum';

export const useNotificationStore = defineStore('notification', () => {
  //State
  let listNotificationsBackend = reactive<NotificationBackend[]>([]);
  const prefixPathNotifications = ref<string>(PrefixPath.NOTIFICATION);
  //End State

  //Getters
  const listNotifications = computed<Notification[]>(() => {
    return listNotificationsBackend.map((l) => {
      return {
        id: l.id ?? '',
        message: l.log.message ?? '',
        datetime: l.log.datetime ?? '',
      };
    });
  });

  const countNotifications = computed<string>(() => {
    const total = listNotificationsBackend.length;
    return total <= 99 ? String(total) : '+99';
  });
  //End Getters

  //Actions
  const showNotifications = async (): Promise<void> => {
    try {
      const { data } = await api.get<NotificationBackend[]>(`${prefixPathNotifications.value}/`);
      listNotificationsBackend.push(...data);
    } catch (error) {
    } finally {
    }
  };

  const readNotification = async (notificationId: string): Promise<boolean> => {
    try {
      await api.get<NotificationBackend[]>(`${prefixPathNotifications.value}/${notificationId}/read`);
    } catch (error) {
      // return false;
    } finally {
      setNotificationRead(notificationId);
      return true;
    }
  };

  const readAllNotifications = async (): Promise<boolean> => {
    try {
      await api.get<NotificationBackend[]>(`${prefixPathNotifications.value}/read/all`);
    } catch (error) {
      // return false;
    } finally {
      listNotificationsBackend.length = 0;
      return true;
    }
  };
  //End Actions

  //Setters
  const setNotificationRead = (id: string): void => {
    const index = listNotificationsBackend.findIndex((n) => n.id === id);
    if (index !== -1) listNotificationsBackend.splice(index, 1);
  };

  const setAddNotification = (notification: NotificationBackend): void => {
    listNotificationsBackend.unshift(notification);
  };

  const $reset = (): void => {
    listNotificationsBackend = [];
  };
  //End Setters

  return {
    //State

    //Getters
    listNotifications,
    countNotifications,

    //Actions
    showNotifications,
    readNotification,
    readAllNotifications,

    //Setters
    setAddNotification,
    $reset,
  };
});
