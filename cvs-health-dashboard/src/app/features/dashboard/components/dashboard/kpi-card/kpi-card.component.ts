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

  getTrendIcon(): string {
    if (this.kpi.trend.direction === 'up') return '↑';
    if (this.kpi.trend.direction === 'down') return '↓';
    return '→';
  }

  getIconSymbol(): string {
    const iconMap: { [key: string]: string } = {
      'Bone Mineral Density': '🦴',
      'Hemoglobin': '🩸',
      'Blood Glucose': '💉',
      'Vitamin D': '☀️',
      'Calcium': '💊'
    };
    return iconMap[this.kpi.name] || '📊';
  }

  getIconBackground(): string {
    const colorMap: { [key: string]: string } = {
      'Bone Mineral Density': 'linear-gradient(135deg, #F44336 0%, #FF6B6B 100%)',
      'Hemoglobin': 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
      'Blood Glucose': 'linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)',
      'Vitamin D': 'linear-gradient(135deg, #00A0DD 0%, #4FC3F7 100%)',
      'Calcium': 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)'
    };
    return colorMap[this.kpi.name] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }
}

