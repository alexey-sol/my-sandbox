import {
  type Card,
  type TaskStatus,
} from './types';
import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

export type BoardState = {
  cards: Record<TaskStatus, Card[]>,
};

const initialState: BoardState = {
  cards: {
    Done: [],
    'In Progress': [],
    Planned: [],
  },
};

export const boardSlice = createSlice({
  initialState,
  name: 'board',
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      const card = action.payload;
      state.cards[card.status].push(card);
    },
  },
});

export const { addCard } = boardSlice.actions;

export const boardReducer = boardSlice.reducer;
