/**
 * PAYLOAD FINANCE — Financial Ground Truth
 * All amounts in whole Indian Rupees (integers).
 * This file is the single source of truth — never deviate from these numbers.
 */

// ═══════════════════════════════════════════════════════════════
// MISSION TIMELINE
// ═══════════════════════════════════════════════════════════════
export const MISSION_START = new Date('2026-08-01')
export const MISSION_END   = new Date('2030-05-31')

// ═══════════════════════════════════════════════════════════════
// BUDGET CEILINGS
// ═══════════════════════════════════════════════════════════════
export const TOTAL_BUDGET  = 39_80_000   // ₹39,80,000 — ALL expenses except laptop
export const LAPTOP_A_GOAL = 2_50_000   // ₹2,50,000  — College laptop (separate)
export const LAPTOP_B_MIN  = 6_00_000   // ₹6,00,000  — Lab machine minimum
export const LAPTOP_B_PLAN = 7_00_000   // ₹7,00,000  — Lab machine plan
export const LAPTOP_B_MAX  = 8_00_000   // ₹8,00,000  — Lab machine max

// ═══════════════════════════════════════════════════════════════
// MONTHLY POCKET MONEY
// ═══════════════════════════════════════════════════════════════
export const MONTHLY_POCKET    = 6_000   // ₹6,000/month fixed
export const POCKET_MONTHS     = 48      // 48 months total
export const POCKET_TOTAL      = 2_88_000 // ₹2,88,000 (6000 × 48)

// ═══════════════════════════════════════════════════════════════
// SCHOLARSHIP — YEAR 1 ONLY
// ═══════════════════════════════════════════════════════════════
export const SCHOLARSHIP_TOTAL = 76_000   // ₹76,000 total
export const SCHOLARSHIP_SEM1  = 38_000   // ₹38,000 Sem 1 (CONFIRMED PAID)
export const SCHOLARSHIP_SEM2  = 38_000   // ₹38,000 Sem 2 (upcoming Jan 2027)

// ═══════════════════════════════════════════════════════════════
// SEM 1 AY2026-27 — FULLY CLEARED
// ═══════════════════════════════════════════════════════════════
export const SEM1 = {
  label:             'Sem 1 AY2026-27',
  status:            'PAID' as const,
  tuition:           1_90_000,
  examination:       6_000,
  coCurricular:      3_000,
  alumni:            1_500,
  securityDeposit:   30_000,   // REFUNDABLE at graduation May 2030
  registrationFee:   45_000,
  scholarship:      -38_000,
  hostel:           1_70_000,  // ANNUAL charge paid upfront in Sem 1
  payments: [
    { ref: 'G44989', amount: 50_000,   date: '2026-04-18' },
    { ref: 'G44990', amount: 1_00_000, date: '2026-04-18' },
    { ref: 'G69500', amount: 2_57_500, date: '2026-06-24' },
  ],
  totalPaid:         4_07_500,
  balance:           0,
} as const

// ═══════════════════════════════════════════════════════════════
// UPCOMING FEE SCHEDULE
// ═══════════════════════════════════════════════════════════════
export const UPCOMING_FEES = [
  {
    id:          'sem2',
    label:       'Sem 2 AY2026-27',
    semester:    2,
    year:        1,
    dueDate:     '2027-01-01',
    total:       1_61_000,
    breakdown: {
      tuition:      1_90_000,
      scholarship: -38_000,
      examination:  6_000,
      coCurricular: 3_000,
    },
    hostelIncluded: false,
  },
  {
    id:          'year2',
    label:       'Year 2 AY2027-28',
    semester:    '3-4',
    year:        2,
    dueDate:     '2027-08-01',
    total:       5_75_000,
    breakdown: {
      tuition:      3_90_000,
      examination:  12_000,
      coCurricular: 3_000,
      hostel:       1_70_000,
    },
    hostelIncluded: true,
  },
  {
    id:          'year3',
    label:       'Year 3 AY2028-29',
    semester:    '5-6',
    year:        3,
    dueDate:     '2028-08-01',
    total:       5_85_000,
    breakdown: {
      tuition:      4_00_000,
      examination:  12_000,
      coCurricular: 3_000,
      hostel:       1_70_000,
    },
    hostelIncluded: true,
  },
  {
    id:          'year4',
    label:       'Year 4 AY2029-30',
    semester:    '7-8',
    year:        4,
    dueDate:     '2029-08-01',
    total:       5_85_000,
    breakdown: {
      tuition:      4_00_000,
      examination:  12_000,
      coCurricular: 3_000,
      hostel:       1_70_000,
    },
    hostelIncluded: true,
  },
] as const

export const TOTAL_REMAINING_FEES = 19_06_000

// ═══════════════════════════════════════════════════════════════
// CERTIFICATION ROADMAP — COLLEGE PHASE (inside ₹39.80L)
// ═══════════════════════════════════════════════════════════════
export type CertTier = 'DECORATION' | 'THRESHOLD' | 'DIFFERENTIATOR' | 'PREREQUISITE'
export type CertPhase = 'COLLEGE' | 'BRIDGE' | 'POST'

