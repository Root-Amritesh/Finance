// ─── PAYLOAD FINANCE — Constants ─────────────────────────────────────────────
// Single source of financial truth. Every number verified against project brief.
// Never mutate these; import and reference only.

import type { PaymentReceipt } from './types';

// ── Top-Level Budget Parameters ───────────────────────────────────────────────

/** ₹39,80,000 — covers ALL expenses EXCEPT laptop (laptop tracked separately) */
export const BUDGET_CEILING = 3_980_000 as const;

/** ₹6,000/month fixed pocket money from family */
export const MONTHLY_POCKET_MONEY = 6_000 as const;

/** 4 academic years × 12 months */
export const TOTAL_MONTHS = 48 as const;

/**
 * ₹2,50,000 — college laptop savings goal.
 * Tracked SEPARATELY; never counted against BUDGET_CEILING.
 */
export const LAPTOP_GOAL = 250_000 as const;

export const COLLEGE_START = '2026-08-01' as const; // Bennett University
export const COLLEGE_END   = '2030-05-31' as const; // Graduation

/** ₹30,000 security deposit — REFUNDABLE at graduation May 2030 */
export const SECURITY_DEPOSIT = 30_000 as const;

// ── Scholarship (Year 1 only) ─────────────────────────────────────────────────

/** ₹76,000 total scholarship — Year 1 ONLY; not renewed in Year 2+ */
export const SCHOLARSHIP_TOTAL   = 76_000 as const;

/** ₹38,000 per semester (76K / 2) — applied in Sem 1 and Sem 2 only */
export const SCHOLARSHIP_PER_SEM = 38_000 as const;

// ── Semester 1 AY2026-27 — FULLY CLEARED ─────────────────────────────────────

/** ₹4,07,500 — confirmed BU portal; 3 payment receipts */
export const SEM1_PAID = 407_500 as const;

export const SEM1_RECEIPTS: PaymentReceipt[] = [
  {
    documentNumber: 'G44989',
    date:           '2026-04-18',
    amount:          50_000,
    description:    'PAYMENT RECEIVED',
  },
  {
    documentNumber: 'G44990',
    date:           '2026-04-18',
    amount:         100_000,
    description:    'PAYMENT RECEIVED',
  },
  {
    documentNumber: 'G69500',
    date:           '2026-06-24',
    amount:         257_500,
    description:    'AMRITESH KUMAR',
  },
];

// ── Remaining Projected Fees ──────────────────────────────────────────────────

export const REMAINING_FEES = {
  /** Sem 2 AY2026-27: Tuition 1,90,000 − Scholarship 38,000 + Exam 6,000 + Co-curr 3,000 */
  SEM2_Y1:   161_000,

  /** AY2027-28: Academic (Tuition 3,90,000 + Exam 12,000 + Co-curr 3,000) + Hostel 1,70,000 */
  YEAR2:     575_000,

  /** AY2028-29: Academic (Tuition 4,00,000 + Exam 12,000 + Co-curr 3,000) + Hostel 1,70,000 */
  YEAR3:     585_000,

  /** AY2029-30: Academic (Tuition 4,00,000 + Exam 12,000 + Co-curr 3,000) + Hostel 1,70,000 */
  YEAR4:     585_000,

  /** 1,61,000 + 5,75,000 + 5,85,000 + 5,85,000 = 19,06,000 */
  TOTAL:   1_906_000,
} as const;

// ── College Phase Certification Costs (inside ₹39.80L cap) ───────────────────

