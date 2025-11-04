import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { DashboardStateService } from '../../../../core/services/dashboard-state.service';
import { HealthMetricsService } from '../../../../core/services/health-metrics.service';
import { PatientService } from '../../../../core/services/patient.service';
import { Patient } from '../../../../core/models/patient.model';
import { KPI } from '../../../../core/models/health-metrics.model';
import { KpiCardComponent } from './kpi-card/kpi-card.component';
import { HealthChartsComponent } from './health-charts/health-charts.component';
import { QuickInsightsComponent } from './quick-insights/quick-insights.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, HealthChartsComponent, QuickInsightsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  kpis = signal<KPI[]>([]);
  loading = signal(true);
  selectedPatientId = signal<string | null>(null);

  constructor(
    private dashboardState: DashboardStateService,
    private healthMetricsService: HealthMetricsService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    // Default to first patient for demo
    this.loadDefaultDashboard();
  }

  loadDefaultDashboard(): void {
    this.patientService.getPatients().subscribe(patients => {
      if (patients.length > 0) {
        const firstPatient = patients[0];
        this.selectedPatientId.set(firstPatient.id);
        this.dashboardState.setSelectedPatient(firstPatient);
        this.loadPatientKPIs(firstPatient.id);
      }
    });
  }

  loadPatientKPIs(patientId: string): void {
    this.loading.set(true);
    this.healthMetricsService.getKPISummary(patientId).subscribe(kpis => {
      this.kpis.set(kpis);
      this.dashboardState.setKPIs(kpis);
      this.loading.set(false);
    });
  }

  onPatientSelected(patientId: string): void {
    this.selectedPatientId.set(patientId);
    this.loadPatientKPIs(patientId);
    this.patientService.getPatientById(patientId).subscribe(patient => {
      if (patient) {
        this.dashboardState.setSelectedPatient(patient);
      }
    });
  }
}