export interface Certification {
  id:       number
  code:     string
  name:     string
  phase:    CertPhase
  semester: string
  cost:     number
  tier:     CertTier
  inBudget: boolean   // true = counted in ₹39.80L
}

export const CERTIFICATIONS: Certification[] = [
  // College Phase — inside ₹39.80L
  { id: 1,  code: 'AZ-900',       name: 'Azure Fundamentals',             phase: 'COLLEGE', semester: 'Phase 0', cost: 9_440,   tier: 'DECORATION',    inBudget: true },
  { id: 2,  code: 'CLF-C02',      name: 'AWS Cloud Practitioner',         phase: 'COLLEGE', semester: 'Sem 1',   cost: 9_800,   tier: 'THRESHOLD',     inBudget: true },
  { id: 3,  code: 'Security+',    name: 'CompTIA Security+',              phase: 'COLLEGE', semester: 'Sem 2',   cost: 54_656,  tier: 'THRESHOLD',     inBudget: true },
  { id: 4,  code: 'SAA-C03',      name: 'AWS Solutions Architect Assoc.', phase: 'COLLEGE', semester: 'Sem 3',   cost: 15_000,  tier: 'DIFFERENTIATOR',inBudget: true },
  { id: 5,  code: 'AZ-500',       name: 'Azure Security Engineer',        phase: 'COLLEGE', semester: 'Sem 4',   cost: 15_100,  tier: 'DIFFERENTIATOR',inBudget: true },
  { id: 6,  code: 'GCP-ACE',      name: 'GCP Associate Cloud Engineer',   phase: 'COLLEGE', semester: 'Sem 5',   cost: 13_215,  tier: 'DIFFERENTIATOR',inBudget: true },
  { id: 7,  code: 'SCS-C03',      name: 'AWS Security Specialty',         phase: 'COLLEGE', semester: 'Sem 5',   cost: 28_318,  tier: 'THRESHOLD',     inBudget: true },
  { id: 8,  code: 'CKA',          name: 'Certified Kubernetes Admin',     phase: 'COLLEGE', semester: 'Sem 5-6', cost: 50_000,  tier: 'PREREQUISITE',  inBudget: true },
  { id: 9,  code: 'CKS',          name: 'Certified Kubernetes Security',  phase: 'COLLEGE', semester: 'Sem 6',   cost: 60_885,  tier: 'DIFFERENTIATOR',inBudget: true },
  // Bridge Phase — NOT in ₹39.80L (salary-funded)
  { id: 10, code: 'CCSP',         name: 'Certified Cloud Security Prof.', phase: 'BRIDGE', semester: 'Bridge Yr1', cost: 60_000,  tier: 'THRESHOLD',    inBudget: false },
  { id: 11, code: 'ISO-27001-LI', name: 'ISO 27001 Lead Implementer',    phase: 'BRIDGE', semester: 'Bridge Yr2', cost: 32_000,  tier: 'THRESHOLD',    inBudget: false },
  { id: 12, code: 'GCP-PCSE',     name: 'GCP Professional Cloud Sec.',   phase: 'BRIDGE', semester: 'Bridge Yr2', cost: 20_000,  tier: 'DIFFERENTIATOR',inBudget: false },
  // Post — NOT in ₹39.80L, requires 5yr experience
  { id: 13, code: 'CISSP',        name: 'CISSP',                          phase: 'POST',   semester: 'Post-2035',  cost: 1_50_000, tier: 'DECORATION',  inBudget: false },
]

export const COLLEGE_CERTS_TOTAL  = 2_56_414
export const YEAR3_CERT_SPIKE     = 1_52_418  // GCP-ACE + SCS-C03 + CKA + CKS

// ═══════════════════════════════════════════════════════════════
// PRACTICE PLATFORMS (inside ₹39.80L)
// ═══════════════════════════════════════════════════════════════
export const PLATFORMS = {
  hackTheBox:    { annual: 50_000, years: 4, total: 2_00_000 },
  tryHackMe:     { annual: 4_800,  years: 4, total: 19_200  },
  udemyCoursera: { oneTime: 10_000,           total: 10_000  },
  grandTotal:    2_29_200,
} as const

// ═══════════════════════════════════════════════════════════════
// BOOKS & SETUP (inside ₹39.80L)
// ═══════════════════════════════════════════════════════════════
export const BOOKS_AND_SETUP = {
  books:    7_000,   // Linux, Docker, K8s, Threat Modeling
  setup:    22_500,  // One-time Year 1 setup
  total:    29_500,
} as const

// ═══════════════════════════════════════════════════════════════
// FULL BUDGET PROJECTION SUMMARY
// ═══════════════════════════════════════════════════════════════
export const BUDGET_SUMMARY = {
  totalBudget:      39_80_000,
  sem1Paid:          4_07_500,
  remainingFees:    19_06_000,
  monthlyTotal:      2_88_000,
  cyberBudgetTotal:  4_85_614,  // Certs + HTB + THM + Udemy
  booksSetup:          29_500,
  totalCommitted:   31_16_614,
  headroom:          8_63_386,  // Contingency / cloud credits / misc
} as const

export const SECURITY_DEPOSIT = 30_000  // Refundable May 2030
