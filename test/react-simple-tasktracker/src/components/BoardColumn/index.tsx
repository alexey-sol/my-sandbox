import { ColumnList } from '../ColumnList';
import { SaveCardForm } from '../SaveCardForm';
import styles from './BoardColumn.module.scss';
import { useBoardColumnData } from './utils';
import {
  type FC,
  memo,
} from 'react';

const ADD_CARD_BUTTON_TITLE = '+ Add';

export const BoardColumn: FC = memo(() => {
  const {
    handleSubmit,
    handleTaskChange,
    task,
    taskStatus,
  } = useBoardColumnData();

  return (
    <li className={styles.boardColumn}>
      <h3>{taskStatus}</h3>
      <ColumnList />
      <SaveCardForm
        onInputChange={handleTaskChange}
        onSubmit={handleSubmit}
        submitButtonTitle={ADD_CARD_BUTTON_TITLE}
        value={task}
      />
    </li>
  );
});
