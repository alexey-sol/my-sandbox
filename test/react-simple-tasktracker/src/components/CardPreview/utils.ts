import { useAppDispatch } from '@/app/store/hooks';
import { dragTypes } from '@/const';
import { useColumnContext } from '@/contexts/ColumnContext';
import { type Card } from '@/models';
import { updateCard } from '@/slice';
import {
  useCallback,
  useState,
} from 'react';
import { useDrag } from 'react-dnd';

export type UseCardPreviewDataProps = {
  readonly card: Card,
};

export const useCardPreviewData = ({ card }: UseCardPreviewDataProps) => {
  const { taskStatus } = useColumnContext();

  const [
    task,
    setTask,
  ] = useState(card.task);

  const dispatch = useAppDispatch();

  const onTaskChange = useCallback((value: string) => {
    setTask(value);

    dispatch(updateCard({
      data: { task: value },
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

  return {
    dragRef,
    onTaskChange,
    task,
  };
};
