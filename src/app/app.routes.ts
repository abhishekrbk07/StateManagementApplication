import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';
import {EmployeesAnalyticsComponent} from './features/employees/employees-analytics.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/home/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./features/employees/employees-page/employees-page.component').then(m => m.EmployeesPageComponent),
      },
      { path: 'analytics', component: EmployeesAnalyticsComponent },

    ],
  },
  { path: '**', redirectTo: '' },
];
