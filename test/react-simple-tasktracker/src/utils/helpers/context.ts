import { ContextOutsideProviderError } from '../errors';
import {
  type Context,
  useContext,
} from 'react';

const useCustomContext = <Value>(Context_: Context<Value | null>): Value | never => {
  const context = useContext(Context_);

  if (context === null) {
    throw new ContextOutsideProviderError();
  }

  return context;
};

export const getUseContextOrThrowError = <Value>(Context_: Context<Value | null>): () => Value | never => () => useCustomContext<Value>(Context_);
