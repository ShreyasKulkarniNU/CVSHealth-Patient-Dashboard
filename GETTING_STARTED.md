# Getting Started with CVS Health Patient Monitoring Dashboard

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher
- **Angular CLI**: Will be installed automatically

### Installation Steps

#### 1. Navigate to Project Directory
```bash
cd cvs-health-dashboard
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start Development Server
```bash
npm start
```

#### 4. Open in Browser
The application will automatically open at:
```
http://localhost:4200
```

## 🎯 First Time Setup

### What to Expect

On first launch, you'll see:

1. **Dashboard**: Real-time health metrics for the first patient
2. **KPI Cards**: 5 key health indicators with gauge charts
3. **Charts**: Bone mineral and hemoglobin trend visualizations
4. **Navigation**: Sidebar with 4 main sections
   - Dashboard
   - Patients
   - Reports
   - Settings

### Default Data

The application comes with realistic mock data:
- **30 Patients**: Diverse demographics and medical conditions
- **12 Months**: Historical health metrics per patient
- **Realistic Values**: Normal, warning, and critical ranges
- **Trends**: Increasing, stable, and decreasing patterns

## 📱 Navigation Guide

### Dashboard View
```
Main Features:
- Health Metrics Overview (BMD, Hemoglobin, Glucose, etc.)
- Interactive Gauge Charts
- Trend Analysis
- Quick Insights Panel
```

### Patient Database
```
Features:
- Search by name, ID, or condition
- Filter by doctor or status
- Click patient to view details
- Add new patients
```

### Reports
```
Available:
- Annual Health Summary
- Quarterly Outcomes
- Risk Analysis Reports
```

### Settings
```
Configuration:
- Email Notifications
- Two-Factor Authentication
- Privacy Controls
- Theme Selection
```

## 🔍 Key Features Overview

### Interactive KPI Cards
- Hover over any gauge to see details
- Color-coded status (Green/Yellow/Red)
- Real-time percentage values
- Trend indicators

### Patient Search
1. Click "Patients" in sidebar
2. Use search bar or filters
3. Click a patient to view details
4. Health metrics load automatically

### Chart Interaction
- View historical trends
- Hover for precise values
- Toggle between parameters
- Export data (coming soon)

## 🛠️ Development Commands

### Build for Production
```bash
npm run build
```
Output: `dist/cvs-health-dashboard/`

### Run Tests
```bash
npm test
```

### Watch Mode (Rebuild on changes)
```bash
npm run watch
```

### Lint Code
```bash
npm run lint
```

## 📂 Project Structure Overview

```
cvs-health-dashboard/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/        # Data models
│   │   │   └── services/      # Business logic
│   │   ├── features/
│   │   │   ├── dashboard/     # Main dashboard
│   │   │   ├── patients/      # Patient management
│   │   │   ├── reports/       # Reports module
│   │   │   └── settings/      # App settings
│   │   └── app.*.ts          # Root files
│   ├── styles.scss           # Global styles
│   └── index.html            # Entry point
├── package.json              # Dependencies
└── README.md                 # Full documentation
```

## 🎨 Customization

### Changing Colors
Edit `src/styles.scss`:
```scss
:root {
  --cvs-red: #CC0000;
  --cvs-blue: #00A0DD;
  --status-normal: #4CAF50;
  --status-warning: #FFC107;
  --status-critical: #F44336;
}
```

### Adding New KPIs
1. Update `health-metrics.model.ts`
2. Add to `MockDataService`
3. Create new KPI card (optional)
4. Update dashboard template

### Modifying Mock Data
Edit `src/app/core/services/mock-data.service.ts`

## 🐛 Troubleshooting

### Issue: Port 4200 already in use
**Solution**: 
```bash
ng serve --port 4300
```

### Issue: Module not found errors
**Solution**:
```bash
npm install
```

### Issue: Build errors
**Solution**:
```bash
npm run clean
npm install
npm run build
```

### Issue: Styles not loading
**Solution**: Ensure `styles.scss` imports are correct

## 📊 Data Flow

```
User Action → Component → Service → State Management
     ↓                                    ↓
Mock Data ← Data Generation ← Observable Stream
```

## 🔗 Key Services

### MockDataService
Generates realistic patient and health data

### PatientService
Handles patient CRUD operations

### HealthMetricsService
Manages health metrics and KPIs

### DashboardStateService
Centralized application state

## 📝 Development Tips

### Hot Reload
Changes to TypeScript/HTML update automatically

### Browser DevTools
Press `F12` to inspect elements and network

### Angular Inspector
Use Angular DevTools extension for debugging

### Component Isolation
Each component is standalone - easy to test

## 🚀 Next Steps

1. **Explore the Dashboard**: Click through all sections
2. **Search Patients**: Try the search functionality
3. **View Charts**: Check trend visualizations
4. **Modify Data**: Edit `mock-data.service.ts`
5. **Customize UI**: Adjust styles and colors
6. **Add Features**: Extend components as needed

## 💡 Quick Wins

### Add a New Patient
Edit `generateMockPatients()` in `mock-data.service.ts`

### Change Dashboard Layout
Modify `dashboard.component.html`

### Update KPI Thresholds
Edit `Threshold` interface in `health-metrics.model.ts`

### Add New Status Color
Update CSS variables in `styles.scss`

## 🎓 Learning Resources

### Angular Documentation
- [Angular 18 Docs](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### RxJS
- [RxJS Guide](https://rxjs.dev/guide/overview)

### Healthcare Standards
- HIPAA Compliance Guidelines
- HL7 Data Standards

## 📞 Support

For questions or issues:
1. Check the README.md
2. Review PROJECT_SUMMARY.md
3. Inspect error messages
4. Check browser console (F12)

## ✨ Tips & Tricks

### Fast Navigation
Use keyboard shortcuts in browser:
- `F5`: Refresh page
- `Ctrl+F`: Search page
- `Ctrl+Shift+I`: Open DevTools

### Debug Mode
Enable Angular DevTools for component inspection

### Mock Data Tips
- Patients are randomly generated
- Health metrics follow realistic patterns
- Refresh page to see different data
- Metrics update based on timestamps

---

**Ready to start? Run `npm start` and explore!** 🚀

**Questions? Check the full README.md for detailed documentation.**



