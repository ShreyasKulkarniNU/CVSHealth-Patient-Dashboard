import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient, PatientFilters } from '../../../../core/models/patient.model';
import { PatientService } from '../../../../core/services/patient.service';
import { DashboardStateService } from '../../../../core/services/dashboard-state.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss'
})
export class PatientListComponent implements OnInit {
  patients = signal<Patient[]>([]);
  filteredPatients = signal<Patient[]>([]);
  loading = signal(false);
  searchQuery = signal('');
  activeFilter = signal<string>('all');
  
  doctors = signal<string[]>([]);
  selectedDoctor = signal<string>('');

  constructor(
    private patientService: PatientService,
    private router: Router,
    private dashboardState: DashboardStateService
  ) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading.set(true);
    this.patientService.getPatients().subscribe(data => {
      this.patients.set(data);
      this.filteredPatients.set(data);
      
      // Extract unique doctors
      const doctorSet = new Set(data.map(p => p.primaryPhysician));
      this.doctors.set(Array.from(doctorSet));
      
      this.loading.set(false);
    });
  }

  onSearch(): void {
    const query = this.searchQuery().trim();
    if (!query) {
      this.loadPatients();
      return;
    }

    this.loading.set(true);
    this.patientService.searchPatients(query).subscribe(data => {
      this.filteredPatients.set(data);
      this.loading.set(false);
    });
  }

  onFilterChange(filter: string): void {
    this.activeFilter.set(filter);
    this.updateFilteredPatients();
  }

  onDoctorFilterChange(doctor: string): void {
    this.selectedDoctor.set(doctor);
    this.updateFilteredPatients();
  }

  updateFilteredPatients(): void {
    let filtered = [...this.patients()];

    if (this.activeFilter() !== 'all') {
      filtered = filtered.filter(p => p.status === this.activeFilter());
    }

    if (this.selectedDoctor()) {
      filtered = filtered.filter(p => p.primaryPhysician === this.selectedDoctor());
    }

    this.filteredPatients.set(filtered);
  }

  selectPatient(patient: Patient): void {
    this.dashboardState.setSelectedPatient(patient);
    this.router.navigate(['/dashboard']);
  }

  addNewPatient(): void {
    // TODO: Implement add patient modal or navigation
    console.log('Add new patient');
  }
}



