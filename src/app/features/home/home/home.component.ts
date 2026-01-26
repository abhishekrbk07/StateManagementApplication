import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { StatBadgeComponent } from '../../../shared/components/stat-badge/stat-badge.component';
import { EmployeesActions } from '../../employees/store/employees.actions';
import { EmployeesSelectors } from '../../employees/store/employees.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    StatBadgeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly store = inject(Store);

  total$ = this.store.select(EmployeesSelectors.selectTotal);
  requests$ = this.store.select(EmployeesSelectors.selectRequestsCount);
  inFlight$ = this.store.select(EmployeesSelectors.selectInFlight);

  warmCache() {
    // Demonstrates request de-dupe: calling load again won't hit the API if already loaded/inFlight.
    this.store.dispatch(EmployeesActions.preloadRequested());
  }
}
