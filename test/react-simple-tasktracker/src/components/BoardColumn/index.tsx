import { useAppDispatch } from '../../app/store/hooks';
import { useColumnContext } from '../../contexts/ColumnContext';
import { addCard } from '../../slice';
import { ColumnList } from '../ColumnList';
import { SaveCardForm } from '../SaveCardForm';
import styles from './BoardColumn.module.scss';
import {
  type FC,
  useCallback,
  useState,
} from 'react';

const DEFAULT_TASK = '';

export const BoardColumn: FC = () => {
  const { taskStatus } = useColumnContext();

  const [
    task,
    setTask,
  ] = useState(DEFAULT_TASK);

  const dispatch = useAppDispatch();

  const handleTaskChange = useCallback((value: string) => {
    setTask(value);
  }, []);

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

  const onSubmit = useCallback(() => {
    onAddCard();
    setTask(DEFAULT_TASK);
  }, [
    onAddCard,
  ]);

  return (
    <li className={styles.boardColumn}>
      <h3>{taskStatus}</h3>
      <ColumnList />
      <SaveCardForm
        onInputChange={handleTaskChange}
        onSubmit={onSubmit}
        submitButtonTitle='+ Add'
        value={task}
      />
    </li>
  );
};
