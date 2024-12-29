import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'task',
        pathMatch: 'full',
      },
      {
        path: 'task',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/task/task.component').then(
                (c) => c.TaskComponent,
              ),
          },
        ],
      },
];
