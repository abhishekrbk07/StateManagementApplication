import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmployeesActions } from './state/employees.actions';
import { EmployeesSelectors } from './state/employees.selectors';

@Component({
  selector: 'app-employees-analytics',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './employees-analytics.component.html',
  styleUrls: ['./employees-analytics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesAnalyticsComponent implements OnInit {
  private readonly store = inject(Store);

  inFlight$ = this.store.select(EmployeesSelectors.selectInFlight);
  error$ = this.store.select(EmployeesSelectors.selectError);
  departmentStats$ = this.store.select(EmployeesSelectors.selectDepartmentStats);

  ngOnInit(): void {
    // ✅ Fetch once, reused globally (Employees / Analytics tabs)
    this.store.dispatch(EmployeesActions.loadRequested());
  }
}
