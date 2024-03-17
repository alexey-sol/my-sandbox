import { BoardColumn } from '../BoardColumn';
import styles from './Board.module.scss';
import { ColumnContextProvider } from '@/contexts/ColumnContext';
import { type TaskStatus } from '@/models';
import { type FC } from 'react';

const COLUMN_TITLES: TaskStatus[] = [
  'Planned',
  'In Progress',
  'Done',
];

export const Board: FC = () => (
  <ul className={styles.board}>
    {COLUMN_TITLES.map((title, index) => (
      // eslint-disable-next-line react/no-array-index-key -- It's a static list, so index key is fine here
      <ColumnContextProvider key={index} taskStatus={title}>
        <BoardColumn />
      </ColumnContextProvider>
    ))}
  </ul>
);
