<script setup lang="ts">
import { ref, toRefs, inject } from 'vue';
import { messageRequired, messageMaxLength, messageMinLength } from 'src/modules/common/helpers/messageRules';
import { LoginForm } from '../../interfaces/authInterface';
import { LoginFormType } from '../../types/authType';

const { password } = toRefs(inject(LoginFormType) as LoginForm);
</script>

<template>
  <q-input class=" q-mb-md" dense outlined v-model="password" :label="$t('Enter password')" maxlength="255"
    type="password" reactive-rules :rules="[
      val => !!val || messageRequired,
      val => val.length >= 8 || messageMinLength(8),
      val => val.length <= 255 || messageMaxLength(255),
    ]">
  </q-input>
</template>

<style lang="sass" scoped></style>
