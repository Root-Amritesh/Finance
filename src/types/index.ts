export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'subscriptions'
  | 'hostel'
  | 'social'
  | 'study'
  | 'misc';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  note: string;
  date: string;
}

export interface Contribution {
  id: string;
  amount: number;
  date: string;
}

export type CertCategory = 'DECORATION' | 'THRESHOLD' | 'DIFFERENTIATOR' | 'PREREQUISITE';

export type CertStatusValue = 'completed' | 'in-progress' | 'upcoming' | 'locked';

export interface Certification {
  id: string;
  code: string;
  name: string;
  phaseLabel: string;
  cost: number;
  category: CertCategory;
  order: number;
  inBudget: boolean;
}

export interface CertStatusEntry {
  certId: string;
  status: CertStatusValue;
  completedDate?: string;
}

export interface MissionPhase {
  id: number;
  code: string;
  name: string;
  rangeLabel: string;
  startDate: string;
  endDate: string;
}

export interface FeeMilestone {
  id: string;
  label: string;
  amount: number;
  status: 'paid' | 'upcoming';
  dueDateLabel: string;
  dueDate: string;
}