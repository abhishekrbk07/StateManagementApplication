import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Announcement, AnnouncementId } from './announcements.models';

export const AnnouncementsActions = createActionGroup({
  source: 'Announcements',
  events: {
    LoadRequested: emptyProps(),
    LoadForced: emptyProps(), // ✅ force refresh if needed

    LoadSucceeded: props<{ announcements: Announcement[] }>(),
    LoadFailed: props<{ error: string }>(),
    NoopAlreadyLoaded: emptyProps(),

    SearchChanged: props<{ search: string }>(),
    ToggleUnreadOnly: props<{ showUnreadOnly: boolean }>(),

    MarkRead: props<{ id: AnnouncementId }>(),
    MarkAllRead: emptyProps(),
  },
});
