import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./features/dashboard/components/dashboard-layout/dashboard-layout.component')
      .then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'patients',
        loadComponent: () => import('./features/patients/components/patient-list/patient-list.component')
          .then(m => m.PatientListComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/components/reports/reports.component')
          .then(m => m.ReportsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/components/settings/settings.component')
          .then(m => m.SettingsComponent)
      }
    ]
  }
];
