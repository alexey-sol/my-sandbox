import { SaveCardForm } from '../SaveCardForm';
import styles from './CardPreview.module.scss';
import {
  useCardPreviewData,
  type UseCardPreviewDataProps,
} from '@/components/CardPreview/utils';
import {
  type FC,
  memo,
} from 'react';

export const CardPreview: FC<UseCardPreviewDataProps> = memo((props) => {
  const {
    dragRef,
    onTaskChange,
    onTaskSubmit,
    task,
  } = useCardPreviewData(props);

  return (
    <li className={styles.cardPreview} ref={dragRef}>
      <SaveCardForm
        onInputChange={onTaskChange}
        onSubmit={onTaskSubmit}
        value={task}
      />
    </li>
  );
}, (previousProps, nextProps) => previousProps.card.task === nextProps.card.task);
