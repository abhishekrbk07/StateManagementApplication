import { ChangeDetectionStrategy, Component, OnInit, inject, DestroyRef } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { Actions, ofType } from '@ngrx/effects';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EmployeesToolbarComponent } from '../employees-toolbar/employees-toolbar.component';
import { EmployeeCardComponent } from '../../../shared/components/employee-card/employee-card.component';

import { EmployeesActions } from '../store/employees.actions';
import { EmployeesSelectors } from '../store/employees.selectors';
import { CreateEmployeeRequest } from '../store/employees.models';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    ReactiveFormsModule,

    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatExpansionModule,

    EmployeesToolbarComponent,
    EmployeeCardComponent,
  ],
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  private readonly actions$ = inject(Actions);
  private readonly snack = inject(MatSnackBar);

  private readonly destroyRef = inject(DestroyRef);

  query$ = this.store.select(EmployeesSelectors.selectQuery);
  total$ = this.store.select(EmployeesSelectors.selectTotal);
  filteredTotal$ = this.store.select(EmployeesSelectors.selectFilteredTotal);
  paged$ = this.store.select(EmployeesSelectors.selectPaged);

  inFlight$ = this.store.select(EmployeesSelectors.selectInFlight);
  creating$ = this.store.select(EmployeesSelectors.selectCreating);
  error$ = this.store.select(EmployeesSelectors.selectError);
  requests$ = this.store.select(EmployeesSelectors.selectRequestsCount);

  // ✅ Collapsible "Add Employee"
  createOpen = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    role: ['', Validators.required],
    location: ['', Validators.required],
    level: ['Mid', Validators.required],
  });

  ngOnInit(): void {
    this.load();

    this.actions$
      .pipe(ofType(EmployeesActions.createSucceeded), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // keep collapse OPEN? up to you. I close it for a crisp UX:
        this.createOpen = false;

        this.form.reset({
          name: '',
          email: '',
          department: '',
          role: '',
          location: '',
          level: 'Mid',
        });

        this.form.markAsPristine();
        this.form.markAsUntouched();

        this.snack.open('Employee added (store updated, no re-fetch).', 'OK', { duration: 2200 });
      });

    this.actions$
      .pipe(ofType(EmployeesActions.createFailed), takeUntilDestroyed(this.destroyRef))
      .subscribe(({ error }) => {
        this.snack.open(error || 'Failed to add employee', 'OK', { duration: 3000 });
      });

    this.actions$
      .pipe(ofType(EmployeesActions.deleteSucceeded), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.snack.open('Employee deleted (store updated, no re-fetch).', 'OK', { duration: 2000 });
      });

    this.actions$
      .pipe(ofType(EmployeesActions.deleteFailed), takeUntilDestroyed(this.destroyRef))
      .subscribe(({ error }) => {
        this.snack.open(error || 'Failed to delete employee', 'OK', { duration: 3000 });
      });
  }

  load() {
    this.store.dispatch(EmployeesActions.loadRequested());
  }

  onSearch(search: string) {
    this.store.dispatch(EmployeesActions.searchChanged({ search }));
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.getRawValue() as CreateEmployeeRequest;
    this.store.dispatch(EmployeesActions.createRequested({ employee: payload }));
  }

  resetForm() {
    this.form.reset({ level: 'Mid' });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  isDeleting(id: string) {
    return this.store.select(EmployeesSelectors.selectIsDeleting(id));
  }

  deleteEmployee(id: string) {
    this.store.dispatch(EmployeesActions.deleteRequested({ id }));
  }

  async prev() {
    const q = await firstValueFrom(this.query$);
    this.store.dispatch(
      EmployeesActions.pageChanged({
        pageIndex: Math.max(0, q.pageIndex - 1),
        pageSize: q.pageSize,
      })
    );
  }

  async next(filteredTotal: number) {
    const q = await firstValueFrom(this.query$);
    if (!this.isLastPage(filteredTotal, q.pageIndex, q.pageSize)) {
      this.store.dispatch(
        EmployeesActions.pageChanged({
          pageIndex: q.pageIndex + 1,
          pageSize: q.pageSize,
        })
      );
    }
  }

  trackById = (_: number, e: any) => e.id;

  totalPages(total: number, pageSize: number) {
    return Math.max(1, Math.ceil(total / pageSize));
  }

  isLastPage(total: number, pageIndex: number, pageSize: number) {
    return pageIndex >= this.totalPages(total, pageSize) - 1;
  }
}
