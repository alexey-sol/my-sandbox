import { CardDroppableWrapper } from '../CardDroppableWrapper';
import { CardPreview } from '../CardPreview';
import styles from './ColumnList.module.scss';
import { useAppSelector } from '@/app/store/hooks';
import { useColumnContext } from '@/contexts/ColumnContext';
import { selectAllCardsByStatus } from '@/slice/selectors';
import {
  type FC,
  memo,
  useCallback,
} from 'react';

const STUB_TEXT = 'No tasks yet';

export const ColumnList: FC = memo(() => {
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
      <p>{STUB_TEXT}</p>
    </CardDroppableWrapper>
  ), []);

  return (
    <ul className={styles.columnList}>
      {hasCards ? renderCards() : renderStub()}
    </ul>
  );
});
