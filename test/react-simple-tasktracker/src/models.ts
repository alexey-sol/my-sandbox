export type TaskStatus = 'Planned' | 'In Progress' | 'Done';

export type HasId = {
  id: string,
};

export type Card = HasId & {
  task: string,
};
