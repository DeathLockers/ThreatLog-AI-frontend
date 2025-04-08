import { i18n } from 'boot/i18n';

export const messageRequired: string = i18n.global.t('You must fill in this field');
export const messageEmail: string = i18n.global.t('It must be an email');
//export const messageSameAsPassword: string = i18n.global.t('The password and confirm password must match');
export const messageIncorrectFormat: string = i18n.global.t('Incorrect format');

export const messageMinLength = (length: number): string => i18n.global.t('Must be at least') + ` ${length} ` + i18n.global.t('characters');
export const messageMaxLength = (length: number): string => i18n.global.t('Must have a maximum of') + ` ${length} ` + i18n.global.t('characters');
