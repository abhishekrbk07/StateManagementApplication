import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SELF_SERVICE_FEATURE_KEY } from './self-service.feature';
import { SelfServiceState, initialSelfServiceState } from './self-service.reducer';

const selectFeature = createFeatureSelector<SelfServiceState>(SELF_SERVICE_FEATURE_KEY);

// ✅ safe during app init
const selectStateSafe = createSelector(selectFeature, s => s ?? initialSelfServiceState);

export const SelfServiceSelectors = {
  selectError: createSelector(selectStateSafe, s => s.error),
  selectRequestsCount: createSelector(selectStateSafe, s => s.requestsCount),

  selectHolidaysLoaded: createSelector(selectStateSafe, s => s.holidaysLoaded),
  selectClaimsLoaded: createSelector(selectStateSafe, s => s.claimsLoaded),
  selectPoliciesLoaded: createSelector(selectStateSafe, s => s.policiesLoaded),

  selectHolidaysInFlight: createSelector(selectStateSafe, s => s.holidaysInFlight),
  selectClaimsInFlight: createSelector(selectStateSafe, s => s.claimsInFlight),
  selectPoliciesInFlight: createSelector(selectStateSafe, s => s.policiesInFlight),

  // overall
  selectInFlight: createSelector(
    selectStateSafe,
    s => s.holidaysInFlight || s.claimsInFlight || s.policiesInFlight
  ),

  selectHolidays: createSelector(selectStateSafe, s => s.holidays),
  selectClaims: createSelector(selectStateSafe, s => s.claims),
  selectPolicies: createSelector(selectStateSafe, s => s.policies),
};
