import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, concat, map, of, switchMap, take } from 'rxjs';

import { EmployeesActions } from './employees.actions';
import { EmployeesSelectors } from './employees.selectors';
import { EmployeesService } from '../../../core/data/employees.service';

@Injectable()
export class EmployeesEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly api = inject(EmployeesService);

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.loadRequested),
      switchMap(() => this.store.select(EmployeesSelectors.selectLoaded).pipe(take(1))),
      switchMap(loaded => {
        if (loaded) return of({ type: '[Employees] Noop (already loaded)' });

        return concat(
          of(EmployeesActions.loadStarted()),
          this.api.fetchEmployees().pipe(
            map(employees => EmployeesActions.loadSucceeded({ employees })),
            catchError(err => of(EmployeesActions.loadFailed({ error: this.api.humanizeError(err) })))
          )
        );
      })
    )
  );


  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.createRequested),
      switchMap(({ employee }) =>
        this.api.createEmployee(employee).pipe(
          map(createdEmployee => EmployeesActions.createSucceeded({ employee: createdEmployee })),
          catchError(err => of(EmployeesActions.createFailed({ error: this.api.humanizeError(err) })))
        )
      )
    )
  );

  // ✅ Delete: on 200 remove from store (NO re-fetch)
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.deleteRequested),
      switchMap(({ id }) =>
        this.api.deleteEmployee(id).pipe(
          map(() => EmployeesActions.deleteSucceeded({ id })),
          catchError(err => of(EmployeesActions.deleteFailed({ error: this.api.humanizeError(err) })))
        )
      )
    )
  );

  preload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.preloadRequested),
      switchMap(() =>
        this.store.select(EmployeesSelectors.selectLoaded).pipe(take(1))
      ),
      switchMap(loaded => {
        if (loaded) return of();
        return this.api.preloadEmployees().pipe(
          map(employees => EmployeesActions.loadSucceeded({ employees })),
          catchError(() => of()) // silent preload failure
        );
      })
    )
  );

}
