import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-insights.component.html',
  styleUrl: './quick-insights.component.scss'
})
export class QuickInsightsComponent {
  insights = [
    'Maintain calcium intake',
    'Monitor Vitamin D',
    'Scheduled check-up: Nov 15'
  ];

  getInsightIcon(index: number): string {
    const icons = ['💊', '📊', '📅'];
    return icons[index] || '💡';
  }
}



