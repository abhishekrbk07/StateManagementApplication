import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ANNOUNCEMENTS_FEATURE_KEY } from './announcements.feature';
import { AnnouncementsState, initialAnnouncementsState } from './announcements.reducer';
import { Announcement } from './announcements.models';

const selectFeature = createFeatureSelector<AnnouncementsState>(ANNOUNCEMENTS_FEATURE_KEY);

//  safe: prevents crashes before feature state exists (or during init)
const selectStateSafe = createSelector(selectFeature, s => s ?? initialAnnouncementsState);

export const AnnouncementsSelectors = {
  selectLoaded: createSelector(selectStateSafe, s => s.loaded),
  selectInFlight: createSelector(selectStateSafe, s => s.inFlight),
  selectError: createSelector(selectStateSafe, s => s.error),
  selectRequestsCount: createSelector(selectStateSafe, s => s.requestsCount),

  selectQuery: createSelector(selectStateSafe, s => s.query),
  selectAll: createSelector(selectStateSafe, s => s.announcements),

  selectUnreadCount: createSelector(selectStateSafe, s => s.announcements.filter(a => !a.read).length),

  selectFiltered: createSelector(selectStateSafe, (state): Announcement[] => {
    let list: Announcement[] = state.announcements;

    if (state.query.showUnreadOnly) {
      list = list.filter(a => !a.read);
    }

    const q = state.query.search?.trim().toLowerCase();
    if (q) {
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.message.toLowerCase().includes(q)
      );
    }

    return list;
  }),
};
