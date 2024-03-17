import {
  type FC,
  lazy,
} from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

const BoardView = lazy(() => import('@/views/BoardView'));
const NotFoundView = lazy(() => import('@/views/NotFoundView'));

export const AppRoutes: FC = () => (
  <Routes>
    <Route element={<BoardView />} index />
    <Route element={<NotFoundView />} path='*' />
  </Routes>
);
