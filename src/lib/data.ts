// ─── PAYLOAD FINANCE — Initial Data ──────────────────────────────────────────
// Pre-populated seed data for the Zustand store.
// Every number verified against the financial ground truth in the project brief.

import type {
  Certification,
  SemesterFee,
  LaptopSavings,
  LaptopLabSavings,
  PlatformSubscription,
} from './types';

import {
  CERT_COSTS,
  BRIDGE_CERT_COSTS,
  LAPTOP_GOAL,
  LAPTOP_LAB,
} from './constants';

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS — 13 total (9 college-phase + 4 bridge/post-graduation)
// ─────────────────────────────────────────────────────────────────────────────

export const INITIAL_CERTS: Certification[] = [

  // ─── College Phase — inside ₹39.80L cap ──────────────────────────────────

  {
    id:           'az-900',
    code:         'AZ-900',
    name:         'Microsoft Azure Fundamentals',
    provider:     'Microsoft',
    phase:        'PHASE_0',
    semester:     'Phase 0 (Pre-Semester)',
    costINR:      CERT_COSTS.AZ900,       // ₹9,440
    type:         'DECORATION',
    status:       'UPCOMING',             // Phase 0 — starting now, before college begins
    studyHours:   40,
    isBridge:     false,
  },

  {
    id:           'clf-c02',
    code:         'CLF-C02',
    name:         'AWS Certified Cloud Practitioner',
    provider:     'Amazon Web Services',
    phase:        'SEM_1',
    semester:     'Semester 1',
    costINR:      CERT_COSTS.CLF_C02,    // ₹9,800
    type:         'THRESHOLD',
    status:       'LOCKED',
    studyHours:   40,
    isBridge:     false,
  },

  {
    id:           'security-plus',
    code:         'Security+',
    name:         'CompTIA Security+',
    provider:     'CompTIA',
    phase:        'SEM_2',
    semester:     'Semester 2',
    costINR:      CERT_COSTS.SECURITY_PLUS, // ₹54,656 — most expensive; highest retake risk
    type:         'THRESHOLD',
    status:       'LOCKED',
    studyHours:   100,
    notes:        'Most expensive college cert at ₹54,656 — budget for one attempt and pass first time.',
    isBridge:     false,
  },

  {
    id:           'saa-c03',
    code:         'SAA-C03',
    name:         'AWS Certified Solutions Architect – Associate',
    provider:     'Amazon Web Services',
    phase:        'SEM_3',
    semester:     'Semester 3',
    costINR:      CERT_COSTS.SAA_C03,    // ₹15,000
    type:         'DIFFERENTIATOR',
    status:       'LOCKED',
    studyHours:   80,
    isBridge:     false,
  },

  {
    id:           'az-500',
    code:         'AZ-500',
    name:         'Microsoft Azure Security Technologies',
    provider:     'Microsoft',
    phase:        'SEM_4',
    semester:     'Semester 4',
    costINR:      CERT_COSTS.AZ_500,     // ₹15,100
    type:         'DIFFERENTIATOR',
    status:       'LOCKED',
    studyHours:   80,
    isBridge:     false,
  },

  {
    id:           'gcp-ace',
    code:         'GCP ACE',
    name:         'Google Cloud Associate Cloud Engineer',
    provider:     'Google Cloud',
    phase:        'SEM_5',
    semester:     'Semester 5',
    costINR:      CERT_COSTS.GCP_ACE,   // ₹13,215
    type:         'DIFFERENTIATOR',
    status:       'LOCKED',
    studyHours:   80,
    notes:        'Part of Year 3 cert spike (AY2028-29). Budget ₹1,52,418 across Sem 5–6.',
    isBridge:     false,
  },

  {
    id:           'scs-c03',
    code:         'SCS-C03',
    name:         'AWS Certified Security – Specialty',
    provider:     'Amazon Web Services',
    phase:        'SEM_5',
    semester:     'Semester 5',
    costINR:      CERT_COSTS.SCS_C03,   // ₹28,318
    type:         'THRESHOLD',
    status:       'LOCKED',
    studyHours:   120,
    notes:        'Part of Year 3 cert spike (AY2028-29). Schedule after GCP ACE to avoid overload.',
    isBridge:     false,
  },

  {
    id:           'cka',
    code:         'CKA',
    name:         'Certified Kubernetes Administrator',
    provider:     'CNCF / Linux Foundation',
    phase:        'SEM_5',
    semester:     'Semester 5–6',
    costINR:      CERT_COSTS.CKA,       // ₹50,000
    type:         'PREREQUISITE',
    status:       'LOCKED',
    studyHours:   100,
    notes:        'Must PASS before attempting CKS. Hands-on performance-based exam.',
    isBridge:     false,
  },

  {
    id:           'cks',
    code:         'CKS',
    name:         'Certified Kubernetes Security Specialist',
    provider:     'CNCF / Linux Foundation',
    phase:        'SEM_6',
    semester:     'Semester 6',
    costINR:      CERT_COSTS.CKS,       // ₹60,885
    type:         'DIFFERENTIATOR',
    status:       'LOCKED',
    studyHours:   120,
    notes:        'Requires an active CKA certification. Do not book until CKA is passed.',
    prerequisiteId: 'cka',
    isBridge:     false,
  },

  // ─── Bridge Phase — NOT in ₹39.80L cap; post-graduation, salary-funded ───
  // Displayed in the Certifications roadmap as a muted bridge section.
  // NEVER counted toward BUDGET_CEILING or TOTAL_COMMITTED.

  {
    id:           'ccsp',
    code:         'CCSP',
    name:         'Certified Cloud Security Professional',
    provider:     '(ISC)²',
    phase:        'BRIDGE_1',
    semester:     'Bridge Year 1',
    costINR:      BRIDGE_CERT_COSTS.CCSP,         // ₹60,000 (salary-funded)
    type:         'THRESHOLD',
    status:       'LOCKED',
    studyHours:   150,
    isBridge:     true,
  },

  {
    id:           'iso-27001-li',
    code:         'ISO 27001 LI',
    name:         'ISO/IEC 27001 Lead Implementer',
    provider:     'PECB',
    phase:        'BRIDGE_2',
    semester:     'Bridge Year 2',
    costINR:      BRIDGE_CERT_COSTS.ISO_27001_LI, // ₹32,000 (salary-funded)
    type:         'THRESHOLD',
    status:       'LOCKED',
    studyHours:   60,
    notes:        'Germany-origin compliance cert — critical for EU/international security roles.',
    isBridge:     true,
  },

  {
    id:           'gcp-pcse',
    code:         'GCP PCSE',
    name:         'Google Cloud Professional Cloud Security Engineer',
    provider:     'Google Cloud',
    phase:        'BRIDGE_2',
    semester:     'Bridge Year 2',
    costINR:      BRIDGE_CERT_COSTS.GCP_PCSE,    // ₹20,000 (salary-funded)
    type:         'DIFFERENTIATOR',
    status:       'LOCKED',
    studyHours:   80,
    isBridge:     true,
  },

  {
    id:           'cissp',
    code:         'CISSP',
    name:         'Certified Information Systems Security Professional',
    provider:     '(ISC)²',
    phase:        'BRIDGE_2',
    semester:     'Post-2035',
    costINR:      BRIDGE_CERT_COSTS.CISSP,        // ₹1,50,000 (salary-funded, post-2035)
    type:         'DECORATION',
    status:       'LOCKED',
    studyHours:   300,
    notes:        'Do NOT study for this during college. Requires 5yr verified work experience. Attempting early will result in rejection.',
    isBridge:     true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEMESTER FEES — 8 semesters; Sem 1 fully paid; Sem 2–8 upcoming
// ─────────────────────────────────────────────────────────────────────────────

export const INITIAL_SEMESTERS: SemesterFee[] = [

  // ── Semester 1 AY2026-27 — FULLY CLEARED ──────────────────────────────────
  // ₹4,07,500 paid via 3 receipts (G44989, G44990, G69500)
  // Hostel is ANNUAL charge billed in Sem 1 — covers full AY2026-27.
  {
    id:               'SEM1_2026',
    label:            'Semester 1 – AY2026-27',
    academicYear:     'AY2026-27',
    semesterNumber:   1,
    status:           'PAID',
    amountDue:         407_500,
    amountPaid:        407_500,
    dueDate:          '2026-08-01',
    paidDate:         '2026-06-24', // date of final payment G69500
    scholarshipApplied: 38_000,
    components: [
      {
        label:        'Tuition Fee',
        amount:        190_000,
        isRefundable: false,
        isPaid:       true,
      },
      {
        label:        'Examination Charges',
        amount:          6_000,
        isRefundable: false,
        isPaid:       true,
      },
      {
        label:        'Co-Curricular Charges',
        amount:          3_000,
        isRefundable: false,
        isPaid:       true,
      },
      {
        label:        'Alumni Charges',
        amount:          1_500,
        isRefundable: false,
        isPaid:       true,
      },
      {
        label:        'Security Deposit',
        amount:         30_000,
        isRefundable: true,  // refunded at graduation May 2030
        isPaid:       true,
      },
      {
        label:        'Registration Fee',
        amount:         45_000,
        isRefundable: false,
        isPaid:       true,
      },
      {
        label:        'Admission Scholarship',
        amount:        -38_000, // credit — negative amount
        isRefundable: false,
        isPaid:       true,
      },
      {
        label:        'Hostel Triple Sharing (Annual)',
        amount:        170_000, // annual charge; covers full AY2026-27
        isRefundable: false,
        isPaid:       true,
      },
    ],
    // Verification: 190000+6000+3000+1500+30000+45000−38000+170000 = 4,07,500 ✓
  },

  // ── Semester 2 AY2026-27 — UPCOMING (~Jan 2027) ───────────────────────────
  // Hostel already covered by Sem 1 annual charge.
  // Scholarship applied for the final time.
  {
    id:               'SEM2_2027',
    label:            'Semester 2 – AY2026-27',
    academicYear:     'AY2026-27',
    semesterNumber:   2,
    status:           'UPCOMING',
    amountDue:         161_000,
    amountPaid:          0,
    dueDate:          '2027-01-01',
    scholarshipApplied: 38_000,
    components: [
      {
        label:        'Tuition Fee',
        amount:        190_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Admission Scholarship',
        amount:        -38_000, // final semester of scholarship
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Examination Charges',
        amount:          6_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Co-Curricular Charges',
        amount:          3_000,
        isRefundable: false,
        isPaid:       false,
      },
    ],
    // Verification: 190000−38000+6000+3000 = 1,61,000 ✓
  },

  // ── Semester 3 AY2027-28 Sem 1 — UPCOMING (~Aug 2027) ────────────────────
  // Year 2 tuition = ₹3,90,000/yr → ₹1,95,000/sem
  // Hostel ₹1,70,000 billed with Sem 1 of each academic year
  // NO scholarship from Year 2 onwards
  {
    id:               'SEM3_2027',
    label:            'Semester 3 – AY2027-28',
    academicYear:     'AY2027-28',
    semesterNumber:   3,
    status:           'UPCOMING',
    amountDue:         372_500,
    amountPaid:          0,
    dueDate:          '2027-08-01',
    scholarshipApplied: 0,
    components: [
      {
        label:        'Tuition Fee',
        amount:        195_000, // 3,90,000 ÷ 2 semesters
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Examination Charges',
        amount:          6_000, // 12,000 ÷ 2
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Co-Curricular Charges',
        amount:          1_500, // 3,000 ÷ 2
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Hostel Triple Sharing (Annual)',
        amount:        170_000, // annual charge; covers full AY2027-28
        isRefundable: false,
        isPaid:       false,
      },
    ],
    // Verification: 195000+6000+1500+170000 = 3,72,500 ✓
  },

  // ── Semester 4 AY2027-28 Sem 2 — UPCOMING (~Jan 2028) ────────────────────
  // Hostel already covered by Sem 3 annual charge
  {
    id:               'SEM4_2028',
    label:            'Semester 4 – AY2027-28',
    academicYear:     'AY2027-28',
    semesterNumber:   4,
    status:           'UPCOMING',
    amountDue:         202_500,
    amountPaid:          0,
    dueDate:          '2028-01-01',
    scholarshipApplied: 0,
    components: [
      {
        label:        'Tuition Fee',
        amount:        195_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Examination Charges',
        amount:          6_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Co-Curricular Charges',
        amount:          1_500,
        isRefundable: false,
        isPaid:       false,
      },
    ],
    // Verification: 195000+6000+1500 = 2,02,500 ✓
  },

  // ── Semester 5 AY2028-29 Sem 1 — UPCOMING (~Aug 2028) ────────────────────
  // Year 3 tuition = ₹4,00,000/yr → ₹2,00,000/sem
  // YEAR 3 CERT SPIKE: GCP ACE + SCS-C03 + CKA + CKS = ₹1,52,418 in this academic year
  {
    id:               'SEM5_2028',
    label:            'Semester 5 – AY2028-29',
    academicYear:     'AY2028-29',
    semesterNumber:   5,
    status:           'UPCOMING',
    amountDue:         377_500,
    amountPaid:          0,
    dueDate:          '2028-08-01',
    scholarshipApplied: 0,
    components: [
      {
        label:        'Tuition Fee',
        amount:        200_000, // 4,00,000 ÷ 2 semesters
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Examination Charges',
        amount:          6_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Co-Curricular Charges',
        amount:          1_500,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Hostel Triple Sharing (Annual)',
        amount:        170_000,
        isRefundable: false,
        isPaid:       false,
      },
    ],
    // Verification: 200000+6000+1500+170000 = 3,77,500 ✓
  },

  // ── Semester 6 AY2028-29 Sem 2 — UPCOMING (~Jan 2029) ────────────────────
  {
    id:               'SEM6_2029',
    label:            'Semester 6 – AY2028-29',
    academicYear:     'AY2028-29',
    semesterNumber:   6,
    status:           'UPCOMING',
    amountDue:         207_500,
    amountPaid:          0,
    dueDate:          '2029-01-01',
    scholarshipApplied: 0,
    components: [
      {
        label:        'Tuition Fee',
        amount:        200_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Examination Charges',
        amount:          6_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Co-Curricular Charges',
        amount:          1_500,
        isRefundable: false,
        isPaid:       false,
      },
    ],
    // Verification: 200000+6000+1500 = 2,07,500 ✓
  },

  // ── Semester 7 AY2029-30 Sem 1 — UPCOMING (~Aug 2029) ────────────────────
  // Year 4 tuition = ₹4,00,000/yr → ₹2,00,000/sem
  {
    id:               'SEM7_2029',
    label:            'Semester 7 – AY2029-30',
    academicYear:     'AY2029-30',
    semesterNumber:   7,
    status:           'UPCOMING',
    amountDue:         377_500,
    amountPaid:          0,
    dueDate:          '2029-08-01',
    scholarshipApplied: 0,
    components: [
      {
        label:        'Tuition Fee',
        amount:        200_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Examination Charges',
        amount:          6_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Co-Curricular Charges',
        amount:          1_500,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Hostel Triple Sharing (Annual)',
        amount:        170_000,
        isRefundable: false,
        isPaid:       false,
      },
    ],
    // Verification: 200000+6000+1500+170000 = 3,77,500 ✓
  },

  // ── Semester 8 AY2029-30 Sem 2 — UPCOMING (~Jan 2030) ────────────────────
  // Final semester. Security deposit (₹30,000 in Sem 1) refunded at graduation May 2030.
  {
    id:               'SEM8_2030',
    label:            'Semester 8 – AY2029-30',
    academicYear:     'AY2029-30',
    semesterNumber:   8,
    status:           'UPCOMING',
    amountDue:         207_500,
    amountPaid:          0,
    dueDate:          '2030-01-01',
    scholarshipApplied: 0,
    components: [
      {
        label:        'Tuition Fee',
        amount:        200_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Examination Charges',
        amount:          6_000,
        isRefundable: false,
        isPaid:       false,
      },
      {
        label:        'Co-Curricular Charges',
        amount:          1_500,
        isRefundable: false,
        isPaid:       false,
      },
    ],
    // Verification: 200000+6000+1500 = 2,07,500 ✓
  },

  // ── Cross-check all semesters ─────────────────────────────────────────────
  // SEM1: 4,07,500 (paid)
  // SEM2: 1,61,000
  // SEM3: 3,72,500
  // SEM4: 2,02,500
  // SEM5: 3,77,500
  // SEM6: 2,07,500
  // SEM7: 3,77,500
  // SEM8: 2,07,500
  // Remaining (SEM2–8): 19,06,000 ✓ (matches REMAINING_FEES.TOTAL)
  // Grand total paid + remaining: 4,07,500 + 19,06,000 = 23,13,500
];

// ─────────────────────────────────────────────────────────────────────────────
// LAPTOP SAVINGS — College laptop ₹2,50,000 — SEPARATE from ₹39.80L cap
// ─────────────────────────────────────────────────────────────────────────────

export const INITIAL_LAPTOP: LaptopSavings = {
  goal:                LAPTOP_GOAL,  // 250000 — never changes; separate from cap
  savedAmount:         0,
  monthlyContribution: 0,
  startDate:           '2026-08-01',
  contributions:       [],
  purchased:           false,
};

// ─────────────────────────────────────────────────────────────────────────────
// LAB MACHINE SAVINGS — ₹6–8L aspirational — OUTSIDE ₹39.80L cap entirely
// Source: internship stipends / freelance income (NOT from ₹6K pocket money)
// Timeline: Year 2–3 when internship income begins (~2028)
// ─────────────────────────────────────────────────────────────────────────────

export const INITIAL_LAPTOP_LAB: LaptopLabSavings = {
  targetMin:           LAPTOP_LAB.MIN,   // 600000
  targetPlan:          LAPTOP_LAB.PLAN,  // 700000
  targetMax:           LAPTOP_LAB.MAX,   // 800000
  selectedTarget:      LAPTOP_LAB.PLAN,  // default = plan (₹7L target)
  savedAmount:         0,
  monthlyContribution: 0,
  startDate:           '2026-08-01',
  contributions:       [],
  purchased:           false,
};

// ─────────────────────────────────────────────────────────────────────────────
// LEARNING PLATFORMS — inside ₹39.80L cap; treated as committed from Day 1
// ─────────────────────────────────────────────────────────────────────────────

export const INITIAL_PLATFORMS: PlatformSubscription[] = [
  {
    id:            'htb',
    name:          'Hack The Box',
    annualCostINR:  50_000,  // ₹50,000/year × 4 = ₹2,00,000 total
    yearsActive:    4,
    category:      'LEARNING',
  },
  {
    id:            'thm',
    name:          'TryHackMe',
    annualCostINR:   4_800,  // ₹4,800/year × 4 = ₹19,200 total
    yearsActive:    4,
    category:      'LEARNING',
  },
  {
    id:            'udemy',
    name:          'Udemy + Coursera',
    annualCostINR:   2_500,  // ₹10,000 total ÷ 4 years = ₹2,500/yr for display purposes
    yearsActive:    4,
    category:      'LEARNING',
  },
  // Total 4-year platform spend: (50000+4800)×4 + 10000 = 2,29,200 (PLATFORM_COSTS.FOUR_YEAR_TOTAL)
];