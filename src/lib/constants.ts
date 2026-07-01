import type { Certification, ExpenseCategory, FeeMilestone, MissionPhase } from '@/types';

// ── CORE BUDGET FIGURES ───────────────────────────────────────────────
export const BUDGET_CEILING         = 3_980_000;  // ₹39,80,000 — ALL expenses except laptops
export const SEM1_TOTAL             = 407_500;    // confirmed cleared on BU portal
export const TOTAL_REMAINING_FEES   = 1_906_000;  // Sem 2 + Year 2 + Year 3 + Year 4

export const MONTHLY_POCKET_MONEY   = 6_000;      // ₹6,000/month fixed
export const TOTAL_MISSION_MONTHS   = 48;
export const MONTHLY_TOTAL          = MONTHLY_POCKET_MONEY * TOTAL_MISSION_MONTHS; // ₹2,88,000

// ── LAPTOPS — OUTSIDE THE ₹39.80L CEILING ───────────────────────────
export const LAPTOP_COLLEGE_GOAL    = 250_000;    // ₹2,50,000 — separate savings goal

export const LAPTOP_LAB = {
  MIN:  600_000,  // ₹6L minimum
  PLAN: 700_000,  // ₹7L target
  MAX:  800_000,  // ₹8L stretch
} as const;

// ── SCHOLARSHIP ───────────────────────────────────────────────────────
export const SCHOLARSHIP_TOTAL      = 76_000;
export const SCHOLARSHIP_PER_SEM    = 38_000;

// ── SEM 1 — FULLY CLEARED ────────────────────────────────────────────
export const SEM1_LINE_ITEMS = [
  { label: 'Tuition Fee',                     amount: 190_000 },
  { label: 'Examination Charges',             amount: 6_000   },
  { label: 'Co-Curricular Charges',           amount: 3_000   },
  { label: 'Alumni Charges',                  amount: 1_500   },
  { label: 'Security Deposit (refundable)',   amount: 30_000  },
  { label: 'Registration Fee',                amount: 45_000  },
  { label: 'Admission Scholarship',           amount: -38_000 },
  { label: 'Hostel — Triple Sharing (annual)',amount: 170_000 },
] as const;

export const SEM1_PAYMENTS = [
  { id: 'G44989', amount: 50_000,   date: '2026-04-18' },
  { id: 'G44990', amount: 100_000,  date: '2026-04-18' },
  { id: 'G69500', amount: 257_500,  date: '2026-06-24' },
] as const;

// ── FEE ROADMAP ───────────────────────────────────────────────────────
export const FEE_MILESTONES: FeeMilestone[] = [
  {
    id: 'sem1', label: 'Sem 1 AY2026-27',
    amount: SEM1_TOTAL, status: 'paid',
    dueDateLabel: '24 Jun 2026', dueDate: '2026-06-24',
  },
  {
    id: 'sem2', label: 'Sem 2 AY2026-27',
    amount: 161_000, status: 'upcoming',
    dueDateLabel: '~Jan 2027', dueDate: '2027-01-15',
  },
  {
    id: 'year2', label: 'Year 2 AY2027-28',
    amount: 575_000, status: 'upcoming',
    dueDateLabel: '~Aug 2027', dueDate: '2027-08-01',
  },
  {
    id: 'year3', label: 'Year 3 AY2028-29',
    amount: 585_000, status: 'upcoming',
    dueDateLabel: '~Aug 2028', dueDate: '2028-08-01',
  },
  {
    id: 'year4', label: 'Year 4 AY2029-30',
    amount: 585_000, status: 'upcoming',
    dueDateLabel: '~Aug 2029', dueDate: '2029-08-01',
  },
];

