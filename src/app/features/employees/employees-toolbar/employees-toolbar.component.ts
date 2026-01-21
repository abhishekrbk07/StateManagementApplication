import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employees-toolbar',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './employees-toolbar.component.html',
  styleUrls: ['./employees-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesToolbarComponent {
  @Input() search = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();

  clearSearch() {
    this.search = '';
    this.searchChange.emit('');
  }
}
