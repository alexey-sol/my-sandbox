import {
  type Card,
  type HasId,
  type TaskStatus,
} from '@/models';

type HasTaskStatus = {
  status: TaskStatus,
};

export type AddCardProps = {
  data: Pick<Card, 'task'>,
  meta: HasTaskStatus,
};

export type UpdateCardProps = {
  data?: Partial<Pick<Card, 'task'>>,
  meta: HasId & HasTaskStatus & {
    index?: number,
  },
};
