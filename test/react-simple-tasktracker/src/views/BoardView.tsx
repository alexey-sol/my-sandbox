import { Board } from '../components/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const BoardView = () => (
  <DndProvider backend={HTML5Backend}>
    <Board />
  </DndProvider>
);

export default BoardView;
