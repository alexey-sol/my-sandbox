import styles from './SaveCardForm.module.scss';
import {
  type ChangeEventHandler,
  type FC,
  type FormEventHandler,
} from 'react';

const INPUT_MAX_LENGTH = 255;
const INPUT_PLACEHOLDER = 'Task title goes here';
const DEFAULT_SUBMIT_BUTTON_TITLE = 'Save';
const INVALID_FORM_MESSAGE = 'Task message must not be empty or too long';

type SaveCardFormProps = {
  readonly onInputChange: (value: string) => void,
  readonly onSubmit: () => void,
  readonly submitButtonTitle?: string,
  readonly value?: string,
};

export const SaveCardForm: FC<SaveCardFormProps> = ({
  onInputChange,
  onSubmit,
  submitButtonTitle = DEFAULT_SUBMIT_BUTTON_TITLE,
  value = '',
}) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    onInputChange(target.value);
  };

  const isValidForm = () => value.length > 0 && value.length <= INPUT_MAX_LENGTH;

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (isValidForm()) {
      onSubmit();
    } else {
      console.error(INVALID_FORM_MESSAGE);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        maxLength={INPUT_MAX_LENGTH}
        onChange={handleInputChange}
        placeholder={INPUT_PLACEHOLDER}
        title={value}
        value={value}
      />
      <button className={styles.button} type='submit'>{submitButtonTitle}</button>
    </form>
  );
};
