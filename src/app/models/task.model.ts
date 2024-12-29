export enum endpoint {
  tasks = 'tasks',
}


export interface Task {
  userId?: number;
  id: number;
  title?: string;
  name?: string;
  body: string;
  email?: string;
  completed?: boolean; 
}

