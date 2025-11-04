import { Injectable } from '@angular/core';
import { Patient, PatientFilters } from '../models/patient.model';
import { HealthMetrics, BMDResults, HemoglobinData, BloodGlucoseData, KPI } from '../models/health-metrics.model';
import { Observable, of, delay } from 'rxjs';
import { subMonths, subDays, format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockPatients: Patient[] = this.generateMockPatients();
  private mockMetrics: Map<string, HealthMetrics[]> = new Map();

  constructor() {
    // Initialize mock data for each patient
    this.mockPatients.forEach(patient => {
      this.mockMetrics.set(patient.id, this.generateMockMetrics(patient.id));
    });
  }

  // Generate 30 mock patients
  private generateMockPatients(): Patient[] {
    const firstNames = ['John', 'Jane', 'Robert', 'Emily', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Mary', 'William', 'Patricia', 'Richard', 'Jennifer', 'Joseph', 'Linda', 'Thomas', 'Barbara', 'Christopher', 'Elizabeth'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson'];
    const doctors = ['Dr. Sarah Lee', 'Dr. Mark Chen', 'Dr. Alex Wong', 'Dr. Emily Davis', 'Dr. Michael Brown'];
    
    return Array.from({ length: 30 }, (_, i) => {
      const firstName = firstNames[i % firstNames.length];
      const lastName = lastNames[i % lastNames.length];
      const id = `PAT${String(i + 1).padStart(5, '0')}`;
      
      return {
        id,
        firstName,
        lastName,
        dateOfBirth: new Date(1950 + (i % 40), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        gender: ['male', 'female', 'other'][Math.floor(Math.random() * 3)] as 'male' | 'female' | 'other',
        mrn: `MRN-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
        contactInfo: {
          phone: `(${String(Math.floor(Math.random() * 900) + 100)}) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          address: {
            street: `${Math.floor(Math.random() * 9999) + 1} Main St`,
            city: 'Springfield',
            state: 'IL',
            zipCode: `${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`
          }
        },
        insurance: {
          provider: ['BlueCross', 'Aetna', 'UnitedHealth', 'Medicare'][Math.floor(Math.random() * 4)],
          policyNumber: `POL-${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
          groupNumber: `GRP-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
        },
        primaryPhysician: doctors[Math.floor(Math.random() * doctors.length)],
        medicalHistory: this.generateMedicalHistory(),
        currentMedications: this.generateMedications(),
        status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as 'active' | 'inactive' | 'pending',
        lastVisit: subDays(new Date(), Math.floor(Math.random() * 90)),
        nextAppointment: this.generateNextAppointment()
      };
    });
  }

  private generateMedicalHistory() {
    const conditions = ['Hypertension', 'Type 2 Diabetes', 'Arthritis', 'Osteoporosis', 'Hyperlipidemia'];
    return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      diagnosisDate: subDays(new Date(), Math.floor(Math.random() * 365 * 5)),
      status: ['active', 'resolved', 'chronic'][Math.floor(Math.random() * 3)] as 'active' | 'resolved' | 'chronic'
    }));
  }

  private generateMedications() {
    const medications = [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Calcium', dosage: '1000mg', frequency: 'Once daily' },
      { name: 'Vitamin D', dosage: '2000 IU', frequency: 'Once daily' },
      { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily' }
    ];
    return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
      ...medications[Math.floor(Math.random() * medications.length)],
      startDate: subDays(new Date(), Math.floor(Math.random() * 365)),
      prescriber: 'Dr. Primary Physician'
    }));
  }

  private generateNextAppointment(): Date {
    const days = Math.floor(Math.random() * 60) + 1;
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }

  private generateMockMetrics(patientId: string): HealthMetrics[] {
    const baseDate = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const month = subMonths(baseDate, 11 - i);
      return {
        patientId,
        timestamp: month,
        vitals: {
          bloodPressure: {
            systolic: 110 + Math.floor(Math.random() * 30),
            diastolic: 70 + Math.floor(Math.random() * 20),
            unit: 'mmHg'
          },
          heartRate: {
            value: 60 + Math.floor(Math.random() * 30),
            unit: 'bpm'
          },
          temperature: {
            value: 97.5 + Math.random() * 2.5,
            unit: '°F'
          },
          oxygenSaturation: {
            value: 95 + Math.floor(Math.random() * 5),
            unit: '%'
          },
          respiratoryRate: {
            value: 14 + Math.floor(Math.random() * 6),
            unit: 'breaths/min'
          }
        },
        labResults: {
          vitaminD: 20 + Math.random() * 30,
          calcium: 8.5 + Math.random() * 2
        },
        boneMineralDensity: this.generateBMDResults(month),
        hemoglobin: this.generateHemoglobinData(month),
        bloodGlucose: this.generateBloodGlucoseData(month)
      };
    });
  }

  private generateBMDResults(date: Date): BMDResults {
    const tScore = -2.5 + Math.random() * 2.5;
    let interpretation: 'normal' | 'osteopenia' | 'osteoporosis';
    let status: 'critical' | 'warning' | 'normal' | 'good';
    let percentage: number;

    if (tScore < -2.5) {
      interpretation = 'osteoporosis';
      status = 'critical';
      percentage = 20 + Math.random() * 20;
    } else if (tScore < -1) {
      interpretation = 'osteopenia';
      status = 'warning';
      percentage = 40 + Math.random() * 25;
    } else {
      interpretation = 'normal';
      status = tScore > 0 ? 'good' : 'normal';
      percentage = tScore > 0 ? 90 + Math.random() * 10 : 75 + Math.random() * 15;
    }

    return {
      measurementDate: date,
      tScore,
      zScore: -1.5 + Math.random() * 1.5,
      boneDensityGcm2: 0.8 + Math.random() * 0.5,
      site: ['lumbar_spine', 'femoral_neck', 'total_hip'][Math.floor(Math.random() * 3)] as any,
      interpretation,
      previousMeasurements: [],
      status,
      percentage
    };
  }

  private generateHemoglobinData(date: Date): HemoglobinData {
    const gender = this.mockPatients[Math.floor(Math.random() * this.mockPatients.length)]?.gender || 'male';
    const baseValue = gender === 'male' ? 12 : 11;
    const value = baseValue + Math.random() * 4;
    
    let status: 'low' | 'normal' | 'high';
    let kpiStatus: 'critical' | 'warning' | 'normal' | 'good';
    let percentage: number;

    if (value < baseValue) {
      status = 'low';
      kpiStatus = 'critical';
      percentage = 30 + Math.random() * 30;
    } else if (value > baseValue + 3) {
      status = 'high';
      kpiStatus = 'warning';
      percentage = 70 + Math.random() * 25;
    } else {
      status = 'normal';
      kpiStatus = 'normal';
      percentage = 85 + Math.random() * 15;
    }

    return {
      value,
      unit: 'g/dL',
      measurementDate: date,
      status,
      referenceRange: { min: baseValue, max: baseValue + 3 },
      trend: ['increasing', 'stable', 'decreasing'][Math.floor(Math.random() * 3)] as any,
      history: [],
      kpiStatus,
      percentage
    };
  }

  private generateBloodGlucoseData(date: Date): BloodGlucoseData {
    const value = 70 + Math.random() * 80;
    
    let status: 'low' | 'normal' | 'high';
    let kpiStatus: 'critical' | 'warning' | 'normal' | 'good';
    let percentage: number;

    if (value < 70) {
      status = 'low';
      kpiStatus = 'critical';
      percentage = 20 + Math.random() * 30;
    } else if (value > 140) {
      status = 'high';
      kpiStatus = 'warning';
      percentage = 50 + Math.random() * 30;
    } else {
      status = 'normal';
      kpiStatus = 'good';
      percentage = 85 + Math.random() * 15;
    }

    return {
      value,
      unit: 'mg/dL',
      measurementDate: date,
      status,
      referenceRange: { min: 70, max: 140 },
      trend: ['increasing', 'stable', 'decreasing'][Math.floor(Math.random() * 3)] as any,
      history: [],
      kpiStatus,
      percentage
    };
  }

  // Public methods
  getPatients(filters?: PatientFilters): Observable<Patient[]> {
    let patients = [...this.mockPatients];
    
    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      patients = patients.filter(p => 
        p.firstName.toLowerCase().includes(query) ||
        p.lastName.toLowerCase().includes(query) ||
        p.mrn.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query) ||
        p.primaryPhysician.toLowerCase().includes(query)
      );
    }

    if (filters?.status) {
      patients = patients.filter(p => p.status === filters.status);
    }

    if (filters?.doctor) {
      patients = patients.filter(p => p.primaryPhysician === filters.doctor);
    }

    return of(patients).pipe(delay(500));
  }

  getPatientById(id: string): Observable<Patient | undefined> {
    return of(this.mockPatients.find(p => p.id === id)).pipe(delay(300));
  }

  getHealthMetrics(patientId: string): Observable<HealthMetrics[]> {
    return of(this.mockMetrics.get(patientId) || []).pipe(delay(500));
  }

  getLatestHealthMetrics(patientId: string): Observable<HealthMetrics | undefined> {
    const metrics = this.mockMetrics.get(patientId) || [];
    return of(metrics[metrics.length - 1]).pipe(delay(300));
  }

  getKPIs(patientId: string): Observable<KPI[]> {
    const metrics = this.mockMetrics.get(patientId);
    if (!metrics || metrics.length === 0) {
      return of([]).pipe(delay(300));
    }

    const latest = metrics[metrics.length - 1];
    const boneDensity = latest.boneMineralDensity;
    const hemoglobin = latest.hemoglobin;
    const glucose = latest.bloodGlucose;
    const vitaminD = latest.labResults.vitaminD;
    const calcium = latest.labResults.calcium;

    const kpis: KPI[] = [
      {
        id: 'bmd',
        name: 'Bone Mineral Density',
        value: boneDensity.tScore,
        unit: 'T-Score',
        status: boneDensity.status,
        threshold: { critical: -2.5, warning: -1, normal: 0, good: 1 },
        trend: { direction: 'stable', percentage: 2.5, period: '6M' },
        lastUpdated: boneDensity.measurementDate,
        percentage: boneDensity.percentage
      },
      {
        id: 'hemoglobin',
        name: 'Hemoglobin',
        value: hemoglobin.value,
        unit: hemoglobin.unit,
        status: hemoglobin.kpiStatus,
        threshold: { critical: hemoglobin.referenceRange.min, warning: hemoglobin.referenceRange.min + 1, normal: hemoglobin.referenceRange.max - 1, good: hemoglobin.referenceRange.max },
        trend: { direction: hemoglobin.trend === 'increasing' ? 'up' : hemoglobin.trend === 'decreasing' ? 'down' : 'stable', percentage: 3.2, period: '6M' },
        lastUpdated: hemoglobin.measurementDate,
        percentage: hemoglobin.percentage
      },
      {
        id: 'glucose',
        name: 'Blood Glucose',
        value: glucose.value,
        unit: glucose.unit,
        status: glucose.kpiStatus,
        threshold: { critical: 70, warning: 100, normal: 120, good: 140 },
        trend: { direction: glucose.trend === 'increasing' ? 'up' : glucose.trend === 'decreasing' ? 'down' : 'stable', percentage: 1.8, period: '6M' },
        lastUpdated: glucose.measurementDate,
        percentage: glucose.percentage
      },
      {
        id: 'vitamin-d',
        name: 'Vitamin D',
        value: vitaminD,
        unit: 'ng/mL',
        status: vitaminD < 20 ? 'warning' : vitaminD > 40 ? 'good' : 'normal',
        threshold: { critical: 10, warning: 20, normal: 30, good: 40 },
        trend: { direction: 'stable', percentage: 5.0, period: '6M' },
        lastUpdated: latest.timestamp,
        percentage: Math.min(100, (vitaminD / 50) * 100)
      },
      {
        id: 'calcium',
        name: 'Calcium',
        value: calcium,
        unit: 'mg/dL',
        status: calcium < 8.5 ? 'warning' : calcium > 10.5 ? 'warning' : 'normal',
        threshold: { critical: 8.0, warning: 8.5, normal: 10.0, good: 10.5 },
        trend: { direction: 'stable', percentage: 2.1, period: '6M' },
        lastUpdated: latest.timestamp,
        percentage: Math.min(100, ((calcium - 8) / 4) * 100)
      }
    ];

    return of(kpis).pipe(delay(300));
  }
}

