import { type TaskStatus } from '../../slice/types';
import { BoardColumn } from '../BoardColumn';
import styles from './Board.module.scss';
import { type FC } from 'react';

const COLUMN_TITLES: TaskStatus[] = [
  'Planned',
  'In Progress',
  'Done',
];

export const Board: FC = () => (
  <ul className={styles.board}>
    {COLUMN_TITLES.map((title, index) => (
      <BoardColumn key={index} title={title} />
    ))}
  </ul>
);
