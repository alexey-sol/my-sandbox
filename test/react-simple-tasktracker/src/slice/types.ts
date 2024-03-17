type HasId = {
  id: string,
};

type HasTaskStatus = {
  status: TaskStatus,
};

export type TaskStatus = 'Planned' | 'In Progress' | 'Done';

export type Card = HasId & {
  task: string,
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
