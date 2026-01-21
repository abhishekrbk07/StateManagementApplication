import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-announcements-toolbar',
  standalone: true,
  imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './announcements-toolbar.component.html',
  styleUrls: ['./announcements-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementsToolbarComponent {
  @Input() search = '';
  @Output() searchChange = new EventEmitter<string>();

  clearSearch() {
    this.search = '';
    this.searchChange.emit('');
  }
}
