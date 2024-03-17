import { useAppDispatch } from '../../app/store/hooks';
import { dragTypes } from '../../const';
import { useColumnContext } from '../../contexts/ColumnContext';
import { updateCard } from '../../slice';
import { isCard } from '../../utils/helpers/guards';
import {
  type FC,
  type PropsWithChildren,
} from 'react';
import { useDrop } from 'react-dnd';

type CardDroppableWrapperProps = PropsWithChildren<{ readonly index?: number, }>;

export const CardDroppableWrapper: FC<CardDroppableWrapperProps> = ({
  children,
  index = 0,
}) => {
  const { taskStatus } = useColumnContext();
  const dispatch = useAppDispatch();

  const onUpdateCard = (cardId: string) => dispatch(updateCard({
    meta: {
      id: cardId,
      index,
      status: taskStatus,
    },
  }));

  const [
    , dropRef,
  ] = useDrop(
    () => ({
      accept: dragTypes.CARD,
      collect: (monitor) => ({ isOver: Boolean(monitor.isOver()) }),
      drop: (item) => isCard(item) && onUpdateCard(item.id),
    }),
    [
      index,
    ],
  );

  return (
    <section ref={dropRef}>
      {children}
    </section>
  );
};

