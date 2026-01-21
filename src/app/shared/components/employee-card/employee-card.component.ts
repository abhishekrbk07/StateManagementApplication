import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Employee } from '../../../features/employees/store/employees.models';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIcon,
  ],
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCardComponent {
  @Input({ required: true }) employee!: Employee;

  // per-card spinner flag
  @Input() deleting = false;

  @Output() delete = new EventEmitter<string>();

  initials(name: string): string {
    const parts = (name || '').trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p.charAt(0).toUpperCase()).join('');
  }
}
