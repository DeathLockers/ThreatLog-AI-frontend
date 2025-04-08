<script setup lang="ts">
import { inject, toRefs } from 'vue';
import { messageRequired, messageEmail, messageMaxLength } from 'src/modules/common/helpers/messageRules';
import { LoginForm } from '../../interfaces/authInterface';
import { LoginFormType } from '../../types/authType';

const { email } = toRefs(inject(LoginFormType) as LoginForm);
</script>

<template>
  <q-input class="q-mb-md" dense outlined v-model="email" :label="$t('Enter your email')" maxlength="255" reactive-rules
    :rules="[
      val => !!val || messageRequired,
      val => val.length <= 255 || messageMaxLength(255),
      (val, rules) => rules.email(val) || messageEmail,
    ]" />
</template>

<style lang="sass" scoped></style>