// ── CERTIFICATIONS — COLLEGE PHASE (inside ₹39.80L) ──────────────────
export const COLLEGE_CERTS: Certification[] = [
  { id: 'az900',   code: 'AZ-900',     name: 'Microsoft Azure Fundamentals',              phaseLabel: 'Phase 0',  cost: 9_440,  category: 'DECORATION',    order: 1,  inBudget: true  },
  { id: 'clfc02',  code: 'CLF-C02',    name: 'AWS Certified Cloud Practitioner',          phaseLabel: 'Sem 1',    cost: 9_800,  category: 'THRESHOLD',     order: 2,  inBudget: true  },
  { id: 'secplus', code: 'Security+',  name: 'CompTIA Security+',                         phaseLabel: 'Sem 2',    cost: 54_656, category: 'THRESHOLD',     order: 3,  inBudget: true  },
  { id: 'saac03',  code: 'SAA-C03',    name: 'AWS Certified Solutions Architect – Assoc.', phaseLabel: 'Sem 3',   cost: 15_000, category: 'DIFFERENTIATOR',order: 4,  inBudget: true  },
  { id: 'az500',   code: 'AZ-500',     name: 'Microsoft Azure Security Engineer',         phaseLabel: 'Sem 4',    cost: 15_100, category: 'DIFFERENTIATOR',order: 5,  inBudget: true  },
  { id: 'gcpace',  code: 'GCP ACE',    name: 'Google Associate Cloud Engineer',           phaseLabel: 'Sem 5',    cost: 13_215, category: 'DIFFERENTIATOR',order: 6,  inBudget: true  },
  { id: 'scsc03',  code: 'SCS-C03',    name: 'AWS Certified Security – Specialty',        phaseLabel: 'Sem 5',    cost: 28_318, category: 'THRESHOLD',     order: 7,  inBudget: true  },
  { id: 'cka',     code: 'CKA',        name: 'Certified Kubernetes Administrator',        phaseLabel: 'Sem 5-6',  cost: 50_000, category: 'PREREQUISITE',  order: 8,  inBudget: true  },
  { id: 'cks',     code: 'CKS',        name: 'Certified Kubernetes Security Specialist',  phaseLabel: 'Sem 6',    cost: 60_885, category: 'DIFFERENTIATOR',order: 9,  inBudget: true  },
];

export const COLLEGE_CERTS_TOTAL = COLLEGE_CERTS.reduce((sum, c) => sum + c.cost, 0); // ₹2,56,414

export const YEAR3_CERT_SPIKE_IDS   = ['gcpace', 'scsc03', 'cka', 'cks'] as const;
export const YEAR3_CERT_SPIKE_TOTAL = COLLEGE_CERTS
  .filter((c) => (YEAR3_CERT_SPIKE_IDS as readonly string[]).includes(c.id))
  .reduce((sum, c) => sum + c.cost, 0); // ₹1,52,418

// ── CERTIFICATIONS — BRIDGE PHASE (post-grad, salary-funded, NOT in ₹39.80L) ──
export const BRIDGE_CERTS: Certification[] = [
  { id: 'ccsp',      code: 'CCSP',        name: 'Certified Cloud Security Professional',          phaseLabel: 'Bridge Yr 1', cost: 60_000,  category: 'THRESHOLD',     order: 10, inBudget: false },
  { id: 'iso27001li',code: 'ISO 27001 LI',name: 'ISO 27001 Lead Implementer',                    phaseLabel: 'Bridge Yr 2', cost: 32_000,  category: 'THRESHOLD',     order: 11, inBudget: false },
  { id: 'gcppcse',   code: 'GCP PCSE',    name: 'Google Professional Cloud Security Engineer',   phaseLabel: 'Bridge Yr 2', cost: 20_000,  category: 'DIFFERENTIATOR',order: 12, inBudget: false },
  { id: 'cissp',     code: 'CISSP',       name: 'CISSP',                                         phaseLabel: 'Post-2035',   cost: 150_000, category: 'DECORATION',    order: 13, inBudget: false },
];

export const ALL_CERTS: Certification[] = [...COLLEGE_CERTS, ...BRIDGE_CERTS];

// ── PRACTICE PLATFORMS (inside ₹39.80L) ──────────────────────────────
export const PRACTICE_PLATFORMS = {
  htb:           { name: 'Hack The Box',      perYear: 50_000, years: 4, total: 200_000 },
  thm:           { name: 'TryHackMe',         perYear: 4_800,  years: 4, total: 19_200  },
  udemyCoursera: { name: 'Udemy + Coursera',  total: 10_000 },
} as const;

