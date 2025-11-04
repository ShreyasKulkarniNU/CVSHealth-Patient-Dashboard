# 🎓 Angular Development Guide - Step-by-Step Tutorial

## Welcome Fresh Angular Developer! 👋

This guide explains **exactly** how we built the CVS Health Dashboard from scratch. I'll walk you through every step, decision, and piece of code.

---

## 📚 Table of Contents

1. [Project Setup](#1-project-setup)
2. [Understanding Angular Architecture](#2-understanding-angular-architecture)
3. [Creating the Structure](#3-creating-the-structure)
4. [Building the Data Layer](#4-building-the-data-layer)
5. [Creating Components](#5-creating-components)
6. [Setting Up Services](#6-setting-up-services)
7. [Implementing Routing](#7-implementing-routing)
8. [Styling the Application](#8-styling-the-application)
9. [How It All Works Together](#9-how-it-all-works-together)
10. [Key Angular Concepts Explained](#10-key-angular-concepts-explained)

---

## 1. Project Setup

### Step 1.1: Initializing the Project

```bash
# We used Angular CLI to create the project
npx -p @angular/cli@18 ng new cvs-health-dashboard --routing --style=scss --ssr=false --standalone --package-manager=npm
```

**What this does:**
- `ng new` - Creates a new Angular project
- `--routing` - Adds routing support
- `--style=scss` - Uses SCSS for styling (better than CSS)
- `--ssr=false` - No server-side rendering
- `--standalone` - **Important!** Uses modern standalone components (not modules)
- `--package-manager=npm` - Uses npm

**Why Standalone Components?**
Angular's old way used "NgModules" which can be complex. The new way (Angular 14+) uses standalone components - simpler and more flexible!

### Step 1.2: Installing Dependencies

```bash
npm install @angular/material@18 @angular/cdk@18 @angular/animations chart.js ng2-charts rxjs date-fns --legacy-peer-deps
```

**What we installed:**
- `@angular/material` - Google's Material Design UI components
- `@angular/cdk` - Component Development Kit
- `chart.js` & `ng2-charts` - For creating charts
- `rxjs` - Reactive programming (essential for Angular)
- `date-fns` - Better date handling than JavaScript's Date

---

## 2. Understanding Angular Architecture

### The Big Picture

```
Angular App
├── Components (UI pieces - like LEGO blocks)
├── Services (Business logic - data handlers)
├── Models (Data structures - blueprints)
├── Routes (Navigation - URLs)
└── Templates (HTML views)
```

### Key Concept: Component Structure

Every Angular component has **3 files**:

```
my-component/
├── my-component.component.ts  → TypeScript logic
├── my-component.component.html → HTML template
└── my-component.component.scss → Styles
```

**Think of it like this:**
- **TypeScript (.ts)** = The brain (logic, data, functions)
- **HTML (.html)** = The body (what you see)
- **SCSS (.css)** = The clothes (how it looks)

### Standalone vs Module-based

**Old Way (Modules):**
```typescript
// app.module.ts
@NgModule({
  declarations: [Component1, Component2],
  imports: [CommonModule, RouterModule],
  providers: [MyService]
})
export class AppModule {}
```

**New Way (Standalone) - What We Used:**
```typescript
@Component({
  selector: 'app-dashboard',
  standalone: true,  // ← This makes it standalone!
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
```

**Why standalone?**
- Simpler - no module declarations
- Better tree-shaking (removes unused code)
- Easier testing
- Angular's future direction

---

## 3. Creating the Structure

### Step 3.1: Folder Organization

We organized the code into **smart folders**:

```
src/app/
├── core/                    # Core business logic
│   ├── models/             # Data structures
│   └── services/           # Data handling
├── features/               # Feature modules
│   ├── dashboard/          # Dashboard feature
│   ├── patients/           # Patient management
│   ├── reports/            # Reports feature
│   └── settings/           # Settings feature
└── shared/                 # Reusable stuff
```

**Why this structure?**
- `core` - Things every feature needs
- `features` - Each big feature in its own folder
- `shared` - Components used everywhere

### Step 3.2: Creating Folders

```bash
# We created folders using PowerShell
New-Item -Path "src/app/core/models", "src/app/core/services", 
         "src/app/features/dashboard/components" -ItemType Directory -Force
```

**Or manually**: Just right-click and create folders in VS Code!

---

## 4. Building the Data Layer

### Step 4.1: Creating Models (Data Structures)

**File**: `src/app/core/models/patient.model.ts`

```typescript
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  mrn: string;  // Medical Record Number
  contactInfo: ContactInfo;
  insurance: InsuranceInfo;
  primaryPhysician: string;
  status: 'active' | 'inactive' | 'pending';
  lastVisit?: Date;
  nextAppointment?: Date;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
```

**What is an Interface?**
Think of it like a **blueprint** or **contract**. It defines what data a `Patient` must have.

**Why interfaces?**
- TypeScript catches errors before running code
- Auto-complete in your IDE
- Documents your data structure
- Prevents typos

**Example:**
```typescript
const patient: Patient = {
  id: "PAT001",
  firstName: "John",
  lastName: "Doe",
  // ... must have all these fields!
}
```

### Step 4.2: Health Metrics Model

**File**: `src/app/core/models/health-metrics.model.ts`

```typescript
export interface HealthMetrics {
  patientId: string;
  timestamp: Date;
  vitals: VitalSigns;
  boneMineralDensity: BMDResults;
  hemoglobin: HemoglobinData;
  bloodGlucose: BloodGlucoseData;
}

export interface VitalSigns {
  bloodPressure: {
    systolic: number;
    diastolic: number;
    unit: 'mmHg';
  };
  heartRate: {
    value: number;
    unit: 'bpm';
  };
  // ... more vital signs
}

export interface BMDResults {
  measurementDate: Date;
  tScore: number;
  zScore: number;
  status: KPIStatus;
  percentage: number;
}

export type KPIStatus = 'critical' | 'warning' | 'normal' | 'good';
```

**Key Concepts:**
- `interface` - Structure of an object
- `type` - Union of possible values
- `number` - Numbers (integers or decimals)
- `string` - Text
- `Date` - Date objects

---

## 5. Creating Components

### Step 5.1: Understanding Components

**A component = A reusable UI piece**

Example: The KPI Card component we built:

**File**: `src/app/features/dashboard/components/dashboard/kpi-card/kpi-card.component.ts`

```typescript
import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KPI } from '../../../../../core/models/health-metrics.model';

@Component({
  selector: 'app-kpi-card',  // ← How we use it in HTML
  standalone: true,          // ← Modern Angular
  imports: [CommonModule],   // ← What this component needs
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent {
  @Input() kpi!: KPI;  // ← Data passed from parent
  
  percentage = signal<number>(0);
  statusColor = signal<string>('#666');
  
  // Expose Math to template
  Math = Math;
}
```

**Breaking it down:**

**1. `@Component` Decorator:**
```typescript
@Component({...})
```
- Tells Angular "this is a component"
- Configuration object

**2. `selector: 'app-kpi-card'`:**
```html
<!-- How we use it -->
<app-kpi-card [kpi]="myData"></app-kpi-card>
```
- HTML tag name when using this component

**3. `standalone: true`:**
- Makes it a standalone component (new Angular style)

**4. `imports: [CommonModule]`:**
- What this component needs to work
- `CommonModule` has `*ngIf`, `*ngFor`, `DatePipe`, etc.

**5. `@Input() kpi!: KPI`:**
```typescript
@Input() kpi!: KPI;
```
- `@Input()` - Data passed FROM parent TO child
- `kpi` - The property name
- `!` - Non-null assertion (TypeScript)
- `KPI` - The type

**6. `signal`:**
```typescript
percentage = signal<number>(0);
```
- **Modern Angular reactive primitive**
- New in Angular 16+
- Better than the old `BehaviorSubject` for simple state
- Automatically triggers updates

**How to use a signal:**
```typescript
// Set a value
this.percentage.set(75);

// Get a value
const value = this.percentage();

// In template
{{ percentage() }}  // ← Note the () to read!
```

### Step 5.2: The Template (HTML)

**File**: `kpi-card.component.html`

```html
<div class="kpi-card">
  <div class="kpi-header">
    <h3 class="kpi-name">{{ kpi.name }}</h3>
    <span class="status-icon">{{ getStatusIcon() }}</span>
  </div>
  
  <div class="kpi-content">
    <div class="gauge-container">
      <!-- SVG gauge chart -->
      <svg class="gauge" viewBox="0 0 160 120">
        <path
          class="progress-arc"
          [attr.d]="'M 20 100 A 60 60 0 0 1 ' + (20 + (percentage() / 100) * 120) + ' ' + (100 - 60 * Math.sin((percentage() / 100) * Math.PI))"
          fill="none"
          [attr.stroke]="statusColor()"
          stroke-width="12"
        />
      </svg>
      
      <div class="gauge-value">
        <span class="value">{{ percentage() | number:'1.0-0' }}%</span>
      </div>
    </div>
  </div>
</div>
```

**Angular Template Syntax:**

**1. Interpolation `{{ }}`:**
```html
<h3>{{ kpi.name }}</h3>
```
- Displays data in HTML
- Can use expressions: `{{ value + 10 }}`

**2. Property Binding `[ ]`:**
```html
[attr.stroke]="statusColor()"
```
- Binds component property to HTML attribute
- One-way: Component → HTML

**3. Method Calling:**
```html
{{ getStatusIcon() }}
```
- Calls methods from component
- Must return a value

**4. Pipes `|`:**
```html
{{ percentage() | number:'1.0-0' }}
```
- Transforms data
- `number:'1.0-0'` = Round to whole number
- Many built-in pipes: `date`, `uppercase`, `lowercase`, `json`

**5. SVG Rendering:**
```html
<svg>
  <path [attr.d]="calculatedPath" />
</svg>
```
- We create the gauge chart using SVG
- `attr.d` = The path data for the arc

### Step 5.3: The Styles (SCSS)

**File**: `kpi-card.component.scss`

```scss
.kpi-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
}

.kpi-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
```

**SCSS Features We Used:**

**1. Nested Selectors:**
```scss
.kpi-card {
  &:hover {  // ← This becomes .kpi-card:hover
    // styles
  }
}
```

**2. Variables:**
```scss
$primary-color: #00A0DD;
.btn {
  background: $primary-color;
}
```

**3. CSS Variables (in root styles):**
```scss
:root {
  --cvs-blue: #00A0DD;
}
// Use it anywhere:
.kpi-card {
  border-color: var(--cvs-blue);
}
```

---

## 6. Setting Up Services

### What is a Service?

**Service = Business Logic Handler**

Components are for UI, Services are for data!

### Step 6.1: Mock Data Service

**File**: `src/app/core/services/mock-data.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'  // ← Makes it a singleton!
})
export class MockDataService {
  private mockPatients: Patient[] = [];
  
  constructor() {
    this.mockPatients = this.generateMockPatients();
  }
  
  getPatients(): Observable<Patient[]> {
    return of(this.mockPatients).pipe(delay(500));
  }
  
  private generateMockPatients(): Patient[] {
    // Generate 30 fake patients
    return Array.from({ length: 30 }, (_, i) => ({
      id: `PAT${String(i + 1).padStart(5, '0')}`,
      firstName: firstNames[i % firstNames.length],
      lastName: lastNames[i % lastNames.length],
      // ... generate data
    }));
  }
}
```

**Key Concepts:**

**1. `@Injectable`:**
```typescript
@Injectable({
  providedIn: 'root'
})
```
- Makes it injectable (Angular's dependency injection)
- `providedIn: 'root'` = Creates ONE instance for entire app (singleton)

**2. Observable:**
```typescript
getPatients(): Observable<Patient[]> {
  return of(this.mockPatients).pipe(delay(500));
}
```
- **RxJS** concept - handles async operations
- `of()` - Creates observable from data
- `.pipe()` - Chains operators
- `delay(500)` - Waits 500ms (simulates network delay)

**3. Why Observables?**
- Real APIs take time (network delay)
- RxJS handles async elegantly
- Can cancel, retry, transform

### Step 6.2: Patient Service

**File**: `src/app/core/services/patient.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private mockDataService: MockDataService) {}
  
  getPatients(): Observable<Patient[]> {
    return this.mockDataService.getPatients();
  }
  
  getPatientById(id: string): Observable<Patient | undefined> {
    return this.mockDataService.getPatientById(id);
  }
  
  searchPatients(query: string): Observable<Patient[]> {
    return this.mockDataService.getPatients({ searchQuery: query });
  }
}
```

**Dependency Injection:**

```typescript
constructor(private mockDataService: MockDataService) {}
```

**What happens:**
1. Angular sees `MockDataService` in constructor
2. Angular finds or creates it
3. Injects it automatically
4. We can use `this.mockDataService`

**Why use a service layer?**
- **Abstraction** - Components don't know about MockDataService
- **Easy to swap** - Change `MockDataService` → Real API service
- **Reusable** - Many components can use it

### Step 6.3: State Management Service

**File**: `src/app/core/services/dashboard-state.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
  private selectedPatientSubject = new BehaviorSubject<Patient | null>(null);
  
  // Expose as Observable (read-only)
  selectedPatient$ = this.selectedPatientSubject.asObservable();
  
  // Getter
  get selectedPatient(): Patient | null {
    return this.selectedPatientSubject.value;
  }
  
  // Setter
  setSelectedPatient(patient: Patient | null): void {
    this.selectedPatientSubject.next(patient);
  }
}
```

**BehaviorSubject Explained:**

```typescript
// Create
private selectedPatientSubject = new BehaviorSubject<Patient | null>(null);

// Read-only access
selectedPatient$ = this.selectedPatientSubject.asObservable();

// Update
this.selectedPatientSubject.next(patient);

// Get current value
const current = this.selectedPatientSubject.value;
```

**Why BehaviorSubject?**
- Stores current value
- Emits to all subscribers
- Can get current value synchronously

**In Component:**
```typescript
ngOnInit(): void {
  // Subscribe
  this.dashboardState.selectedPatient$.subscribe(patient => {
    console.log('Patient changed:', patient);
  });
  
  // Update
  this.dashboardState.setSelectedPatient(newPatient);
}
```

---

## 7. Implementing Routing

### What is Routing?

**Routing = Navigation between pages**

Different URLs = Different components

### Step 7.1: Define Routes

**File**: `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',  // ← Default route
    pathMatch: 'full'
  },
  {
    path: '',  // ← Layout wrapper
    loadComponent: () => import('./features/dashboard/components/dashboard-layout/dashboard-layout.component')
      .then(m => m.DashboardLayoutComponent),
    children: [  // ← Nested routes
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/components/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'patients',
        loadComponent: () => import('./features/patients/components/patient-list/patient-list.component')
          .then(m => m.PatientListComponent)
      }
    ]
  }
];
```

**Route Structure:**

```typescript
{
  path: 'dashboard',           // URL: /dashboard
  loadComponent: () => import('...')  // Lazy load!
}
```

**Lazy Loading Explained:**

**Without lazy loading:**
```typescript
import { DashboardComponent } from './dashboard.component';
// ↑ Loads immediately, even if user never visits
```

**With lazy loading:**
```typescript
loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent)
// ↑ Only loads when user visits this route
```

**Benefits:**
- Faster initial load
- Smaller bundle
- Loads on demand

### Step 7.2: Router Outlet

**File**: `app.component.html`

```html
<router-outlet></router-outlet>
```

**What it does:**
- Angular router places components here
- Changes when URL changes

### Step 7.3: Navigation Links

**File**: `dashboard-layout.component.html`

```html
<nav class="nav-menu">
  <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
  <a [routerLink]="['/patients']" routerLinkActive="active">Patients</a>
  <a [routerLink]="['/reports']" routerLinkActive="active">Reports</a>
  <a [routerLink]="['/settings']" routerLinkActive="active">Settings</a>
</nav>

<div class="content-area">
  <router-outlet></router-outlet>
</div>
```

**Router Directives:**

**1. `[routerLink]`:**
```html
<a [routerLink]="['/dashboard']">Dashboard</a>
```
- Makes link navigate to route
- `['/dashboard']` = Route path

**2. `routerLinkActive`:**
```html
<a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
```
- Adds CSS class when route is active
- `"active"` = Class name

### Step 7.4: App Configuration

**File**: `src/app/app.config.ts`

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),              // ← Routing
    provideHttpClient(),                 // ← HTTP calls
    provideAnimations()                  // ← Animations
  ]
};
```

**Modern Angular Standalone:**
- No `app.module.ts` needed!
- Configure in `app.config.ts`
- Use `provide*` functions

---

## 8. Styling the Application

### Step 8.1: Global Styles

**File**: `src/styles.scss`

```scss
/* Import Angular Material theme */
@import '@angular/material/prebuilt-themes/azure-blue.css';

/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* CSS Variables */
:root {
  --cvs-red: #CC0000;
  --cvs-blue: #00A0DD;
  --status-normal: #4CAF50;
  --status-warning: #FFC107;
  --status-critical: #F44336;
}

/* Global resets */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background: #f0f4f8;
}
```

**CSS Variables Benefits:**
```scss
// Define once
:root {
  --primary-color: #00A0DD;
}

// Use everywhere
.button { color: var(--primary-color); }
.header { background: var(--primary-color); }

// Easy to change theme!
```

### Step 8.2: Component Scoping

**Angular automatically adds unique attributes:**

```html
<!-- Generated HTML -->
<div class="kpi-card" _ngcontent-abc-1>
  <h3 _ngcontent-abc-1>Title</h3>
</div>

<div class="patient-card" _ngcontent-xyz-2>
  <h3 _ngcontent-xyz-2>Title</h3>
</div>
```

**SCSS is component-scoped:**
```scss
// kpi-card.component.scss
h3 {
  color: blue;
}
// Only affects THIS component's h3!
```

---

## 9. How It All Works Together

### The Flow of Data

```
1. User Action (clicks button)
   ↓
2. Component receives event
   ↓
3. Component calls Service method
   ↓
4. Service returns Observable
   ↓
5. Component subscribes
   ↓
6. Data arrives → Component updates
   ↓
7. Angular updates the view
```

### Example: Loading Patients

**Step 1: User navigates to Patients page**

**Step 2: PatientListComponent initializes**

```typescript
export class PatientListComponent implements OnInit {
  patients = signal<Patient[]>([]);
  
  constructor(private patientService: PatientService) {}
  
  ngOnInit(): void {
    this.loadPatients();
  }
  
  loadPatients(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.patients.set(patients);
    });
  }
}
```

**Step 3: Service fetches data**

```typescript
export class PatientService {
  getPatients(): Observable<Patient[]> {
    return this.mockDataService.getPatients();
  }
}
```

**Step 4: Mock data returns**

```typescript
export class MockDataService {
  getPatients(): Observable<Patient[]> {
    return of(this.mockPatients).pipe(delay(500));
  }
}
```

**Step 5: Component displays**

```html
<div class="patient-table">
  <tr *ngFor="let patient of patients()">
    <td>{{ patient.firstName }} {{ patient.lastName }}</td>
    <td>{{ patient.id }}</td>
  </tr>
</div>
```

**Angular's `*ngFor`:**
```html
*ngFor="let patient of patients()"
```
- Loops through array
- Creates element for each item
- `let patient` = Loop variable
- `patients()` = Get signal value

---

## 10. Key Angular Concepts Explained

### 10.1: Lifecycle Hooks

```typescript
export class MyComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    // Runs ONCE when component loads
    console.log('Component initialized');
  }
  
  ngOnDestroy(): void {
    // Runs when component is destroyed
    console.log('Component destroyed');
    // Cleanup here!
  }
}
```

**Common Hooks:**
- `ngOnInit` - After first render
- `ngOnDestroy` - Cleanup
- `ngOnChanges` - When @Input changes
- `ngAfterViewInit` - After view renders

### 10.2: Data Binding Types

**1. Interpolation:**
```html
<h1>{{ title }}</h1>
```
Component → HTML

**2. Property Binding:**
```html
<img [src]="imageUrl" />
```
Component → HTML

**3. Event Binding:**
```html
<button (click)="handleClick()">Click me</button>
```
HTML → Component

**4. Two-Way Binding:**
```html
<input [(ngModel)]="name" />
```
Component ⇄ HTML (needs FormsModule)

### 10.3: Directives

**Built-in Directives:**

**1. `*ngIf`:**
```html
<div *ngIf="isLoggedIn">Welcome!</div>
```
Shows/hides element

**2. `*ngFor`:**
```html
<div *ngFor="let item of items">{{ item }}</div>
```
Loops through array

**3. `[ngClass]`:**
```html
<div [ngClass]="{ active: isActive }">Content</div>
```
Dynamic CSS classes

**4. `[ngStyle]`:**
```html
<div [ngStyle]="{ color: textColor }">Content</div>
```
Dynamic inline styles

### 10.4: Pipes

**Transform data in templates:**

```html
<!-- Date -->
{{ myDate | date:'shortDate' }}

<!-- Currency -->
{{ price | currency:'USD' }}

<!-- Uppercase -->
{{ name | uppercase }}

<!-- Slice -->
{{ longText | slice:0:50 }}

<!-- JSON (debug) -->
{{ myObject | json }}
```

**Custom Pipes** (if needed):
```typescript
@Pipe({ name: 'myPipe' })
export class MyPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
```

---

## 🎯 Quick Reference

### Component Template

```typescript
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss'
})
export class MyComponent {
  // Properties
  data = signal<MyType>({});
  
  // Input from parent
  @Input() inputData!: MyType;
  
  // Output to parent
  @Output() someEvent = new EventEmitter();
  
  constructor(private myService: MyService) {}
  
  ngOnInit(): void {
    // Initialize
  }
}
```

### Service Template

```typescript
@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor() {}
  
  getData(): Observable<MyType[]> {
    return of([]);
  }
}
```

### Common RxJS Operators

```typescript
import { of, map, filter, tap, catchError } from 'rxjs';

// Create
of([1, 2, 3]).subscribe(console.log);

// Transform
of([1, 2, 3])
  .pipe(
    map(x => x * 2),        // [2, 4, 6]
    filter(x => x > 3),     // [4, 6]
    tap(console.log),       // Side effect
    catchError(err => {})   // Error handling
  )
  .subscribe();
```

---

## 🚀 Next Steps for You

1. **Play with the code** - Change values, add features
2. **Read Angular Docs** - https://angular.dev
3. **Practice RxJS** - Essential for Angular
4. **Build something** - Practice makes perfect!

---

## 📚 Resources

- **Angular Docs**: https://angular.dev
- **RxJS Docs**: https://rxjs.dev
- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **Angular Material**: https://material.angular.io

---

**Happy Coding! 🎉**

Remember: Every Angular developer started where you are now. Keep practicing!


