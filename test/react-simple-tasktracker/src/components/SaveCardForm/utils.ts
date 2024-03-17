import * as cn from './const';

export const isValidInputOnUpdate = (value: string) => value.length <= cn.INPUT_MAX_LENGTH;

export const isValidInputOnAdd = (value: string) => isValidInputOnUpdate(value) &&
  value.trim().length > 0;

// eslint-disable-next-line no-console -- Good enough for now
export const handleValidationError = (errorMessage: string) => console.error(errorMessage);
