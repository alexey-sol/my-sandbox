import { store } from './store';
import { compose } from '@reduxjs/toolkit';
import {
  type FC,
  StrictMode,
  Suspense,
} from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

type WithProvider = (component: FC<void>) => FC<void>;

export const withStore: WithProvider = (component) => () => (
  <Provider store={store}>
    {component()}
  </Provider>
);

export const withRouter: WithProvider = (component) => () => (
  <BrowserRouter>
    <Suspense fallback={<section>...</section>}>
      {component()}
    </Suspense>
  </BrowserRouter>
);

export const withChecks: WithProvider = (component) => () => (
  <StrictMode>
    {component()}
  </StrictMode>
);

export const withProviders = compose<FC>(
  withStore,
  withRouter,
  withChecks,
);
