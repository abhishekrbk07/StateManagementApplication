import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { Announcement } from './announcements.models';

@Injectable({ providedIn: 'root' })
export class AnnouncementsService {
  private readonly http = inject(HttpClient);

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>('/assets/announcements.json').pipe(
      // tiny delay to make loader visible like a real API
      delay(350),
      map(list => (list ?? []).map(a => ({
        ...a,
        title: (a.title ?? '').trim(),
        message: (a.message ?? '').trim(),
        author: (a.author ?? 'Admin').trim(),
        postedAt: a.postedAt ?? new Date().toISOString(),
        priority: a.priority ?? 'Info',
        read: !!a.read,
      })))
    );
  }
}
