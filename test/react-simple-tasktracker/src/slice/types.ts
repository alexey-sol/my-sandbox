export type TaskStatus = 'Planned' | 'In Progress' | 'Done';

export type Task = {
  status: TaskStatus,
  title: string,
};