export const CERT_COSTS = {
  /** ₹9,440 — Microsoft AZ-900. Base exam ₹4,739.50; stored as absolute price incl. buffer. */
  AZ900:            9_440,

  /** ₹9,800 — AWS Cloud Practitioner CLF-C02 */
  CLF_C02:          9_800,

  /** ₹54,656 — CompTIA Security+. Most expensive college cert; highest retake risk. */
  SECURITY_PLUS:   54_656,

  /** ₹15,000 — AWS Solutions Architect Associate SAA-C03 */
  SAA_C03:         15_000,

  /** ₹15,100 — Microsoft Azure Security Technologies AZ-500 */
  AZ_500:          15_100,

  /** ₹13,215 — Google Cloud Associate Cloud Engineer */
  GCP_ACE:         13_215,

  /** ₹28,318 — AWS Certified Security – Specialty SCS-C03 */
  SCS_C03:         28_318,

  /** ₹50,000 — Certified Kubernetes Administrator */
  CKA:             50_000,

  /** ₹60,885 — Certified Kubernetes Security Specialist */
  CKS:             60_885,

  /**
   * ₹2,56,414 — Sum of all 9 college-phase certs.
   * 9440 + 9800 + 54656 + 15000 + 15100 + 13215 + 28318 + 50000 + 60885 = 2,56,414
   */
  COLLEGE_TOTAL:  256_414,
} as const;

// ── Bridge Phase Certification Costs (NOT in ₹39.80L — post-graduation) ──────

export const BRIDGE_CERT_COSTS = {
  /** ₹60,000 — (ISC)² CCSP — Bridge Year 1 — salary-funded */
  CCSP:            60_000,

  /** ₹32,000 — PECB ISO 27001 Lead Implementer — Bridge Year 2 (Germany compliance) */
  ISO_27001_LI:    32_000,

  /** ₹20,000 — Google Cloud Professional Cloud Security Engineer — Bridge Year 2 */
  GCP_PCSE:        20_000,

  /**
   * ₹1,50,000 — (ISC)² CISSP — Post-2035 ONLY.
   * Requires 5 years of verified paid work experience.
   * Do NOT pursue early; the exam will be rejected without the experience.
   */
  CISSP:          150_000,
} as const;

// ── Learning Platform Subscriptions (inside ₹39.80L cap) ─────────────────────

export const PLATFORM_COSTS = {
  /** ₹50,000/year — Hack The Box annual subscription */
  HTB_ANNUAL:      50_000,

  /** ₹4,800/year — TryHackMe annual subscription */
  THM_ANNUAL:       4_800,

  /** ₹10,000 — Udemy + Coursera one-time allocation */
  UDEMY_ONETIME:   10_000,

  /**
   * ₹2,29,200 — Total 4-year platform spend.
   * (50,000 + 4,800) × 4 + 10,000 = 2,29,200
   */
  FOUR_YEAR_TOTAL: 229_200,
} as const;

// ── CYBER BUDGET — Named Allocation Block (inside ₹39.80L) ───────────────────
// Single source of truth for ALL cyber/learning spend within the budget cap.
// This block is referenced in the UI's budget allocation display.

export const CYBER_BUDGET = {
  /** 9 college-phase certs — see CERT_COSTS.COLLEGE_TOTAL */
  COLLEGE_CERTS:   256_414,

  /** HTB ₹50,000/year × 4 years */
  HTB_4YR:         200_000,

  /** TryHackMe ₹4,800/year × 4 years */
  THM_4YR:          19_200,

  /** One-time Udemy + Coursera allocation */
  UDEMY_TOTAL:      10_000,

  /**
   * ₹4,85,614 — THE NAMED CYBER BLOCK TOTAL.
   * 2,56,414 + 2,00,000 + 19,200 + 10,000 = 4,85,614
   */
  TOTAL:           485_614,
} as const;

// ── Lab Machine — Aspirational Goal (OUTSIDE ₹39.80L — self-funded) ──────────
// Fund from internship stipends / freelance income — NOT from ₹6K pocket money.
// Begin Year 2–3 when internship income starts (~2028).
// IN_FAMILY_BUDGET = false → NEVER deduct from BUDGET_CEILING under any circumstances.