// ── CYBER BUDGET — NAMED BLOCK (inside ₹39.80L) ──────────────────────
export const CYBER_BUDGET = {
  collegeCerts:  COLLEGE_CERTS_TOTAL,
  htb:           PRACTICE_PLATFORMS.htb.total,
  thm:           PRACTICE_PLATFORMS.thm.total,
  udemyCoursera: PRACTICE_PLATFORMS.udemyCoursera.total,
  total:         COLLEGE_CERTS_TOTAL
                   + PRACTICE_PLATFORMS.htb.total
                   + PRACTICE_PLATFORMS.thm.total
                   + PRACTICE_PLATFORMS.udemyCoursera.total,
} as const; // ₹4,85,614

// ── BOOKS & SETUP (inside ₹39.80L) ───────────────────────────────────
export const BOOKS_SETUP_TOTAL = 29_500;

// ── FULL BUDGET PROJECTION ────────────────────────────────────────────
export const TOTAL_COMMITTED =
  SEM1_TOTAL + TOTAL_REMAINING_FEES + MONTHLY_TOTAL + CYBER_BUDGET.total + BOOKS_SETUP_TOTAL;
  // 407500 + 1906000 + 288000 + 485614 + 29500 = ₹31,16,614

export const BUDGET_HEADROOM = BUDGET_CEILING - TOTAL_COMMITTED; // ₹8,63,386

// ── EXPENSE CATEGORIES ────────────────────────────────────────────────
export const EXPENSE_CATEGORIES: Record<ExpenseCategory, { label: string; color: string }> = {
  food:          { label: 'Food',             color: '#39FF14' },
  transport:     { label: 'Transport',        color: '#00F0FF' },
  subscriptions: { label: 'Subscriptions',   color: '#BF5AF2' },
  hostel:        { label: 'Hostel Extras',   color: '#FFB800' },
  social:        { label: 'Social',          color: '#FF3B5C' },
  study:         { label: 'Study Materials', color: '#5AA9F2' },
  misc:          { label: 'Misc',            color: '#4A5568' },
};

// ── MISSION TIMELINE ──────────────────────────────────────────────────
export const MISSION_START_DATE = '2026-08-01';
export const GRADUATION_DATE    = '2030-05-31';

export const MISSION_PHASES: MissionPhase[] = [
  { id: 0, code: 'PHASE 0', name: 'IGNITION',        rangeLabel: 'Pre-College Prep',   startDate: '2026-01-01', endDate: '2026-07-31' },
  { id: 1, code: 'PHASE 1', name: 'FOUNDATION',      rangeLabel: 'Year 1 · Sem 1–2',  startDate: '2026-08-01', endDate: '2027-07-31' },
  { id: 2, code: 'PHASE 2', name: 'EXPANSION',       rangeLabel: 'Year 2 · Sem 3–4',  startDate: '2027-08-01', endDate: '2028-07-31' },
  { id: 3, code: 'PHASE 3', name: 'SPECIALIZATION',  rangeLabel: 'Year 3 · Sem 5–6',  startDate: '2028-08-01', endDate: '2029-07-31' },
  { id: 4, code: 'PHASE 4', name: 'DEPLOYMENT',      rangeLabel: 'Year 4 · Sem 7–8',  startDate: '2029-08-01', endDate: '2030-05-31' },
];

// ── THEME HEX (for Recharts/canvas — mirrors CSS vars) ────────────────
export const THEME_HEX = {
  bgBase:      '#07070F',
  bgSurface:   '#0D0D1A',
  neon:        '#39FF14',
  cyan:        '#00F0FF',
  purple:      '#BF5AF2',
  amber:       '#FFB800',
  red:         '#FF3B5C',
  textPrimary: '#E8EAF0',
  textMuted:   '#4A5568',
  textDim:     '#2D3748',
} as const;