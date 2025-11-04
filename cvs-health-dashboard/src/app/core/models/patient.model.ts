export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  mrn: string; // Medical Record Number
  contactInfo: ContactInfo;
  insurance: InsuranceInfo;
  primaryPhysician: string;
  medicalHistory: MedicalHistory[];
  currentMedications: Medication[];
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

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber: string;
}

export interface MedicalHistory {
  condition: string;
  diagnosisDate: Date;
  status: 'active' | 'resolved' | 'chronic';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  prescriber: string;
}

export interface PatientFilters {
  searchQuery?: string;
  doctor?: string;
  status?: string;
  dateRange?: DateRange;
}

export interface DateRange {
  start: Date;
  end: Date;
}


