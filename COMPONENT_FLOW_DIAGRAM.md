# 🔄 Component Flow Diagram - Visual Guide

## Visual Representation of How Components Work Together

---

## 📊 Complete Component Hierarchy

```
app-root
│
└── dashboard-layout (Sidebar + Header)
    │
    ├── dashboard (Main Dashboard)
    │   ├── kpi-card × 5
    │   ├── health-charts
    │   └── quick-insights
    │
    ├── patient-list (Patient Database)
    │
    ├── reports (Reports Page)
    │
    └── settings (Settings Page)
```

---

## 🔀 Data Flow: Loading Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER NAVIGATES TO /dashboard                           │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  2. ROUTER LOADS DashboardComponent                         │
│                                                             │
│     DashboardComponent                                      │
│     ├── Imports: KpiCardComponent                           │
│     ├── Imports: HealthChartsComponent                     │
│     └── Imports: QuickInsightsComponent                    │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  3. DashboardComponent ngOnInit() runs                     │
│                                                             │
│     ngOnInit() {                                            │
│       this.loadDefaultDashboard();  // Called              │
│     }                                                       │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  4. CALLS PatientService.getPatients()                     │
│                                                             │
│     PatientService                                          │
│     └── Returns: Observable<Patient[]>                     │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  5. CALLS MockDataService.getPatients()                    │
│                                                             │
│     MockDataService                                         │
│     └── Returns: Observable<Patient[]>                     │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  6. SELECTS FIRST PATIENT                                   │
│                                                             │
│     const firstPatient = patients[0];                       │
│     this.selectedPatientId.set(firstPatient.id);           │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  7. CALLS HealthMetricsService.getKPISummary()             │
│                                                             │
│     HealthMetricsService                                    │
│     └── Returns: Observable<KPI[]>                         │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  8. GETS KPI DATA FROM MockDataService                     │
│                                                             │
│     MockDataService                                         │
│     ├── Gets latest health metrics                         │
│     ├── Calculates KPIs                                    │
│     └── Returns: Array of 5 KPIs                           │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  9. DashboardComponent UPDATES STATE                       │
│                                                             │
│     this.kpis.set(kpis);  // Signal updated                │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  10. TEMPLATE RE-RENDERS                                    │
│                                                             │
│      @for (kpi of kpis(); track kpi.id) {                  │
│        <app-kpi-card [kpi]="kpi"></app-kpi-card>           │
│      }                                                      │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  11. KPI CARDS DISPLAY                                      │
│                                                             │
│      KpiCardComponent × 5                                   │
│      ├── Renders gauge chart                               │
│      ├── Shows percentage                                  │
│      └── Displays status                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 👥 Data Flow: Patient Search

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER TYPES IN SEARCH BOX                               │
│                                                             │
│     <input (input)="searchQuery.set($event.target.value)"> │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  2. USER PRESSES ENTER                                      │
│                                                             │
│     <input (keyup.enter)="onSearch()">                     │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  3. PatientListComponent.onSearch() called                  │
│                                                             │
│     onSearch() {                                            │
│       const query = this.searchQuery().trim();             │
│       this.patientService.searchPatients(query)             │
│     }                                                       │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  4. PatientService.searchPatients()                         │
│                                                             │
│     searchPatients(query: string) {                         │
│       return this.mockDataService.getPatients({             │
│         searchQuery: query                                 │
│       });                                                   │
│     }                                                       │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  5. MockDataService filters patients                        │
│                                                             │
│     getPatients(filters) {                                  │
│       let filtered = [...this.mockPatients];               │
│       // Filter by query                                   │
│       if (query) {                                          │
│         filtered = filtered.filter(p =>                     │
│           p.firstName.includes(query) ||                    │
│           p.lastName.includes(query)                        │
│         );                                                  │
│       }                                                     │
│       return of(filtered);                                  │
│     }                                                       │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  6. UPDATE PATIENT LIST                                     │
│                                                             │
│     .subscribe(data => {                                    │
│       this.filteredPatients.set(data);                     │
│     });                                                     │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│  7. TABLE RE-RENDERS WITH FILTERED PATIENTS                │
│                                                             │
│     <tr *ngFor="let patient of filteredPatients()">        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│  DashboardStateService                                      │
│  (Global State Manager)                                     │
└─────────────────────────────────────────────────────────────┘
         ↑                                  ↓
         │                                  │
    Sets state                     Reads state
         │                                  │
    ┌────┴────┐                     ┌───────┴────────┐
    │         │                     │                │
