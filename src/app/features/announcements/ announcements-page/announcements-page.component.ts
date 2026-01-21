import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AnnouncementsActions } from '../store/announcements.actions';
import { AnnouncementsSelectors } from '../store/announcements.selectors';
import { Announcement } from '../store/announcements.models';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-announcements-page',
  standalone: true,
  imports: [
    NgIf, NgFor, AsyncPipe, DatePipe, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,
    MatFormFieldModule, MatInputModule, MatChipsModule,
  ],
  templateUrl: './announcements-page.component.html',
  styleUrls: ['./announcements-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementsPageComponent {
  private readonly store = inject(Store);

  // state
  query$ = this.store.select(AnnouncementsSelectors.selectQuery);
  querySnapshot$ = this.store.select(AnnouncementsSelectors.selectQuery); // used with *ngIf as q
  filtered$ = this.store.select(AnnouncementsSelectors.selectFiltered);
  inFlight$ = this.store.select(AnnouncementsSelectors.selectInFlight);
  error$ = this.store.select(AnnouncementsSelectors.selectError);

  unreadCount$ = this.store.select(AnnouncementsSelectors.selectUnreadCount);
  requests$ = this.store.select(AnnouncementsSelectors.selectRequestsCount);

  ngOnInit() {
    this.store.dispatch(AnnouncementsActions.loadRequested());
  }

  onSearch(search: string) {
    this.store.dispatch(AnnouncementsActions.searchChanged({ search }));
  }

  toggleUnreadOnly(next: boolean) {
    this.store.dispatch(AnnouncementsActions.toggleUnreadOnly({ showUnreadOnly: next }));
  }

  markRead(id: string) {
    this.store.dispatch(AnnouncementsActions.markRead({ id }));
  }

  markAllRead() {
    this.store.dispatch(AnnouncementsActions.markAllRead());
  }

  trackById(_: number, a: Announcement) {
    return a.id;
  }
}
