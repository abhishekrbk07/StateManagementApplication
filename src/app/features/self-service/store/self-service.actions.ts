import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Claim, Holiday, Policy } from './self-service.models';

export const SelfServiceActions = createActionGroup({
  source: 'SelfService',
  events: {
    // Holidays
    LoadHolidaysRequested: emptyProps(),
    LoadHolidaysSucceeded: props<{ holidays: Holiday[] }>(),
    LoadHolidaysFailed: props<{ error: string }>(),
    NoopHolidaysAlreadyLoaded: emptyProps(),

    // Claims
    LoadClaimsRequested: emptyProps(),
    LoadClaimsSucceeded: props<{ claims: Claim[] }>(),
    LoadClaimsFailed: props<{ error: string }>(),
    NoopClaimsAlreadyLoaded: emptyProps(),

    // Policies
    LoadPoliciesRequested: emptyProps(),
    LoadPoliciesSucceeded: props<{ policies: Policy[] }>(),
    LoadPoliciesFailed: props<{ error: string }>(),
    NoopPoliciesAlreadyLoaded: emptyProps(),
  },
});
