import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthMetricsService } from '../../../../../core/services/health-metrics.service';
import { HealthMetrics } from '../../../../../core/models/health-metrics.model';

@Component({
  selector: 'app-health-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health-charts.component.html',
  styleUrl: './health-charts.component.scss'
})
export class HealthChartsComponent implements OnInit {
  @Input() patientId!: string;
  
  loading = signal(true);
  metrics = signal<HealthMetrics[]>([]);

  constructor(private healthMetricsService: HealthMetricsService) {}

  ngOnInit(): void {
    if (this.patientId) {
      this.loadMetrics();
    }
  }

  loadMetrics(): void {
    this.loading.set(true);
    this.healthMetricsService.getPatientMetrics(this.patientId).subscribe(data => {
      this.metrics.set(data);
      this.loading.set(false);
    });
  }

  get boneMineralTrendData() {
    const data = this.metrics();
    if (!data || data.length === 0) return { labels: [], values: [] };
    
    return {
      labels: data.map(m => m.boneMineralDensity.measurementDate.toISOString().split('T')[0]),
      values: data.map(m => m.boneMineralDensity.tScore)
    };
  }

  get hemoglobinTrendData() {
    const data = this.metrics();
    if (!data || data.length === 0) return { labels: [], values: [] };
    
    return {
      labels: data.map(m => m.hemoglobin.measurementDate.toISOString().split('T')[0]),
      values: data.map(m => m.hemoglobin.value)
    };
  }
}

