import { Layout } from '../components/Layout';
import { withProviders } from './app-providers';
import { AppRoutes } from './app-routes';
import { type FC } from 'react';

export const App: FC = () => (
  <Layout>
    <AppRoutes />
  </Layout>
);

export const AppWithProviders = withProviders(App);
