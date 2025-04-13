export interface VerifiedLogBackend {
  log_id: string;
  target: boolean | null;
}

export interface VerifiedLog {
  logId: string;
  target: boolean | null;
}