┌───┴───┐ ┌───┴──┐           ┌──────┴────┐    ┌─────┴─────┐
│       │ │      │           │           │    │           │
Patient  │ Dashboard  │ Dashboard   Dashboard  Dashboard
List     │ Component  │ Component   Component  Component
         │           │           │
    Updates      Subscribes  Subscribes
    selected     to changes  to changes
    patient                  

```

**Example:**

```typescript
// DashboardStateService
export class DashboardStateService {
  private selectedPatientSubject = new BehaviorSubject<Patient | null>(null);
  selectedPatient$ = this.selectedPatientSubject.asObservable();
  
  setSelectedPatient(patient: Patient | null): void {
    this.selectedPatientSubject.next(patient);
  }
}

// PatientListComponent (WRITES)
this.dashboardState.setSelectedPatient(patient);

// DashboardComponent (READS)
this.dashboardState.selectedPatient$.subscribe(patient => {
  // React to changes!
});
```

---

## 🎨 Component Communication

### 1. Parent → Child (Input)

```
┌──────────────────────┐
│  DashboardComponent  │
│                      │
│  kpis = signal([...])│
└──────────┬───────────┘
           │  @Input
           ↓
┌──────────────────────┐
│  KpiCardComponent    │
│                      │
│  @Input() kpi: KPI   │
└──────────────────────┘
```

**Code:**

```typescript
// Parent Component (Dashboard)
@Component({...})
export class DashboardComponent {
  kpis = signal<KPI[]>([...]);
}

// Template
<app-kpi-card [kpi]="kpis()[0]"></app-kpi-card>

// Child Component (KpiCard)
@Component({...})
export class KpiCardComponent {
  @Input() kpi!: KPI;  // Receives from parent
}
```

### 2. Child → Parent (Output)

```
┌──────────────────────┐
│  PatientListComponent│
│                      │
│  @Output()           │
│  patientSelected     │
└──────────┬───────────┘
           │  Event emitted
           ↓
┌──────────────────────┐
│  DashboardComponent  │
│                      │
│  (patientSelected)   │
│  = "handleSelect()"  │
└──────────────────────┘
```

**Code:**

```typescript
// Child Component
@Component({...})
export class PatientListComponent {
  @Output() patientSelected = new EventEmitter<Patient>();
  
  selectPatient(patient: Patient): void {
    this.patientSelected.emit(patient);
  }
}

// Template (Child)
<button (click)="selectPatient(patient)">Select</button>

// Parent Template
<app-patient-list (patientSelected)="onPatientSelected($event)"></app-patient-list>

// Parent Component
onPatientSelected(patient: Patient): void {
  console.log('Selected:', patient);
}
```

### 3. Service-Based (Global State)

```
┌──────────────────────┐
│  Any Component       │
│                      │
│  this.dashboardState │
│    .setData(...)     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  DashboardState      │
│  Service             │
│                      │
│  BehaviorSubject     │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  All Subscribers     │
│                      │
│  .subscribe(...)     │
└──────────────────────┘
```

---

## 🔀 HTTP Flow (Future)

```
Component
    │
    ↓ calls method
Service
    │
    ↓ HttpClient
HTTP Request
    │
    ↓ server
API Endpoint
    │
    ↓ returns data
Response
    │
    ↓ Observable
Service
    │
    ↓ pipe operators
Transform
    │
    ↓ final value
