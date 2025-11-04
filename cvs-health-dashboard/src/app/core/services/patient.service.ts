import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, PatientFilters } from '../models/patient.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private mockDataService: MockDataService) {}

  getPatients(filters?: PatientFilters): Observable<Patient[]> {
    return this.mockDataService.getPatients(filters);
  }

  getPatientById(id: string): Observable<Patient | undefined> {
    return this.mockDataService.getPatientById(id);
  }

  searchPatients(query: string): Observable<Patient[]> {
    return this.mockDataService.getPatients({ searchQuery: query });
  }

  // Future implementation with real API
  // updatePatientInfo(id: string, data: Partial<Patient>): Observable<Patient> {
  //   return this.http.patch<Patient>(`${this.apiUrl}/patients/${id}`, data);
  // }

  // addPatient(patient: Patient): Observable<Patient> {
  //   return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
  // }
}

