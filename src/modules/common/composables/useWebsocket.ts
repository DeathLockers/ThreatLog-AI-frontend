import { onBeforeUnmount, onMounted } from 'vue';
import { LocalStorage } from 'quasar';
import type { NotificationBackend } from 'src/modules/notification/interfaces/notificationInterface';
import { useNotificationStore } from 'src/modules/notification/stores/notificationStore';

const useWebsocket = () => {
  let websocket: WebSocket | null = null;
  const notificationStore = useNotificationStore();

  const connectWebSocket = () => {
    const wsUrl = `${process.env.APP_WS_BASEURL}/ws/${LocalStorage.getItem('token')}`;
    websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      // console.log('WebSocket connection established.');
    };

    websocket.onmessage = (event) => {
      const notification: NotificationBackend = JSON.parse(event.data);
      notificationStore.setAddNotification(notification);
    };

    websocket.onclose = (event) => {
      // console.log('WebSocket connection closed:', event);
    };

    websocket.onerror = (error) => {
      // console.error('WebSocket error:', error);
    };
  };

  onMounted(() => {
    connectWebSocket();
  });

  onBeforeUnmount(() => {
    if (websocket) {
      websocket.close();
    }
  });

  return {
    //Methods
    //Variables
  };
};

export default useWebsocket;
