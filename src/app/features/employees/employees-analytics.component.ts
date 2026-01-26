import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmployeesActions } from './store/employees.actions';
import { EmployeesSelectors } from './store/employees.selectors';
import {DepartmentPieComponent} from '../../shared/components/department-pie/department-pie.component';

@Component({
  selector: 'app-employees-analytics',
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    MatCardModule,
    MatProgressSpinnerModule,
    DepartmentPieComponent,
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
    //  Fetch once, reused globally (Employees / Analytics tabs)
    this.store.dispatch(EmployeesActions.loadRequested());
  }
  short(name: string) {
    return (name || '').split(/\s+/).slice(0, 2).map(x => x[0]?.toUpperCase()).join('');
  }

  percent(count: number, stats: { count: number }[]) {
    const total = stats.reduce((s, x) => s + x.count, 0) || 1;
    return Math.round((count / total) * 100);
  }

}
