import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';
import {EmployeesAnalyticsComponent} from './features/employees/employees-analytics.component';
import {provideState} from '@ngrx/store';
import {announcementsReducer} from './features/announcements/store/announcements.reducer';
import {provideEffects} from '@ngrx/effects';
import {AnnouncementsEffects} from './features/announcements/store/announcements.effects';
import {ANNOUNCEMENTS_FEATURE_KEY} from './features/announcements/store/announcements.feature';

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
      {
        path: 'self-service',
        loadComponent: () =>
          import('./features/self-service/self-service-page/self-service-page.component')
            .then(m => m.SelfServicePageComponent),
      },
      {
        path: 'announcements',
        loadComponent: () =>
          import('./features/announcements/ announcements-page/announcements-page.component')
            .then(m => m.AnnouncementsPageComponent),
        providers: [
          provideState(ANNOUNCEMENTS_FEATURE_KEY, announcementsReducer),
          provideEffects(AnnouncementsEffects),
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
