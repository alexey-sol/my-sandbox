import { useAppDispatch } from '../../app/store/hooks';
import { useColumnContext } from '../../contexts/ColumnContext';
import { addCard } from '../../slice';
import {
  type ChangeEventHandler,
  type FormEventHandler,
  useState,
} from 'react';

const DEFAULT_TASK = '';
const INPUT_MAX_LENGTH = 255;
const INPUT_PLACEHOLDER = 'Task title goes here';

export const ColumnForm = () => {
  const { taskStatus } = useColumnContext();

  const [
    task,
    setTask,
  ] = useState(DEFAULT_TASK);

  const dispatch = useAppDispatch();

  const handleTaskTitleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setTask(target.value);
  };

  const handleAddCard = () => {
    dispatch(addCard({
      data: { task },
      meta: { status: taskStatus },
    }));
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    // TODO validate task length >0 && <=TITLE_MAX_LENGTH
    handleAddCard();
    setTask(DEFAULT_TASK);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        maxLength={INPUT_MAX_LENGTH}
        onChange={handleTaskTitleChange}
        placeholder={INPUT_PLACEHOLDER}
        value={task}
      />
      <button type='submit'>+Add</button>
    </form>
  );
};
