import * as cn from './const';
import styles from './SaveCardForm.module.scss';
import { isValidInput } from './utils';
import {
  type ChangeEventHandler,
  type FC,
  type FormEventHandler,
  memo,
} from 'react';

type SaveCardFormProps = {
  readonly onInputChange: (value: string) => void,
  readonly onSubmit: () => void,
  readonly submitButtonTitle?: string,
  readonly value?: string,
};

export const SaveCardForm: FC<SaveCardFormProps> = memo(({
  onInputChange,
  onSubmit,
  submitButtonTitle = cn.DEFAULT_SUBMIT_BUTTON_TITLE,
  value = '',
}) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onInputChange(target.value);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (isValidInput(value)) {
      onSubmit();
    } else {
      console.error(cn.INVALID_FORM_MESSAGE); // eslint-disable-line no-console -- Good enough for now
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        maxLength={cn.INPUT_MAX_LENGTH}
        onChange={handleInputChange}
        placeholder={cn.INPUT_PLACEHOLDER}
        title={value}
        value={value}
      />
      <button className={styles.button} type='submit'>
        {submitButtonTitle}
      </button>
    </form>
  );
});