Component
    │
    ↓ updates
View
```

**Example:**

```typescript
// Component
this.patientService.getPatients().subscribe(patients => {
  this.patients.set(patients);
});

// Service
export class PatientService {
  constructor(private http: HttpClient) {}
  
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>('/api/patients');
  }
}
```

---

## 📦 Lazy Loading Flow

```
User navigates to /patients
    ↓
Router checks routes
    ↓
Finds lazy-loaded route
    ↓
loadComponent: () => import('./patient-list.component')
    ↓
Angular downloads chunk
    ↓
Component loads
    ↓
Displays in router-outlet
```

**Code:**

```typescript
{
  path: 'patients',
  loadComponent: () => import('./patient-list.component')
    .then(m => m.PatientListComponent)  // Only loads when needed!
}
```

---

## 🎯 Directive Flow

### *ngFor

```
Template: *ngFor="let patient of patients()"
    ↓
Angular creates
    ↓
Template instance
for each patient
    ↓
<table>
  <tr>John Doe</tr>   ← patient #1
  <tr>Jane Smith</tr> ← patient #2
  <tr>Bob Johnson</tr> ← patient #3
</table>
```

### *ngIf

```
Template: *ngIf="isLoading"
    ↓
Check condition
    ↓
true  → Render element
false → Remove element
```

### [property binding]

```
Component property: statusColor = '#FF0000'
    ↓
Template: [style.color]="statusColor"
    ↓
Rendered HTML: <div style="color: #FF0000">
```

---

## 🔄 Change Detection

```
Event occurs (click, input, etc.)
    ↓
Angular triggers change detection
    ↓
Checks all bindings
    ↓
Any changes?
    ↓
    Yes → Update DOM
    No → Skip
```

**Default Strategy:**
- Checks on every event
- Checks async operations
- Can be slow for large apps

**OnPush Strategy:**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  ...
})
```
- Only checks when:
  - @Input() changes
  - Event in THIS component
  - Observable emits (with async pipe)

---

## 🛣️ Complete Navigation Flow

```
User clicks "Patients" in sidebar
    ↓
<a [routerLink]="['/patients']"> clicked
    ↓
Router activates '/patients' route
    ↓
Checks if component is loaded
    ↓
    Not loaded → Lazy load
    Already loaded → Instant
    ↓
PatientListComponent renders
    ↓
ngOnInit() runs
    ↓
Calls loadPatients()
    ↓
Fetches data from service
    ↓
Displays table
```

---

## 🎨 Styling Cascade

```
Global styles (styles.scss)
    ↓
CSS Variables (:root)
    ↓
Component styles
    ↓
Inline styles [style.xxx]
    ↓
Final rendered style
```

**Specificity:**
1. Inline styles (highest)
2. Component scoped styles
3. Global styles (lowest)

**Angular adds unique attribute:**
```html
<div class="kpi-card" _ngcontent-abc123>
  <!-- Only styles in kpi-card.component.scss affect this -->
</div>
```

---

## 🚀 Lifecycle Flow

```
Component created
    ↓
constructor()
    ↓
@Input() values set
    ↓
ngOnInit()  ← You are here most often!
    ↓
ngAfterViewInit()  ← View rendered
    ↓
User interacts...
    ↓
@Input() changes → ngOnChanges()
    ↓
Component destroyed
    ↓
ngOnDestroy()  ← Cleanup here!
```

---

## 📊 Signal Flow (Modern Angular)

```
Signal created: percentage = signal(0)
    ↓
Value changed: percentage.set(75)
    ↓
Angular marks component for check
    ↓
Change detection runs
    ↓
Template reads: {{ percentage() }}
    ↓
DOM updated
```

**Key difference:**
- Old: `BehaviorSubject` + manual subscription
- New: `signal()` + automatic updates

---

**This is how Angular components work together! Each flow represents a different aspect of the application.**

**Study each flow, and you'll understand Angular deeply! 🎓**


