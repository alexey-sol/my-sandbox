import { generateId } from '../utils/helpers/generators';
import {
  type AddCardProps,
  type UpdateCardProps,
} from './types';
import {
  type Card,
  type TaskStatus,
} from '@/models';
import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

export type BoardState = {
  cards: Record<TaskStatus, Card[]>,
  mapTaskIdToStatus: Record<string, TaskStatus>,
};

const initialState: BoardState = {
  cards: {
    Done: [],
    'In Progress': [],
    Planned: [],
  },
  mapTaskIdToStatus: {},
};

export const boardSlice = createSlice({
  initialState,
  name: 'board',
  reducers: {
    addCard: (state, action: PayloadAction<AddCardProps>) => {
      const {
        data,
        meta,
      } = action.payload;
      const id = generateId();

      state.cards[meta.status].push({
        id,
        task: data.task,
      });

      state.mapTaskIdToStatus[id] = meta.status;
    },
    updateCard: (state, action: PayloadAction<UpdateCardProps>) => {
      const {
        data,
        meta,
      } = action.payload;

      const currentStatus = state.mapTaskIdToStatus[meta.id];
      const currentIndex = state.cards[currentStatus].findIndex(({ id }) => id === meta.id);
      const currentData = state.cards[currentStatus][currentIndex] ?? {};

      const updatedCard = {
        ...currentData,
        ...data,
      };

      const hasCardsInColumn = state.cards[meta.status].length > 0;
      const index = meta.index ?? currentIndex;
      const resultIndex = hasCardsInColumn ? index : 0;

      state.cards[currentStatus] = state.cards[currentStatus].filter(({ id }) => id !== meta.id);
      state.cards[meta.status].splice(resultIndex, 0, updatedCard);
      state.mapTaskIdToStatus[meta.id] = meta.status;
    },
  },
});

export const {
  addCard,
  updateCard,
} = boardSlice.actions;

export const boardReducer = boardSlice.reducer;
