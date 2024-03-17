import { dragTypes } from '../../const';
import { type Card } from '../../slice/types';
import styles from './CardPreview.module.scss';
import { type FC } from 'react';
import { useDrag } from 'react-dnd';

type CardPreviewProps = {
  readonly card: Card,
};

export const CardPreview: FC<CardPreviewProps> = ({ card }) => {
  const [
    , dragRef,
  ] = useDrag(
    () => ({
      collect: (monitor) => ({ isDragging: Boolean(monitor.isDragging()) }),
      item: card,
      type: dragTypes.CARD,
    }),
    [],
  );

  return (
    <li className={styles.cardPreview} ref={dragRef}>{card.task}</li>
  );
};
