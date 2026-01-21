import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { appRoutes } from './app.routes';
import { employeesFeature } from './features/employees/store/employees.reducer';
import { EmployeesEffects } from './features/employees/store/employees.effects';
import {AnnouncementsEffects} from './features/announcements/store/announcements.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),

    // ✅ Root store
    provideStore(),

    // ✅ Feature state
    provideState(employeesFeature),

    // ✅ Effects
    provideEffects([EmployeesEffects, AnnouncementsEffects,
    ]),

    // ✅ Devtools
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
  ],
};
