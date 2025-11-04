import { Component, Input, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KPI } from '../../../../../core/models/health-metrics.model';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent implements OnChanges {
  @Input() kpi!: KPI;
  
  percentage = signal<number>(0);
  statusColor = signal<string>('#666');
  Math = Math; // Expose Math to template

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['kpi'] && this.kpi) {
      this.percentage.set(this.kpi.percentage || 0);
      this.updateStatusColor();
    }
  }

  private updateStatusColor(): void {
    switch (this.kpi.status) {
      case 'critical':
        this.statusColor.set('var(--status-critical)');
        break;
      case 'warning':
        this.statusColor.set('var(--status-warning)');
        break;
      case 'normal':
        this.statusColor.set('var(--status-normal)');
        break;
      case 'good':
        this.statusColor.set('#4CAF50');
        break;
      default:
        this.statusColor.set('#666');
    }
  }

  getStatusIcon(): string {
    switch (this.kpi.status) {
      case 'critical':
        return '⚠️';
      case 'warning':
        return '⚡';
      case 'normal':
        return '✓';
      case 'good':
        return '✅';
      default:
        return '';
    }
  }

  get trendIcon(): string {
    if (this.kpi.trend.direction === 'up') return '📈';
    if (this.kpi.trend.direction === 'down') return '📉';
    return '➡️';
  }

  get trendText(): string {
    return `${this.kpi.trend.percentage}% ${this.kpi.trend.period}`;
  }
}

