import { useAppDispatch } from '../../app/store/hooks';
import { dragTypes } from '../../const';
import { useColumnContext } from '../../contexts/ColumnContext';
import { updateCard } from '../../slice';
import { type Card } from '../../slice/types';
import { SaveCardForm } from '../SaveCardForm';
import styles from './CardPreview.module.scss';
import {
  type FC,
  useCallback,
  useState,
} from 'react';
import { useDrag } from 'react-dnd';

type CardPreviewProps = {
  readonly card: Card,
};

export const CardPreview: FC<CardPreviewProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { taskStatus } = useColumnContext();

  const [
    task,
    setTask,
  ] = useState(card.task);

  const onTaskChange = useCallback((value: string) => {
    setTask(value);
  }, []);

  const onTaskSubmit = useCallback(() => {
    dispatch(updateCard({
      data: { task },
      meta: {
        id: card.id,
        status: taskStatus,
      },
    }));
  }, [
    card.id,
    dispatch,
    task,
    taskStatus,
  ]);

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
    <li className={styles.cardPreview} ref={dragRef}>
      <SaveCardForm
        onInputChange={onTaskChange}
        onSubmit={onTaskSubmit}
        value={task}
      />
    </li>
  );
};
