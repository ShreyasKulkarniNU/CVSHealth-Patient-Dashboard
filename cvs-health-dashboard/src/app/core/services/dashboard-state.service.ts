import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { HealthMetrics, KPI, Alert } from '../models/health-metrics.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
  private selectedPatientSubject = new BehaviorSubject<Patient | null>(null);
  private metricsSubject = new BehaviorSubject<HealthMetrics | null>(null);
  private kpisSubject = new BehaviorSubject<KPI[]>([]);
  private alertsSubject = new BehaviorSubject<Alert[]>([]);

  // Observables
  selectedPatient$ = this.selectedPatientSubject.asObservable();
  metrics$ = this.metricsSubject.asObservable();
  kpis$ = this.kpisSubject.asObservable();
  alerts$ = this.alertsSubject.asObservable();

  // Getters
  get selectedPatient(): Patient | null {
    return this.selectedPatientSubject.value;
  }

  get metrics(): HealthMetrics | null {
    return this.metricsSubject.value;
  }

  get kpis(): KPI[] {
    return this.kpisSubject.value;
  }

  get alerts(): Alert[] {
    return this.alertsSubject.value;
  }

  // Setters
  setSelectedPatient(patient: Patient | null): void {
    this.selectedPatientSubject.next(patient);
  }

  setMetrics(metrics: HealthMetrics | null): void {
    this.metricsSubject.next(metrics);
  }

  setKPIs(kpis: KPI[]): void {
    this.kpisSubject.next(kpis);
  }

  setAlerts(alerts: Alert[]): void {
    this.alertsSubject.next(alerts);
  }

  addAlert(alert: Alert): void {
    const currentAlerts = this.alertsSubject.value;
    this.alertsSubject.next([...currentAlerts, alert]);
  }

  acknowledgeAlert(alertId: string): void {
    const currentAlerts = this.alertsSubject.value.map(alert => 
      alert.id === alertId 
        ? { ...alert, acknowledged: true, acknowledgedAt: new Date() }
        : alert
    );
    this.alertsSubject.next(currentAlerts);
  }

  clearState(): void {
    this.selectedPatientSubject.next(null);
    this.metricsSubject.next(null);
    this.kpisSubject.next([]);
    this.alertsSubject.next([]);
  }
}

