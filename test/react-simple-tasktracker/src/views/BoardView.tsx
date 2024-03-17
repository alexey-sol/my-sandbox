import { Board } from '@/components/Board';
import { type FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const BoardView: FC = () => (
  <DndProvider backend={HTML5Backend}>
    <Board />
  </DndProvider>
);

export default BoardView;
