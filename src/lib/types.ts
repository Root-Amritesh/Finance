// ─── PAYLOAD FINANCE — Data Types ────────────────────────────────────────────
// All types used across the application. No external imports.

// ── Certification ─────────────────────────────────────────────────────────────

export type CertStatus =
  | 'LOCKED'    // not yet started or accessible
  | 'UPCOMING'  // next in queue — ready to begin study
  | 'STUDYING'  // actively studying
  | 'BOOKED'    // exam date scheduled
  | 'PASSED'    // passed — cost is counted in getTotalSpentInBudget
  | 'FAILED';   // failed — may need to re-book

export type CertType =
  | 'DECORATION'    // good to have, low urgency
  | 'THRESHOLD'     // required for a career-level gate
  | 'DIFFERENTIATOR' // makes résumé stand out against peers
  | 'PREREQUISITE'; // required before another cert (CKA → CKS)

export type CertPhase =
  | 'PHASE_0'  // before Sem 1, optional warm-up (AZ-900)
  | 'SEM_1'
  | 'SEM_2'
  | 'SEM_3'
  | 'SEM_4'
  | 'SEM_5'
  | 'SEM_6'
  | 'BRIDGE_1' // post-graduation, Bridge Year 1
  | 'BRIDGE_2'; // post-graduation, Bridge Year 2 (or post-2035)

export interface Certification {
  id: string;
  code: string;          // e.g. "AZ-900", "Security+", "CKA"
  name: string;          // full official name
  provider: string;      // Microsoft | CompTIA | Amazon Web Services | etc.
  phase: CertPhase;
  semester: string;      // human-readable: "Semester 1", "Phase 0", "Bridge Year 2"
  costINR: number;       // absolute exam cost in whole rupees
  type: CertType;
  status: CertStatus;
  studyHours: number;    // estimated total study hours
  passedDate?: string;   // ISO date string — set when status → PASSED
  attemptDate?: string;  // ISO date string — set when status → BOOKED or FAILED
  notes?: string;
  isBridge: boolean;     // true = post-graduation; NOT counted in ₹39.80L cap
  prerequisiteId?: string; // cert id that must be PASSED first (CKS requires CKA)
}

// ── Scholarship ───────────────────────────────────────────────────────────────

export interface ScholarshipInfo {
  totalAmount: number;     // 76000 — full scholarship across 4 years
  semesterAmount: number;  // 38000 — per semester applied in Year 1 only
  appliesYears: number[];  // [1] — Year 1 (both Sem 1 and Sem 2)
}

// ── Semester Fees ─────────────────────────────────────────────────────────────

export interface FeeComponent {
  label: string;
  amount: number;       // negative = credit/scholarship/discount
  isRefundable: boolean;
  isPaid: boolean;
}

export interface SemesterFee {
  id: string;                                       // e.g. "SEM1_2026"
  label: string;                                    // "Semester 1 – AY2026-27"
  academicYear: string;                             // "AY2026-27"
  semesterNumber: number;                           // 1–8
  status: 'PAID' | 'UPCOMING' | 'PARTIALLY_PAID';
  amountDue: number;   // net amount (after scholarship credits)
  amountPaid: number;  // 0 until markSemesterPaid is called
  dueDate: string;     // ISO date string — approximate due date
  paidDate?: string;   // ISO date string — set when fully paid
  components: FeeComponent[];
  scholarshipApplied: number; // 38000 for Sem 1 and Sem 2, 0 for all others
}

export interface PaymentReceipt {
  documentNumber: string; // G44989 | G44990 | G69500
  date: string;           // ISO date string
  amount: number;
  description: string;
}

// ── Expense Tracking ──────────────────────────────────────────────────────────

export type ExpenseCategory =
  | 'FOOD'
  | 'TRANSPORT'
  | 'MOBILE'
  | 'PERSONAL_CARE'
  | 'MEDICAL'
  | 'STATIONERY'
  | 'CLOTHING'
  | 'SOCIAL'
  | 'MISCELLANEOUS';

export interface ExpenseEntry {
  id: string;
  date: string;                // ISO date string e.g. "2026-09-15"
  category: ExpenseCategory;
  description: string;
  amount: number;              // whole rupees
}

export interface MonthlyExpense {
  id: string;          // "YYYY-MM" e.g. "2026-09"
  month: string;       // "YYYY-MM" — same as id, used as key
  year: number;
  entries: ExpenseEntry[];
  totalSpent: number;  // sum of all entries.amount — recomputed on every mutation
  budget: number;      // always 6000 (MONTHLY_POCKET_MONEY)
}

