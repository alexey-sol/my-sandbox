import { useAppDispatch } from '@/app/store/hooks';
import { dragTypes } from '@/const';
import { useColumnContext } from '@/contexts/ColumnContext';
import { updateCard } from '@/slice';
import { isCard } from '@/utils/helpers/guards';
import { useDrop } from 'react-dnd';

export type UseCardDroppableWrapperDataProps = { readonly index?: number, };

export const useCardDroppableWrapperData = ({ index = 0 }: UseCardDroppableWrapperDataProps) => {
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

  return { dropRef };
};
