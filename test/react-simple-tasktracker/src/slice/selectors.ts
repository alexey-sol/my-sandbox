import { type RootState } from '../app/store';
import {
  type Card,
  type TaskStatus,
} from './types';

export const selectAllCardsByStatus = (state: RootState, status: TaskStatus): Card[] => state.board?.cards[status] ?? [];
