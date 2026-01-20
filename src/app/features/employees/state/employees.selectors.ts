import { createSelector } from '@ngrx/store';
import { employeesFeature, selectAllEmployees, selectEmployeesTotal } from './employees.reducer';

export class EmployeesSelectors {
  static selectLoaded = employeesFeature.selectLoaded;
  static selectInFlight = employeesFeature.selectInFlight;
  static selectCreating = employeesFeature.selectCreating;
  static selectError = employeesFeature.selectError;
  static selectRequestsCount = employeesFeature.selectRequestsCount;

  // ✅ delete map
  static selectDeletingMap = employeesFeature.selectDeleting;

  static selectQuery = employeesFeature.selectQuery;
  static selectTotal = selectEmployeesTotal;

  static selectFiltered = createSelector(selectAllEmployees, this.selectQuery, (all, q) => {
    const s = q.search.trim().toLowerCase();
    if (!s) return all;

    return all.filter(e => {
      const hay = `${e.name} ${e.email} ${e.department} ${e.role} ${e.location} ${e.level}`.toLowerCase();
      return hay.includes(s);
    });
  });

  static selectFilteredTotal = createSelector(this.selectFiltered, list => list.length);

  static selectPaged = createSelector(this.selectFiltered, this.selectQuery, (list, q) => {
    const start = q.pageIndex * q.pageSize;
    return list.slice(start, start + q.pageSize);
  });

  static selectIsDeleting = (id: string) =>
    createSelector(this.selectDeletingMap, map => !!map[id]);

  static selectDepartmentStats = createSelector(
    this.selectFiltered,
    employees => {
      const map = new Map<string, number>();

      employees.forEach(e => {
        map.set(e.department, (map.get(e.department) ?? 0) + 1);
      });

      return Array.from(map.entries()).map(([department, count]) => ({
        department,
        count,
      }));
    }
  );

}

