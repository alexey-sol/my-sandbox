export type TaskStatus = 'Planned' | 'In Progress' | 'Done';

export type Card = {
  id: string,
  status: TaskStatus,
  task: string,
};
