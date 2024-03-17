import { dom } from '@/const';

export const getRootElement = (): HTMLElement => document.querySelector(`#${dom.ROOT_ELEMENT_ID}`) ??
  document.body;
