import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';

import { AnnouncementsActions } from './announcements.actions';
import { AnnouncementsSelectors } from './announcements.selectors';
import { AnnouncementsService } from './announcements.service';

@Injectable()
export class AnnouncementsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly api = inject(AnnouncementsService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      // ✅ only entry point is LoadRequested
      ofType(AnnouncementsActions.loadRequested),

      // ✅ check store state
      withLatestFrom(
        this.store.select(AnnouncementsSelectors.selectLoaded),
        this.store.select(AnnouncementsSelectors.selectInFlight)
      ),

      switchMap(([_, loaded, inFlight]) => {
        // ✅ already cached
        if (loaded) return of(AnnouncementsActions.noopAlreadyLoaded());

        // ✅ request already running
        if (inFlight) return of(AnnouncementsActions.noopAlreadyLoaded());

        // ✅ start real API request (this increments requestsCount)
        // We use LoadForced to mark inFlight=true & requestsCount++
        return of(AnnouncementsActions.loadForced());
      })
    )
  );

  // ✅ actual API call happens ONLY when LoadForced happens
  callApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnouncementsActions.loadForced),
      switchMap(() =>
        this.api.getAnnouncements().pipe(
          map(announcements => AnnouncementsActions.loadSucceeded({ announcements })),
          catchError(err =>
            of(
              AnnouncementsActions.loadFailed({
                error: err?.message || 'Failed to load announcements',
              })
            )
          )
        )
      )
    )
  );
}
