import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

type DeptStat = { department: string; count: number };

@Component({
  selector: 'app-department-pie',
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule],
  templateUrl: './department-pie.component.html',
  styleUrls: ['./department-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentPieComponent {
  @Input() title = 'Department Split';
  @Input() stats: DeptStat[] = [];

  // Apple-ish muted palette (stable + nice)
  private readonly colors = [
    '#2F6FED', '#00A3FF', '#6E5BFF', '#00C2A8',
    '#FFB020', '#FF5C7C', '#7C8AA5', '#A855F7',
  ];

  get total(): number {
    return this.stats.reduce((s, x) => s + x.count, 0);
  }

  color(i: number) {
    return this.colors[i % this.colors.length];
  }

  // SVG donut slices
  slices() {
    const total = this.total || 1;
    const r = 62;
    const cx = 80;
    const cy = 80;

    let start = -Math.PI / 2;
    return this.stats.map((s, i) => {
      const angle = (s.count / total) * Math.PI * 2;
      const end = start + angle;

      const x1 = cx + r * Math.cos(start);
      const y1 = cy + r * Math.sin(start);
      const x2 = cx + r * Math.cos(end);
      const y2 = cy + r * Math.sin(end);

      const large = angle > Math.PI ? 1 : 0;

      const d = `M ${cx} ${cy}
                 L ${x1} ${y1}
                 A ${r} ${r} 0 ${large} 1 ${x2} ${y2}
                 Z`;

      start = end;

      return {
        department: s.department,
        count: s.count,
        pct: Math.round((s.count / total) * 100),
        path: d,
        color: this.color(i),
      };
    });
  }
}
