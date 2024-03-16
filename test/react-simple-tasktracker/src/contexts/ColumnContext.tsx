import { type TaskStatus } from '../slice/types';
import { getUseContextOrThrowError } from '../utils/helpers/context';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useMemo,
} from 'react';

type HasTaskStatus = {
  readonly taskStatus: TaskStatus,
};

export const ColumnContext = createContext<HasTaskStatus | null>(null);

export const ColumnContextProvider: FC<PropsWithChildren<HasTaskStatus>> = ({
  children,
  taskStatus,
}) => {
  const value = useMemo<HasTaskStatus>(() => ({ taskStatus }), [
    taskStatus,
  ]);

  return (
    <ColumnContext.Provider value={value}>
      {children}
    </ColumnContext.Provider>
  );
};

export const useColumnContext = getUseContextOrThrowError<HasTaskStatus>(ColumnContext);
