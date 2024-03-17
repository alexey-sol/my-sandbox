import { type RootState } from '@/app/store';
import {
  type Card,
  type TaskStatus,
} from '@/models';

const DEFAULT_CARDS: Card[] = [];

export const selectAllCardsByStatus = ({ board }: RootState, status: TaskStatus): Card[] => board.cards[status] ?? DEFAULT_CARDS;
