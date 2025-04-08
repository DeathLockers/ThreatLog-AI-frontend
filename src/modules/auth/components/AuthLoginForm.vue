<script setup lang="ts">
import AuthButtonSubmit from './AuthButtonSubmit.vue'
import AuthLoginFormFieldEmail from './AuthLoginForm/AuthLoginFormFieldEmail.vue';
import AuthLoginFormFieldPassword from './AuthLoginForm/AuthLoginFormFieldPassword.vue';
import MessageErrorAction from 'src/modules/common/components/MessageErrorAction.vue';

defineEmits<{
  submitForm: [void];
}>();

interface Props {
  isShowMessageError?: boolean;
  messageError?: string;
}

const { messageError = '', isShowMessageError = false } = defineProps<Props>()
</script>

<template>
  <div class="text-weight-bold ft-sz-18 text-blue-grey-6 q-mb-sm div-text-welcome">
    {{ $t('Welcome to your anomaly detection dashboard') }}!
  </div>
  <div class="text-blue-grey-6 text-body2" :class="!isShowMessageError ? 'q-mb-lg' : 'q-mb-md'">
    {{ $t('Please sign-in to your account') }}.
  </div>

  <q-form @submit.prevent="$emit('submitForm')" class="q-pb-sm">
    <div class="q-mb-md">
      <MessageErrorAction :isShow="isShowMessageError" :messageError="messageError" />
    </div>

    <AuthLoginFormFieldEmail />

    <AuthLoginFormFieldPassword />


    <AuthButtonSubmit label="Sign in" />
  </q-form>
</template>

<style lang="sass" scoped>
@media (max-width: 500px)
  .div-text-welcome
    font-size: 16px
</style>
