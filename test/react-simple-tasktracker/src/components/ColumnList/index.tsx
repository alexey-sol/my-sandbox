import { useAppSelector } from '../../app/store/hooks';
import { useColumnContext } from '../../contexts/ColumnContext';
import { selectAllCardsByStatus } from '../../slice/selectors';
import styles from './ColumnList.module.scss';
import { type FC } from 'react';

export const ColumnList: FC = () => {
  const { taskStatus } = useColumnContext();
  const cards = useAppSelector((state) => selectAllCardsByStatus(state, taskStatus));

  return (
    <ul className={styles.columnList}>
      {cards.map((card) => (
        <li className={styles.card} key={card.id}>{card.task}</li>
      ))}
    </ul>
  );
};
