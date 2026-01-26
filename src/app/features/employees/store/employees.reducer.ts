import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Employee, EmployeesQueryState } from './employees.models';
import { EmployeesActions } from './employees.actions';

export interface EmployeesState extends EntityState<Employee> {
  loaded: boolean;
  inFlight: boolean;
  error: string | null;

  requestsCount: number;

  query: EmployeesQueryState;

  creating: boolean;

  // per-card deleting spinner
  deleting: Record<string, boolean>;
}

const adapter = createEntityAdapter<Employee>({
  selectId: e => e.id,
});

const initialState: EmployeesState = adapter.getInitialState({
  loaded: false,
  inFlight: false,
  error: null,
  requestsCount: 0,
  query: { pageIndex: 0, pageSize: 500, search: '' },

  creating: false,
  deleting: {},
});

export const employeesFeature = createFeature({
  name: 'employees',
  reducer: createReducer(
    initialState,

    // Load
    on(EmployeesActions.loadRequested, state => ({ ...state, error: null })),
    on(EmployeesActions.loadStarted, state => ({ ...state, inFlight: true, error: null })),
    on(EmployeesActions.loadSucceeded, (state, { employees }) =>
      adapter.setAll(employees, {
        ...state,
        loaded: true,
        inFlight: false,
        error: null,
        requestsCount: state.requestsCount + 1,
      })
    ),
    on(EmployeesActions.loadFailed, (state, { error }) => ({ ...state, inFlight: false, error })),

    // Query
    on(EmployeesActions.pageChanged, (state, { pageIndex, pageSize }) => ({
      ...state,
      query: { ...state.query, pageIndex, pageSize },
    })),
    on(EmployeesActions.searchChanged, (state, { search }) => ({
      ...state,
      query: { ...state.query, search, pageIndex: 0 },
    })),

    // Create
    on(EmployeesActions.createRequested, state => ({
      ...state,
      creating: true,
      error: null,
    })),

    on(EmployeesActions.createSucceeded, (state, { employee }) =>
      adapter.addOne(employee, {
        ...state,
        creating: false,
        error: null,
        // optional: show new one immediately
        query: { ...state.query, pageIndex: 0 },
      })
    ),

    on(EmployeesActions.createFailed, (state, { error }) => ({
      ...state,
      creating: false,
      error,
    })),

    //  Delete
    on(EmployeesActions.deleteRequested, (state, { id }) => ({
      ...state,
      error: null,
      deleting: { ...state.deleting, [id]: true },
    })),

    on(EmployeesActions.deleteSucceeded, (state, { id }) =>
      adapter.removeOne(id, {
        ...state,
        error: null,
        deleting: { ...state.deleting, [id]: false },
      })
    ),

    on(EmployeesActions.deleteFailed, (state, { error }) => ({
      ...state,
      error,
      deleting: {},
    }))
  ),
});

export const {
  selectAll: selectAllEmployees,
  selectTotal: selectEmployeesTotal,
} = adapter.getSelectors(employeesFeature.selectEmployeesState);
