import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stat-badge',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './stat-badge.component.html',
  styleUrls: ['./stat-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatBadgeComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
}
