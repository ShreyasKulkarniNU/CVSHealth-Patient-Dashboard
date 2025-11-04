import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  emailNotifications = signal(true);
  twoFactorAuth = signal(true);
  darkMode = signal(false);
  language = signal('English');
  reportingPeriod = signal('Monthly (last 30 days)');
  shareData = signal(true);
  gdprCompliance = signal(false);

  saveChanges(): void {
    console.log('Settings saved');
  }

  cancel(): void {
    console.log('Settings cancelled');
  }

  changePassword(): void {
    console.log('Change password');
  }
}

