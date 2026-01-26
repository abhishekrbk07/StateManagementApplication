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
import {SelfServiceEffects} from './features/self-service/store/self-service.effects';
import {ANNOUNCEMENTS_FEATURE_KEY} from './features/announcements/store/announcements.feature';
import {announcementsReducer} from './features/announcements/store/announcements.reducer';
import {SELF_SERVICE_FEATURE_KEY} from './features/self-service/store/self-service.feature';
import {selfServiceReducer} from './features/self-service/store/self-service.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),

    // Root store
    provideStore(),

    // Feature state
    provideState(employeesFeature),
    provideState(ANNOUNCEMENTS_FEATURE_KEY, announcementsReducer),
    provideState(SELF_SERVICE_FEATURE_KEY, selfServiceReducer),

    //  Effects
    provideEffects([EmployeesEffects, AnnouncementsEffects,SelfServiceEffects
    ]),

    //  Devtools
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
  ],
};
