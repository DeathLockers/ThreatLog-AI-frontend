import type { InjectionKey } from 'vue';
import type { LoginForm } from '../interfaces/authInterface';

export const LoginFormType = Symbol() as InjectionKey<LoginForm>;
