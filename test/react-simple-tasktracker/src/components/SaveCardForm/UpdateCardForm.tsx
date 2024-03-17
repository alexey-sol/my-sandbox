import * as cn from './const';
import styles from './SaveCardForm.module.scss';
import {
  handleValidationError,
  isValidInputOnUpdate,
} from './utils';
import {
  type ChangeEventHandler,
  type FC,
  memo,
} from 'react';

type UpdateCardFormProps = {
  readonly onChange: (value: string) => void,
  readonly value?: string,
};

export const UpdateCardForm: FC<UpdateCardFormProps> = memo(({
  onChange,
  value = '',
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const newValue = target.value;

    if (isValidInputOnUpdate(newValue)) {
      onChange(newValue);
    } else {
      handleValidationError(cn.INVALID_UPDATE_TASK_MESSAGE);
    }
  };

  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        maxLength={cn.INPUT_MAX_LENGTH}
        onChange={handleChange}
        placeholder={cn.INPUT_PLACEHOLDER}
        title={value}
        value={value}
      />
    </form>
  );
});
