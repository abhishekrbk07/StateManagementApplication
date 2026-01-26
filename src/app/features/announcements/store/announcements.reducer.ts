import { createReducer, on } from '@ngrx/store';
import { AnnouncementsActions } from './announcements.actions';
import { Announcement } from './announcements.models';

export interface AnnouncementsQuery {
  search: string;
  showUnreadOnly: boolean;
}

export interface AnnouncementsState {
  loaded: boolean;
  inFlight: boolean;
  error: string | null;
  requestsCount: number;

  query: AnnouncementsQuery;
  announcements: Announcement[];
}

export const initialAnnouncementsState: AnnouncementsState = {
  loaded: false,
  inFlight: false,
  error: null,
  requestsCount: 0,
  query: { search: '', showUnreadOnly: false },
  announcements: [],
};

export const announcementsReducer = createReducer(
  initialAnnouncementsState,

  //  LoadRequested does NOT change requestsCount anymore
  on(AnnouncementsActions.loadRequested, state => ({
    ...state,
    error: null,
  })),

  //  When we actually start an API call
  on(AnnouncementsActions.loadForced, state => ({
    ...state,
    inFlight: true,
    error: null,
    requestsCount: state.requestsCount + 1,
  })),

  on(AnnouncementsActions.loadSucceeded, (state, { announcements }) => ({
    ...state,
    loaded: true,
    inFlight: false,
    announcements,
  })),

  on(AnnouncementsActions.loadFailed, (state, { error }) => ({
    ...state,
    inFlight: false,
    error,
  })),

  on(AnnouncementsActions.noopAlreadyLoaded, state => state),

  on(AnnouncementsActions.searchChanged, (state, { search }) => ({
    ...state,
    query: { ...state.query, search },
  })),

  on(AnnouncementsActions.toggleUnreadOnly, (state, { showUnreadOnly }) => ({
    ...state,
    query: { ...state.query, showUnreadOnly },
  })),

  on(AnnouncementsActions.markRead, (state, { id }) => ({
    ...state,
    announcements: state.announcements.map(a => (a.id === id ? { ...a, read: true } : a)),
  })),

  on(AnnouncementsActions.markAllRead, state => ({
    ...state,
    announcements: state.announcements.map(a => ({ ...a, read: true })),
  }))
);
