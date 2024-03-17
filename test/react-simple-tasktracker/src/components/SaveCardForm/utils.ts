import * as cn from './const';

export const isValidInput = (value: string) => value.length > 0 && value.length <= cn.INPUT_MAX_LENGTH;
