import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { DashboardStateService } from '../../../../core/services/dashboard-state.service';
import { Patient } from '../../../../core/models/patient.model';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit {
  selectedPatient = signal<Patient | null>(null);
  
  menuItems = [
    { path: '/dashboard', icon: 'home', label: 'Dashboard' },
    { path: '/patients', icon: 'people', label: 'Patients' },
    { path: '/reports', icon: 'assessment', label: 'Reports' },
    { path: '/settings', icon: 'settings', label: 'Settings' }
  ];

  constructor(
    private dashboardState: DashboardStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardState.selectedPatient$.subscribe(patient => {
      this.selectedPatient.set(patient);
    });
  }

  logout(): void {
    this.dashboardState.clearState();
    this.router.navigate(['/login']);
  }

  getNavIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      'home': '📊',
      'people': '👥',
      'assessment': '📈',
      'settings': '⚙️'
    };
    return icons[iconName] || '📄';
  }
}



