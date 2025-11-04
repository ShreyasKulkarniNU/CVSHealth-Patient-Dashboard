import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthMetrics, KPI } from '../models/health-metrics.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class HealthMetricsService {
  constructor(private mockDataService: MockDataService) {}

  getPatientMetrics(patientId: string): Observable<HealthMetrics[]> {
    return this.mockDataService.getHealthMetrics(patientId);
  }

  getLatestHealthMetrics(patientId: string): Observable<HealthMetrics | undefined> {
    return this.mockDataService.getLatestHealthMetrics(patientId);
  }

  getKPISummary(patientId: string): Observable<KPI[]> {
    return this.mockDataService.getKPIs(patientId);
  }

  // Future implementation with real API
  // getBoneMineralDensity(patientId: string): Observable<BMDResults> {
  //   return this.http.get<BMDResults>(`${this.apiUrl}/patients/${patientId}/metrics/bone-density`);
  // }

  // getHemoglobinHistory(patientId: string, months: number): Observable<HemoglobinData[]> {
  //   return this.http.get<HemoglobinData[]>(`${this.apiUrl}/patients/${patientId}/metrics/hemoglobin`, {
  //     params: { months: months.toString() }
  //   });
  // }

  // getAlertsForPatient(patientId: string): Observable<Alert[]> {
  //   return this.http.get<Alert[]>(`${this.apiUrl}/patients/${patientId}/alerts`);
  // }
}

