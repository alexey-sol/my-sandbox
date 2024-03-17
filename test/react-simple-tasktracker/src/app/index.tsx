import { withProviders } from './app-providers';
import { AppRoutes } from './app-routes';
import { Layout } from '@/components/Layout';
import { type FC } from 'react';

export const App: FC = () => (
  <Layout>
    <AppRoutes />
  </Layout>
);

export const AppWithProviders = withProviders(App);
