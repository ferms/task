export enum endpoint {
  tasks = 'tasks',
}


export interface Task {
  userId?: number;
  id: string;
  title?: string;
  name?: string;
  body: string;
}

