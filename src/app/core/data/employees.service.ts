import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee, CreateEmployeeRequest } from '../../features/employees/store/employees.models';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  constructor(private http: HttpClient) {}

  fetchEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/assets/employees.json').pipe(delay(2000));
  }

  preloadEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/assets/employees.json').pipe(delay(500));
  }

  createEmployee(payload: CreateEmployeeRequest): Observable<Employee> {
    const created: Employee = { id: crypto.randomUUID(), ...payload };
    return of(created).pipe(delay(600));
  }

  // ✅ delete API (simulated 200)
  deleteEmployee(id: string): Observable<void> {
    return of(void 0).pipe(delay(400));
  }

  humanizeError(_: unknown): string {
    return 'Request failed. Please try again.';
  }
}
