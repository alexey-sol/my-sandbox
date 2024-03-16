import { type Task } from './types';
import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

export type BoardState = {
  tasks: Task[],
};

const initialState: BoardState = { tasks: [] };

export const boardSlice = createSlice({
  initialState,
  name: 'board',
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks.push(task);
    },
  },
});

export const { addTask } = boardSlice.actions;

export const boardReducer = boardSlice.reducer;
