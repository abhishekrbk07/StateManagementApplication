import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Holiday, Claim, Policy } from './self-service.models';

@Injectable({ providedIn: 'root' })
export class SelfServiceService {
  private readonly http = inject(HttpClient);

  getHolidays() {
    return this.http.get<any>('/assets/api/holidays-2026.json').pipe(
      map((res) => (Array.isArray(res) ? res : res?.holidays ?? []))
    );
  }

  getClaims() {
    return this.http.get<any>('/assets/api/claims.json').pipe(
      map((res) => (Array.isArray(res) ? res : res?.claims ?? []))
    );
  }

  getPolicies() {
    return this.http.get<any>('/assets/api/policies.json').pipe(
      map((res) => (Array.isArray(res) ? res : res?.policies ?? []))
    );
  }
}
