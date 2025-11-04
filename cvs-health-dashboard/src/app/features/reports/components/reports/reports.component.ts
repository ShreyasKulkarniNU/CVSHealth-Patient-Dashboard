import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Report {
  id: string;
  title: string;
  generatedDate: Date;
  status: 'completed' | 'pending';
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reports: Report[] = [
    {
      id: '1',
      title: 'Annual Health Summary (2024)',
      generatedDate: new Date('2024-12-15'),
      status: 'completed'
    },
    {
      id: '2',
      title: 'Q3 Patient Outcomes',
      generatedDate: new Date('2024-10-28'),
      status: 'completed'
    },
    {
      id: '3',
      title: 'Cardiovascular Risk Analysis',
      generatedDate: new Date('2024-10-28'),
      status: 'completed'
    }
  ];

  generateNewReport(): void {
    console.log('Generate new report');
  }
}

