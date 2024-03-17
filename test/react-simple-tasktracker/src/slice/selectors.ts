import { type RootState } from '@/app/store';
import {
  type Card,
  type TaskStatus,
} from '@/models';

export const selectAllCardsByStatus = ({ board }: RootState, status: TaskStatus): Card[] => board?.cards[status] ?? [];
