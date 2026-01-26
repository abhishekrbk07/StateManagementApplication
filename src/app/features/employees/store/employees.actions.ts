import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Employee, CreateEmployeeRequest } from './employees.models';

export const EmployeesActions = createActionGroup({
  source: 'Employees',
  events: {
    // Load
    'Load Requested': emptyProps(),
    'Load Started': emptyProps(),
    'Load Succeeded': props<{ employees: Employee[] }>(),
    'Load Failed': props<{ error: string }>(),

    // Add this under Load actions
    'Preload Requested': emptyProps(),

    // Query
    'Page Changed': props<{ pageIndex: number; pageSize: number }>(),
    'Search Changed': props<{ search: string }>(),

    // Create
    'Create Requested': props<{ employee: CreateEmployeeRequest }>(),
    'Create Succeeded': props<{ employee: Employee }>(),
    'Create Failed': props<{ error: string }>(),

    //  Delete
    'Delete Requested': props<{ id: string }>(),
    'Delete Succeeded': props<{ id: string }>(),
    'Delete Failed': props<{ error: string }>(),
  },
});