// ── Savings Goals ─────────────────────────────────────────────────────────────

export interface SavingsContribution {
  id: string;
  date: string;        // ISO date string
  amount: number;
  runningTotal: number; // savedAmount after this contribution
}

/** College laptop — ₹2,50,000 target — tracked SEPARATELY from ₹39.80L cap */
export interface LaptopSavings {
  goal: number;                    // 250000 — fixed; SEPARATE from BUDGET_CEILING
  savedAmount: number;
  monthlyContribution: number;     // user-set monthly saving target
  startDate: string;               // ISO date string
  contributions: SavingsContribution[];
  purchased: boolean;
  purchaseDate?: string;
  purchaseAmount?: number;
}

/**
 * Lab machine — ₹6–8L aspirational goal — OUTSIDE ₹39.80L cap entirely.
 * Funded from internship stipends / freelance income, NOT from ₹6K pocket money.
 * Timeline: Year 2–3 when internship income begins (~2028).
 */
export interface LaptopLabSavings {
  targetMin: number;           // 600000 (₹6L minimum viable spec)
  targetPlan: number;          // 700000 (₹7L target)
  targetMax: number;           // 800000 (₹8L stretch)
  selectedTarget: number;      // user picks from [min, plan, max] — default 700000
  savedAmount: number;
  monthlyContribution: number; // from internship/freelance — NOT from ₹6K pocket envelope
  startDate: string;
  contributions: SavingsContribution[];
  purchased: boolean;
  purchaseDate?: string;
  purchaseAmount?: number;
}

// ── Learning Platforms ────────────────────────────────────────────────────────

export interface PlatformSubscription {
  id: string;
  name: string;
  annualCostINR: number;
  yearsActive: number;
  category: 'LEARNING' | 'TOOLS';
}

// ── Root Store State ──────────────────────────────────────────────────────────

export interface FinanceState {
  // ── Persisted data ─────────────────────────────────────────────────────────
  certifications: Certification[];
  semesters: SemesterFee[];
  monthlyExpenses: MonthlyExpense[];
  laptopSavings: LaptopSavings;        // college laptop — ₹2,50,000 separate goal
  laptopLabSavings: LaptopLabSavings;  // lab machine — ₹6–8L separate aspirational goal
  platforms: PlatformSubscription[];

  // ── Actions ────────────────────────────────────────────────────────────────
  updateCertStatus: (id: string, status: CertStatus, date?: string) => void;
  updateCertNotes: (id: string, notes: string) => void;
  markSemesterPaid: (semId: string, paidDate: string) => void;
  addExpenseEntry: (month: string, entry: Omit<ExpenseEntry, 'id'>) => void;
  deleteExpenseEntry: (month: string, entryId: string) => void;
  addLaptopContribution: (amount: number, date: string) => void;
  markLaptopPurchased: (date: string, amount: number) => void;
  setLaptopMonthlyContribution: (amount: number) => void;
  addLaptopLabContribution: (amount: number, date: string) => void;
  markLaptopLabPurchased: (date: string, amount: number) => void;
  setLaptopLabTarget: (target: 600000 | 700000 | 800000) => void;

  // ── Computed — derived on call; never persisted ─────────────────────────────
  /**
   * PAID semesters + PASSED college certs + logged monthly spend + committed platform costs.
   * Excludes: laptop goals, bridge certs, un-passed certs, books/setup.
   */
  getTotalSpentInBudget: () => number;
  getBudgetRemaining: () => number;   // BUDGET_CEILING − getTotalSpentInBudget()
  getBudgetPercentUsed: () => number; // percentage of ₹39.80L used

  /** Count of PASSED non-bridge certs; total is always 9 college-phase certs */
  getCertProgress: () => { passed: number; total: number; percentComplete: number };

  /** totalSpent for the given "YYYY-MM" month key */
  getMonthlySpend: (month: string) => number;

  /** Laptop savings tracker — goal is always LAPTOP_GOAL (250000) */
  getLaptopProgress: () => {
    saved: number;
    goal: number;
    percent: number;
    etaDate: string | null;
  };

  /** Lab machine tracker — uses selectedTarget (default 700000) */
  getLaptopLabProgress: () => {
    saved: number;
    target: number;
    percent: number;
    etaDate: string | null;
  };

  /**
   * Year 3 certification spike summary.
   * GCP ACE + SCS-C03 + CKA + CKS = ₹1,52,418 in one academic year (AY2028-29).
   */
  getYear3Alert: () => {
    totalCertCost: number;
    breakdown: Record<string, number>;
  };
}