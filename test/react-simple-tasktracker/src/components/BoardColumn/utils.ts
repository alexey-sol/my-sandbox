import { useAppDispatch } from '@/app/store/hooks';
import { useColumnContext } from '@/contexts/ColumnContext';
import { addCard } from '@/slice';
import {
  useCallback,
  useState,
} from 'react';

const DEFAULT_TASK = '';

export const useBoardColumnData = () => {
  const { taskStatus } = useColumnContext();

  const [
    task,
    setTask,
  ] = useState(DEFAULT_TASK);

  const dispatch = useAppDispatch();

  const onAddCard = useCallback(() => {
    dispatch(addCard({
      data: { task },
      meta: { status: taskStatus },
    }));
  }, [
    dispatch,
    task,
    taskStatus,
  ]);

  const handleTaskChange = useCallback((value: string) => {
    setTask(value);
  }, []);

  const handleSubmit = useCallback(() => {
    onAddCard();
    setTask(DEFAULT_TASK);
  }, [
    onAddCard,
  ]);

  return {
    handleSubmit,
    handleTaskChange,
    task,
    taskStatus,
  };
};
