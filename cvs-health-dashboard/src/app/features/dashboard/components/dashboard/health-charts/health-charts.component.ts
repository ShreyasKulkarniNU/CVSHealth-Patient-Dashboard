import { Component, Input, OnInit, AfterViewInit, OnDestroy, signal, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthMetricsService } from '../../../../../core/services/health-metrics.service';
import { HealthMetrics } from '../../../../../core/models/health-metrics.model';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-health-charts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './health-charts.component.html',
  styleUrl: './health-charts.component.scss'
})
export class HealthChartsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() patientId!: string;
  
  loading = signal(true);
  metrics = signal<HealthMetrics[]>([]);
  selectedTimeRange: 'month' | 'week' = 'month';
  
  bmdChartRef = viewChild<ElementRef<HTMLCanvasElement>>('bmdChart');
  hemoglobinChartRef = viewChild<ElementRef<HTMLCanvasElement>>('hemoglobinChart');
  
  private bmdChart: Chart | null = null;
  private hemoglobinChart: Chart | null = null;

  constructor(private healthMetricsService: HealthMetricsService) {}

  ngOnInit(): void {
    if (this.patientId) {
      this.loadMetrics();
    }
  }

  ngAfterViewInit(): void {
    // Try to create charts after view init
    if (!this.loading() && this.metrics().length > 0) {
      setTimeout(() => this.createCharts(), 100);
    }
  }

  ngOnDestroy(): void {
    if (this.bmdChart) {
      this.bmdChart.destroy();
      this.bmdChart = null;
    }
    if (this.hemoglobinChart) {
      this.hemoglobinChart.destroy();
      this.hemoglobinChart = null;
    }
  }

  loadMetrics(): void {
    this.loading.set(true);
    this.healthMetricsService.getPatientMetrics(this.patientId).subscribe(data => {
      this.metrics.set(data);
      this.loading.set(false);
      
      // Create charts after data loads and view is ready
      setTimeout(() => this.createCharts(), 200);
    });
  }

  createCharts(): void {
    const bmdCanvas = this.bmdChartRef()?.nativeElement;
    const hemoglobinCanvas = this.hemoglobinChartRef()?.nativeElement;

    if (bmdCanvas && this.metrics().length > 0 && !this.bmdChart) {
      this.createBMDChart(bmdCanvas);
    }

    if (hemoglobinCanvas && this.metrics().length > 0 && !this.hemoglobinChart) {
      this.createHemoglobinChart(hemoglobinCanvas);
    }
  }

  createBMDChart(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = this.metrics();
    const labels = data.map(m => {
      const date = new Date(m.boneMineralDensity.measurementDate);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const values = data.map(m => m.boneMineralDensity.tScore);

    if (this.bmdChart) {
      this.bmdChart.destroy();
    }

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'T-Score',
          data: values,
          borderColor: '#9C27B0',
          backgroundColor: 'rgba(156, 39, 176, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#9C27B0',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 11 },
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: { size: 10 }
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: { size: 10 },
              maxRotation: 45,
              minRotation: 45
            }
          }
        }
      }
    };

    this.bmdChart = new Chart(ctx, config);
  }

  createHemoglobinChart(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = this.metrics();
    const labels = data.map(m => {
      const date = new Date(m.hemoglobin.measurementDate);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const values = data.map(m => m.hemoglobin.value);

    if (this.hemoglobinChart) {
      this.hemoglobinChart.destroy();
    }

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Hemoglobin',
          data: values,
          backgroundColor: '#FF9800',
          borderColor: '#FF6F00',
          borderWidth: 2,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 11 },
            cornerRadius: 8
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: { size: 10 }
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: { size: 10 },
              maxRotation: 45,
              minRotation: 45
            }
          }
        }
      }
    };

    this.hemoglobinChart = new Chart(ctx, config);
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

