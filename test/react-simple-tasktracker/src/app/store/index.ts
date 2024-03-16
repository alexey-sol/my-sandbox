import { boardReducer } from '../../slice';
import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

const isDevelopment = process.env.NODE_ENV === 'development';

export const rootReducer = combineReducers({ board: boardReducer });

export const store = configureStore({
  devTools: isDevelopment,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: rootReducer,
} as const);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
