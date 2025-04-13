import type { InjectionKey } from 'vue';
import type { VerifiedLog } from '../interfaces/logVerifiedInterface';

export const VerifiedLogType = Symbol() as InjectionKey<VerifiedLog>;
