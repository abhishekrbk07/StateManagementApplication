import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

import { SelfServiceActions } from '../store/self-service.actions';
import { SelfServiceSelectors } from '../store/self-service.selectors';

@Component({
  selector: 'app-self-service-page',
  standalone: true,
  imports: [
    NgIf, NgFor, AsyncPipe, DatePipe,
    MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, MatChipsModule, MatTabsModule,
  ],
  templateUrl: './self-service-page.component.html',
  styleUrls: ['./self-service-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelfServicePageComponent implements OnInit {
  private readonly store = inject(Store);

  inFlight$ = this.store.select(SelfServiceSelectors.selectInFlight);
  error$ = this.store.select(SelfServiceSelectors.selectError);
  requests$ = this.store.select(SelfServiceSelectors.selectRequestsCount);

  holidays$ = this.store.select(SelfServiceSelectors.selectHolidays);
  claims$ = this.store.select(SelfServiceSelectors.selectClaims);
  policies$ = this.store.select(SelfServiceSelectors.selectPolicies);

  ngOnInit(): void {
    // ✅ store-first effects (loads once, then noop on next visits)
    this.store.dispatch(SelfServiceActions.loadHolidaysRequested());
    this.store.dispatch(SelfServiceActions.loadClaimsRequested());
    this.store.dispatch(SelfServiceActions.loadPoliciesRequested());
  }

  refreshAll() {
    // Keep demo simple: re-request (effects will noop if already loaded)
    this.store.dispatch(SelfServiceActions.loadHolidaysRequested());
    this.store.dispatch(SelfServiceActions.loadClaimsRequested());
    this.store.dispatch(SelfServiceActions.loadPoliciesRequested());
  }
}
