export interface NotificationLogBackend {
  message: string;
  datetime: string;
}

export interface NotificationBackend {
  id: string;
  log: NotificationLogBackend;
}

export interface Notification {
  id: string;
  message: string;
  datetime: string;
}
