<script setup lang="ts">
import { ref, reactive, provide } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
import type { LoginForm } from '../interfaces/authInterface';
import AuthLayout from '../components/AuthLayout.vue';
import AuthLoginForm from '../components/AuthLoginForm.vue';
import { LoginFormType } from '../types/authType';
import useRedirect from 'src/modules/common/composables/useRedirect';

const formData = reactive<LoginForm>({
  email: '',
  password: '',
});

provide(LoginFormType, formData);

const messageError = ref<string>('');
const isLoading = ref<boolean>(false);

const authStore = useAuthStore();
const { isLogged } = storeToRefs(authStore);

const { redirectHome } = useRedirect();

const submitLogin = async (): Promise<void> => {
  messageError.value = '';
  isLoading.value = true;
  const resp: void | string = await authStore.login(formData);
  !isLogged.value ? messageError.value = resp as string : redirectHome();
  isLoading.value = false;
};
</script>

<template>
  <AuthLayout :isLoading="isLoading">
    <template #card-content>
      <AuthLoginForm @submitForm="submitLogin()" :messageError="messageError" :isShowMessageError="!!messageError" />
    </template>
  </AuthLayout>
</template>

<style lang="sass" scoped></style>
