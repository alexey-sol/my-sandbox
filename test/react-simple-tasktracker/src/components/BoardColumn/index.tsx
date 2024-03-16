import { useColumnContext } from '../../contexts/ColumnContext';
import { ColumnForm } from '../ColumnForm';
import { ColumnList } from '../ColumnList';
import styles from './BoardColumn.module.scss';
import { type FC } from 'react';

export const BoardColumn: FC = () => {
  const { taskStatus } = useColumnContext();

  return (
    <li className={styles.boardColumn}>
      <p>{taskStatus}</p>
      <ColumnList />
      <ColumnForm />
    </li>
  );
};
