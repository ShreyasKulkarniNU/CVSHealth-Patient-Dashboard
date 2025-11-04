# CVS Health Patient Monitoring Dashboard

A comprehensive Angular 18 application for monitoring patient health metrics with real-time KPIs, interactive charts, and patient management capabilities.

## 🎯 Features

### Dashboard
- **Real-time KPI Monitoring**: Track Bone Mineral Density, Hemoglobin, Blood Glucose, Vitamin D, and Calcium levels
- **Interactive Gauge Charts**: Visual representation of health metrics with color-coded status indicators
- **Trend Analysis**: Historical data visualization over 6-month periods
- **Quick Insights Panel**: Actionable healthcare recommendations

### Patient Management
- **Patient Database**: Complete patient information management
- **Search & Filter**: Find patients by name, ID, doctor, or status
- **Status Tracking**: Monitor active, inactive, and pending patients
- **Primary Physician Assignment**: Track doctor-patient relationships

### Reports & Analytics
- **Generated Reports**: View and manage healthcare reports
- **Annual Health Summaries**: Comprehensive patient health overviews
- **Q3/Q4 Outcomes**: Quarterly patient outcome reports

### Settings
- **Application Configuration**: Customize dashboard settings
- **Email Notifications**: Configure alert preferences
- **Two-Factor Authentication**: Enhanced security options
- **Data Privacy Controls**: GDPR compliance settings
- **Theme Selection**: Light/Dark mode support

## 🛠️ Tech Stack

- **Angular 18+**: Latest Angular framework with standalone components
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming for data streams
- **SCSS**: Advanced styling with CSS variables
- **Chart.js**: Interactive data visualization (ready for integration)
- **Angular Material**: Material Design components
- **date-fns**: Modern date utilities

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Angular CLI 18+

### Setup

```bash
# Navigate to the project directory
cd cvs-health-dashboard

# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:4200
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/           # TypeScript interfaces and models
│   │   │   ├── patient.model.ts
│   │   │   └── health-metrics.model.ts
│   │   └── services/         # Business logic and data services
│   │       ├── mock-data.service.ts
│   │       ├── patient.service.ts
│   │       ├── health-metrics.service.ts
│   │       └── dashboard-state.service.ts
│   ├── features/
│   │   ├── dashboard/        # Main dashboard components
│   │   │   └── components/
│   │   │       ├── dashboard-layout/
│   │   │       └── dashboard/
│   │   ├── patients/         # Patient management
│   │   │   └── components/
│   │   │       └── patient-list/
│   │   ├── reports/          # Reports module
│   │   │   └── components/
│   │   │       └── reports/
│   │   └── settings/         # Settings module
│   │       └── components/
│   │           └── settings/
│   ├── app.routes.ts         # Application routing
│   ├── app.config.ts         # App configuration
│   └── app.component.ts      # Root component
├── styles.scss               # Global styles
└── index.html                # Entry HTML
```

## 🎨 Design System

### Colors
- **Primary Red**: #CC0000 (CVS Health Brand)
- **Primary Blue**: #00A0DD (Action Elements)
- **Success Green**: #4CAF50
- **Warning Yellow**: #FFC107
- **Critical Red**: #F44336

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Blue primary buttons with hover effects
- **Charts**: Custom SVG gauges with animated progress arcs
- **Tables**: Clean, responsive data tables

## 🔌 Mock Data

The application includes a comprehensive `MockDataService` that generates realistic healthcare data:
- 30 diverse patient profiles
- 12 months of historical health metrics per patient
- Realistic trends and variations
- Multiple health parameters (BMD, Hemoglobin, Glucose, etc.)

## 🚀 Development

### Available Commands

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Watch mode
npm run watch
```

### Key Services

#### MockDataService
Generates realistic patient and health metrics data for development and testing.

#### PatientService
Manages patient data operations including search, filtering, and retrieval.

#### HealthMetricsService
Handles health metrics data including KPIs, historical trends, and alerts.

#### DashboardStateService
Centralized state management using RxJS BehaviorSubjects for reactive updates.

## 🔮 Future Enhancements

- [ ] Real API integration
- [ ] WebSocket support for real-time updates
- [ ] Chart.js implementation for advanced visualizations
- [ ] Export to PDF/CSV functionality
- [ ] Advanced filtering and sorting
- [ ] User authentication and authorization
- [ ] Audit logging
- [ ] PWA support for offline access
- [ ] Internationalization (i18n)
- [ ] Unit and E2E tests

## 📊 Health Parameters

### Bone Mineral Density (BMD)
- T-Score and Z-Score tracking
- Interpretation levels (Normal, Osteopenia, Osteoporosis)
- Measurement site tracking (Lumbar Spine, Femoral Neck, Total Hip)

### Hemoglobin
- Current levels with reference ranges
- Gender-specific tracking
- Anemia risk indicators
- Historical trend analysis

### Additional Metrics
- Blood Pressure (Systolic/Diastolic)
- Heart Rate
- Body Temperature
- Oxygen Saturation
- Respiratory Rate
- Blood Glucose
- Vitamin D
- Calcium

## 🏥 Use Cases

1. **Healthcare Providers**: Monitor patient health trends and make data-driven decisions
2. **Care Coordinators**: Track multiple patients and identify concerning patterns
3. **Administrators**: Generate reports and manage patient databases
4. **Patients**: View their own health metrics and recommendations

## 🤝 Contributing

This is a CVS Health internal application. For questions or issues, contact the development team.

## 📄 License

Proprietary - CVS Health Internal Use Only

## 📞 Support

For technical support or questions, please reach out to the development team.

---

**Built with ❤️ for CVS Health**
