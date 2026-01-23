import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom, delay } from 'rxjs';

import { SelfServiceActions } from './self-service.actions';
import { SelfServiceSelectors } from './self-service.selectors';
import { SelfServiceService } from './self-service.service';

@Injectable()
export class SelfServiceEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly api = inject(SelfServiceService);

  // ---------------- HOLIDAYS ----------------
  loadHolidays$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelfServiceActions.loadHolidaysRequested),
      withLatestFrom(this.store.select(SelfServiceSelectors.selectHolidaysLoaded)),
      switchMap(([_, loaded]) => {
        if (loaded) {
          // ✅ store hit → instant
          return of(SelfServiceActions.noopHolidaysAlreadyLoaded());
        }

        // ✅ API call → delayed
        return this.api.getHolidays().pipe(
          delay(800),
          map(holidays =>
            SelfServiceActions.loadHolidaysSucceeded({ holidays })
          ),
          catchError(err =>
            of(
              SelfServiceActions.loadHolidaysFailed({
                error: err?.message || 'Failed to load holidays',
              })
            )
          )
        );
      })
    )
  );

  // ---------------- CLAIMS ----------------
  loadClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelfServiceActions.loadClaimsRequested),
      withLatestFrom(this.store.select(SelfServiceSelectors.selectClaimsLoaded)),
      switchMap(([_, loaded]) => {
        if (loaded) {
          return of(SelfServiceActions.noopClaimsAlreadyLoaded());
        }

        return this.api.getClaims().pipe(
          delay(800),
          map(claims =>
            SelfServiceActions.loadClaimsSucceeded({ claims })
          ),
          catchError(err =>
            of(
              SelfServiceActions.loadClaimsFailed({
                error: err?.message || 'Failed to load claims',
              })
            )
          )
        );
      })
    )
  );

  // ---------------- POLICIES ----------------
  loadPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelfServiceActions.loadPoliciesRequested),
      withLatestFrom(this.store.select(SelfServiceSelectors.selectPoliciesLoaded)),
      switchMap(([_, loaded]) => {
        if (loaded) {
          return of(SelfServiceActions.noopPoliciesAlreadyLoaded());
        }

        return this.api.getPolicies().pipe(
          delay(800),
          map(policies =>
            SelfServiceActions.loadPoliciesSucceeded({ policies })
          ),
          catchError(err =>
            of(
              SelfServiceActions.loadPoliciesFailed({
                error: err?.message || 'Failed to load policies',
              })
            )
          )
        );
      })
    )
  );
}
