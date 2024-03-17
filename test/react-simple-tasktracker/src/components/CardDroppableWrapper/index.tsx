import {
  useCardDroppableWrapperData,
  type UseCardDroppableWrapperDataProps,
} from './utils';
import {
  type FC,
  memo,
  type PropsWithChildren,
} from 'react';

type CardDroppableWrapperProps = PropsWithChildren<UseCardDroppableWrapperDataProps>;

export const CardDroppableWrapper: FC<CardDroppableWrapperProps> = memo(({
  children,
  index,
}) => {
  const { dropRef } = useCardDroppableWrapperData({ index });

  return (
    <section ref={dropRef}>
      {children}
    </section>
  );
});
