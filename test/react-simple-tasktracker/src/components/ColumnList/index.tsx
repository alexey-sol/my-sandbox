import { useAppSelector } from '../../app/store/hooks';
import { useColumnContext } from '../../contexts/ColumnContext';
import { selectAllCardsByStatus } from '../../slice/selectors';
import { CardDroppableWrapper } from '../CardDroppableWrapper';
import { CardPreview } from '../CardPreview';
import styles from './ColumnList.module.scss';
import {
  type FC,
  useCallback,
} from 'react';

export const ColumnList: FC = () => {
  const { taskStatus } = useColumnContext();
  const cards = useAppSelector((state) => selectAllCardsByStatus(state, taskStatus));
  const hasCards = cards.length > 0;

  const renderCards = useCallback(() => cards.map((card, index) => (
    <CardDroppableWrapper index={index} key={card.id}>
      <CardPreview card={card} />
    </CardDroppableWrapper>
  )), [
    cards,
  ]);

  const renderStub = useCallback(() => (
    <CardDroppableWrapper>
      <p>No tasks yet</p>
    </CardDroppableWrapper>
  ), []);

  return (
    <ul className={styles.columnList}>
      {hasCards ? renderCards() : renderStub()}
    </ul>
  );
};