export const LAPTOP_LAB = {
  MIN:               600_000, // ₹6L — minimum viable spec (heavy VM + SIEM baseline)
  PLAN:              700_000, // ₹7L — target (4+ concurrent VMs, full homelab)
  MAX:               800_000, // ₹8L — stretch goal
  SOURCE:            'Internship stipends / freelance income — NOT family budget',
  TIMELINE:          'Year 2–3 when internship income begins (~2028)',
  IN_FAMILY_BUDGET:  false as const,
} as const;

// ── Books & Study Setup (inside ₹39.80L) ─────────────────────────────────────

export const BOOKS_AND_SETUP = {
  /** Linux, Docker, K8s, Threat Modeling reference books */
  BOOKS:           7_000,

  /** Year 1 one-time hardware/accessories/setup costs */
  ONE_TIME_SETUP:  22_500,

  /** ₹29,500 total */
  TOTAL:           29_500,
} as const;

// ── Year 3 Certification Spike Alert ─────────────────────────────────────────
// GCP ACE + SCS-C03 + CKA + CKS all land in Semesters 5–6 (AY2028-29).
// Requires advance planning and dedicated savings from Day 1.

export const YEAR3_CERT_SPIKE = {
  GCP_ACE:  13_215,
  SCS_C03:  28_318,
  CKA:      50_000,
  CKS:      60_885,

  /** ₹1,52,418 — total cert spend in a single academic year */
  TOTAL:   152_418,

  WARNING: 'GCP ACE + SCS-C03 + CKA + CKS = ₹1,52,418 in ONE academic year. Plan from Day 1.',
} as const;

// ── Full 4-Year Budget Summary ────────────────────────────────────────────────

/**
 * ₹31,16,614 — total of all committed spending within the ₹39.80L cap.
 * Breakdown:
 *   Sem 1 paid:            ₹4,07,500
 *   Remaining fees:       ₹19,06,000
 *   Monthly (₹6K × 48):   ₹2,88,000
 *   Cyber budget:          ₹4,85,614
 *   Books & setup:            ₹29,500
 *   ─────────────────────────────────
 *   Total:                ₹31,16,614
 */
export const TOTAL_COMMITTED = 3_116_614 as const;

/**
 * ₹8,63,386 — budget headroom for contingency, cloud credits, misc.
 * BUDGET_CEILING (39,80,000) − TOTAL_COMMITTED (31,16,614) = 8,63,386
 */
export const BUDGET_HEADROOM = 863_386 as const;

// ── Expense Category Display Config ──────────────────────────────────────────

export const EXPENSE_CATEGORIES = {
  FOOD: {
    label: 'Food & Canteen',
    color: '#34D399',
    bg:    'rgba(52,211,153,0.10)',
  },
  TRANSPORT: {
    label: 'Transport',
    color: '#60A5FA',
    bg:    'rgba(96,165,250,0.10)',
  },
  MOBILE: {
    label: 'Mobile & Internet',
    color: '#A78BFA',
    bg:    'rgba(167,139,250,0.10)',
  },
  PERSONAL_CARE: {
    label: 'Personal Care',
    color: '#F472B6',
    bg:    'rgba(244,114,182,0.10)',
  },
  MEDICAL: {
    label: 'Medical',
    color: '#F87171',
    bg:    'rgba(248,113,113,0.10)',
  },
  STATIONERY: {
    label: 'Stationery',
    color: '#FDE047',
    bg:    'rgba(253,224,71,0.10)',
  },
  CLOTHING: {
    label: 'Clothing',
    color: '#FB923C',
    bg:    'rgba(251,146,60,0.10)',
  },
  SOCIAL: {
    label: 'Social',
    color: '#22D3EE',
    bg:    'rgba(34,211,238,0.10)',
  },
  MISCELLANEOUS: {
    label: 'Misc',
    color: '#94A3B8',
    bg:    'rgba(148,163,184,0.10)',
  },
} as const;