import { createReducer, on } from '@ngrx/store';
import { SelfServiceActions } from './self-service.actions';
import { Claim, Holiday, Policy } from './self-service.models';

export interface SelfServiceState {
  holidaysLoaded: boolean;
  claimsLoaded: boolean;
  policiesLoaded: boolean;

  holidaysInFlight: boolean;
  claimsInFlight: boolean;
  policiesInFlight: boolean;

  error: string | null;
  requestsCount: number;

  holidays: Holiday[];
  claims: Claim[];
  policies: Policy[];
}

export const initialSelfServiceState: SelfServiceState = {
  holidaysLoaded: false,
  claimsLoaded: false,
  policiesLoaded: false,

  holidaysInFlight: false,
  claimsInFlight: false,
  policiesInFlight: false,

  error: null,
  requestsCount: 0,

  holidays: [],
  claims: [],
  policies: [],
};

export const selfServiceReducer = createReducer(
  initialSelfServiceState,

  // ===== Holidays
  on(SelfServiceActions.loadHolidaysRequested, state => ({
    ...state,
    holidaysInFlight: true,
    error: null,
    requestsCount: state.requestsCount + 1,
  })),

  on(SelfServiceActions.loadHolidaysSucceeded, (state, { holidays }) => ({
    ...state,
    holidaysLoaded: true,
    holidaysInFlight: false,
    holidays,
  })),

  on(SelfServiceActions.loadHolidaysFailed, (state, { error }) => ({
    ...state,
    holidaysInFlight: false,
    error,
  })),

  // ✅ CRITICAL FIX: when already loaded → stop spinner
  on(SelfServiceActions.noopHolidaysAlreadyLoaded, state => ({
    ...state,
    holidaysInFlight: false,
  })),

  // ===== Claims
  on(SelfServiceActions.loadClaimsRequested, state => ({
    ...state,
    claimsInFlight: true,
    error: null,
    requestsCount: state.requestsCount + 1,
  })),

  on(SelfServiceActions.loadClaimsSucceeded, (state, { claims }) => ({
    ...state,
    claimsLoaded: true,
    claimsInFlight: false,
    claims,
  })),

  on(SelfServiceActions.loadClaimsFailed, (state, { error }) => ({
    ...state,
    claimsInFlight: false,
    error,
  })),

  on(SelfServiceActions.noopClaimsAlreadyLoaded, state => ({
    ...state,
    claimsInFlight: false,
  })),

  // ===== Policies
  on(SelfServiceActions.loadPoliciesRequested, state => ({
    ...state,
    policiesInFlight: true,
    error: null,
    requestsCount: state.requestsCount + 1,
  })),

  on(SelfServiceActions.loadPoliciesSucceeded, (state, { policies }) => ({
    ...state,
    policiesLoaded: true,
    policiesInFlight: false,
    policies,
  })),

  on(SelfServiceActions.loadPoliciesFailed, (state, { error }) => ({
    ...state,
    policiesInFlight: false,
    error,
  })),

  on(SelfServiceActions.noopPoliciesAlreadyLoaded, state => ({
    ...state,
    policiesInFlight: false,
  }))
);
