import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import type { VerifiedLog, VerifiedLogBackend } from '../interfaces/logVerifiedInterface';
import { PrefixPath } from 'src/modules/common/enums/prefixPathEnum';

export const useLogVerifiedStore = defineStore('verified_logs', () => {
  //State
  const verifiedLogBackendInitial: VerifiedLogBackend = {
    log_id: '',
    target: null,
  };

  let verifiedLogBackend = reactive<VerifiedLogBackend>(verifiedLogBackendInitial);
  const prefixPathLogs = ref<string>(PrefixPath.LOG_VERIFIED);
  //End State

  //Getters
  //End Getters

  //Actions
  const verifiedLog = async (verifiedLogForm: VerifiedLog): Promise<void> => {
    setVerifiedLogBackend(verifiedLogForm);
    try {
      const { data } = await api.post<VerifiedLog>(`${prefixPathLogs.value}/`, verifiedLogBackend);
      $reset();
    } catch (error) {
    } finally {
    }
  };
  //End Actions

  //Setters
  const setVerifiedLogBackend = (data: VerifiedLog) => {
    verifiedLogBackend.log_id = data.logId;
    verifiedLogBackend.target = data.target;
  };

  const $reset = (): void => {
    verifiedLogBackend = verifiedLogBackendInitial;
  };
  //End Setters

  return {
    //State

    //Getters

    //Actions
    verifiedLog,

    //Setters
    $reset,
  };
});
