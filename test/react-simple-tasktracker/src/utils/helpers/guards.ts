import { type Card } from '../../slice/types';

export const isCard = (value: unknown): value is Card => value instanceof Object &&
  'id' in value &&
  'task' in value;
