export type AnnouncementId = string;

export type AnnouncementPriority = 'Info' | 'Important' | 'Critical';

export interface Announcement {
  id: AnnouncementId;
  title: string;
  message: string;
  author: string;
  postedAt: string; // ISO
  priority: AnnouncementPriority;
  read: boolean;
}
