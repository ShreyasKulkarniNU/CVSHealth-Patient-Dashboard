export interface HealthMetrics {
  patientId: string;
  timestamp: Date;
  vitals: VitalSigns;
  labResults: LabResults;
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
  temperature: {
    value: number;
    unit: '°F';
  };
  oxygenSaturation: {
    value: number;
    unit: '%';
  };
  respiratoryRate: {
    value: number;
    unit: 'breaths/min';
  };
}

export interface LabResults {
  vitaminD: number; // ng/mL
  calcium: number; // mg/dL
  cholesterol?: Cholesterol;
}

export interface Cholesterol {
  total: number;
  ldl: number;
  hdl: number;
  triglycerides: number;
  unit: 'mg/dL';
}

export interface BMDResults {
  measurementDate: Date;
  tScore: number;
  zScore: number;
  boneDensityGcm2: number;
  site: 'lumbar_spine' | 'femoral_neck' | 'total_hip';
  interpretation: 'normal' | 'osteopenia' | 'osteoporosis';
  previousMeasurements: BMDHistory[];
  status: KPIStatus;
  percentage: number;
}

export interface BMDHistory {
  date: Date;
  tScore: number;
  zScore: number;
  site: 'lumbar_spine' | 'femoral_neck' | 'total_hip';
}

export interface HemoglobinData {
  value: number;
  unit: 'g/dL';
  measurementDate: Date;
  status: 'low' | 'normal' | 'high';
  referenceRange: { min: number; max: number };
  trend: 'increasing' | 'stable' | 'decreasing';
  history: HemoglobinHistory[];
  kpiStatus: KPIStatus;
  percentage: number;
}

export interface HemoglobinHistory {
  date: Date;
  value: number;
  status: 'low' | 'normal' | 'high';
}

export interface BloodGlucoseData {
  value: number;
  unit: 'mg/dL';
  measurementDate: Date;
  status: 'low' | 'normal' | 'high';
  referenceRange: { min: number; max: number };
  trend: 'increasing' | 'stable' | 'decreasing';
  history: BloodGlucoseHistory[];
  kpiStatus: KPIStatus;
  percentage: number;
}

export interface BloodGlucoseHistory {
  date: Date;
  value: number;
  status: 'low' | 'normal' | 'high';
}

export type KPIStatus = 'critical' | 'warning' | 'normal' | 'good';

export interface KPI {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: KPIStatus;
  threshold: Threshold;
  trend: TrendData;
  lastUpdated: Date;
  percentage?: number;
}

export interface Threshold {
  critical: number;
  warning: number;
  normal: number;
  good: number;
}

export interface TrendData {
  direction: 'up' | 'down' | 'stable';
  percentage: number;
  period: string;
}

export interface Alert {
  id: string;
  patientId: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}


