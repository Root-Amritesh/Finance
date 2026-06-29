// ─── PAYLOAD FINANCE — Zustand Store ─────────────────────────────────────────
// Persist key: 'payload-finance-v2'
// Only data (certifications, semesters, expenses, savings, platforms) is persisted.
// Actions and computed selectors are recreated fresh on every page load.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  FinanceState,
  Certification,
  CertStatus,
  ExpenseEntry,
  MonthlyExpense,
  SavingsContribution,
} from '../lib/types';

import {
  BUDGET_CEILING,
  MONTHLY_POCKET_MONEY,
  PLATFORM_COSTS,
  YEAR3_CERT_SPIKE,
} from '../lib/constants';

import {
  INITIAL_CERTS,
  INITIAL_SEMESTERS,
  INITIAL_LAPTOP,
  INITIAL_LAPTOP_LAB,
  INITIAL_PLATFORMS,
} from '../lib/data';

import { getETA, generateId } from '../lib/utils';

// ─────────────────────────────────────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────────────────────────────────────

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({

      // ── Initial State ───────────────────────────────────────────────────────
      certifications:  [...INITIAL_CERTS],
      semesters:       [...INITIAL_SEMESTERS],
      monthlyExpenses: [],
      laptopSavings:    { ...INITIAL_LAPTOP },
      laptopLabSavings: { ...INITIAL_LAPTOP_LAB },
      platforms:       [...INITIAL_PLATFORMS],

      // ── Actions ─────────────────────────────────────────────────────────────

      /**
       * Update a cert's status and optionally record the relevant date.
       * PASSED  → sets passedDate
       * BOOKED | STUDYING | FAILED → sets attemptDate
       */
      updateCertStatus: (id: string, status: CertStatus, date?: string) => {
        set((state) => ({
          certifications: state.certifications.map((c): Certification => {
            if (c.id !== id) return c;

            const updates: Partial<Certification> = { status };

            if (status === 'PASSED' && date) {
              updates.passedDate  = date;
            } else if (
              (status === 'BOOKED' || status === 'STUDYING' || status === 'FAILED') &&
              date
            ) {
              updates.attemptDate = date;
            }

            return { ...c, ...updates };
          }),
        }));
      },

      /** Append or replace the notes string on a certification card */
      updateCertNotes: (id: string, notes: string) => {
        set((state) => ({
          certifications: state.certifications.map((c) =>
            c.id === id ? { ...c, notes } : c,
          ),
        }));
      },

      /**
       * Mark a semester as fully paid.
       * Sets status → PAID, amountPaid = amountDue, paidDate, and flips all
       * component isPaid flags to true.
       */
      markSemesterPaid: (semId: string, paidDate: string) => {
        set((state) => ({
          semesters: state.semesters.map((s) => {
            if (s.id !== semId) return s;
            return {
              ...s,
              status:     'PAID' as const,
              amountPaid:  s.amountDue,
              paidDate,
              components:  s.components.map((c) => ({ ...c, isPaid: true })),
            };
          }),
        }));
      },

      /**
       * Add an expense entry to the given "YYYY-MM" month.
       * If no MonthlyExpense exists for that month, one is created with budget = 6000.
       * totalSpent is recomputed from all entries on every write.
       */
      addExpenseEntry: (monthKey: string, entry: Omit<ExpenseEntry, 'id'>) => {
        const newEntry: ExpenseEntry = { ...entry, id: generateId() };

        set((state) => {
          const idx = state.monthlyExpenses.findIndex((m) => m.id === monthKey);

          if (idx >= 0) {
            // Month exists — append and recompute total
            const updated = [...state.monthlyExpenses];
            const month   = { ...updated[idx] };
            month.entries    = [...month.entries, newEntry];
            month.totalSpent = month.entries.reduce((sum, e) => sum + e.amount, 0);
            updated[idx]     = month;
            return { monthlyExpenses: updated };
          }

          // Month doesn't exist yet — create it
          const yearStr = monthKey.split('-')[0] ?? '2026';
          const newMonth: MonthlyExpense = {
            id:         monthKey,
            month:      monthKey,
            year:       parseInt(yearStr, 10),
            entries:    [newEntry],
            totalSpent: newEntry.amount,
            budget:     MONTHLY_POCKET_MONEY,
          };
          return { monthlyExpenses: [...state.monthlyExpenses, newMonth] };
        });
      },

      /**
       * Remove an expense entry by id from the given month.
       * totalSpent is recomputed after removal.
       */
      deleteExpenseEntry: (monthKey: string, entryId: string) => {
        set((state) => {
          const idx = state.monthlyExpenses.findIndex((m) => m.id === monthKey);
          if (idx < 0) return {};

          const updated    = [...state.monthlyExpenses];
          const month      = { ...updated[idx] };
          month.entries    = month.entries.filter((e) => e.id !== entryId);
          month.totalSpent = month.entries.reduce((sum, e) => sum + e.amount, 0);
          updated[idx]     = month;
          return { monthlyExpenses: updated };
        });
      },

      /**
       * Record a deposit toward the college laptop savings goal.
       * Appends a SavingsContribution with the running total.
       */
      addLaptopContribution: (amount: number, date: string) => {
        set((state) => {
          const newSaved = state.laptopSavings.savedAmount + amount;
          const contribution: SavingsContribution = {
            id:           generateId(),
            date,
            amount,
            runningTotal: newSaved,
          };
          return {
            laptopSavings: {
              ...state.laptopSavings,
              savedAmount:   newSaved,
              contributions: [...state.laptopSavings.contributions, contribution],
            },
          };
        });
      },

      /** Mark the college laptop as purchased and lock the savings tracker */
      markLaptopPurchased: (date: string, amount: number) => {
        set((state) => ({
          laptopSavings: {
            ...state.laptopSavings,
            purchased:       true,
            purchaseDate:    date,
            purchaseAmount:  amount,
          },
        }));
      },

      /** Set the recurring monthly amount the user plans to set aside for the laptop */
      setLaptopMonthlyContribution: (amount: number) => {
        set((state) => ({
          laptopSavings: {
            ...state.laptopSavings,
            monthlyContribution: amount,
          },
        }));
      },

      /**
       * Record a deposit toward the lab machine savings goal.
       * Source must be internship / freelance — NOT from ₹6K pocket money.
       */
      addLaptopLabContribution: (amount: number, date: string) => {
        set((state) => {
          const newSaved = state.laptopLabSavings.savedAmount + amount;
          const contribution: SavingsContribution = {
            id:           generateId(),
            date,
            amount,
            runningTotal: newSaved,
          };
          return {
            laptopLabSavings: {
              ...state.laptopLabSavings,
              savedAmount:   newSaved,
              contributions: [...state.laptopLabSavings.contributions, contribution],
            },
          };
        });
      },

      /** Mark the lab machine as purchased */
      markLaptopLabPurchased: (date: string, amount: number) => {
        set((state) => ({
          laptopLabSavings: {
            ...state.laptopLabSavings,
            purchased:      true,
            purchaseDate:   date,
            purchaseAmount: amount,
          },
        }));
      },

      /**
       * Update the selected lab machine target tier.
       * Only 600000 (min), 700000 (plan), or 800000 (max) are valid.
       * getLaptopLabProgress() will use the new selectedTarget immediately.
       */
      setLaptopLabTarget: (target: 600000 | 700000 | 800000) => {
        set((state) => ({
          laptopLabSavings: {
            ...state.laptopLabSavings,
            selectedTarget: target,
          },
        }));
      },

      // ── Computed Selectors ─────────────────────────────────────────────────
      // Derived from current state via get(). Never stored in localStorage.

      /**
       * Running total of money "used" against the ₹39.80L budget cap.
       *
       * Includes:
       *   • amountPaid for all PAID semesters
       *   • costINR for all PASSED non-bridge certifications
       *   • totalSpent across all logged MonthlyExpenses
       *   • PLATFORM_COSTS.FOUR_YEAR_TOTAL (treated as committed from Day 1)
       *
       * Excludes:
       *   • Laptop savings goals (tracked separately outside the cap)
       *   • Bridge certifications (post-graduation, salary-funded)
       *   • Un-passed certifications
       *   • Books & setup (fixed allocation, displayed separately)
       */
      getTotalSpentInBudget: (): number => {
        const state = get();

        const semesterSpend = state.semesters
          .filter((s) => s.status === 'PAID')
          .reduce((sum, s) => sum + s.amountPaid, 0);

        const certSpend = state.certifications
          .filter((c) => c.status === 'PASSED' && !c.isBridge)
          .reduce((sum, c) => sum + c.costINR, 0);

        const expenseSpend = state.monthlyExpenses
          .reduce((sum, m) => sum + m.totalSpent, 0);

        // Platform subscriptions are treated as a committed 4-year block
        const platformSpend = PLATFORM_COSTS.FOUR_YEAR_TOTAL; // 2,29,200

        return semesterSpend + certSpend + expenseSpend + platformSpend;
      },

      /** ₹39,80,000 minus getTotalSpentInBudget() */
      getBudgetRemaining: (): number => {
        return BUDGET_CEILING - get().getTotalSpentInBudget();
      },

      /** Percentage of the ₹39.80L cap consumed (0–100) */
      getBudgetPercentUsed: (): number => {
        return (get().getTotalSpentInBudget() / BUDGET_CEILING) * 100;
      },

      /**
       * Count of PASSED non-bridge certifications.
       * Total college-phase certs = 9 (fixed).
       */
      getCertProgress: (): { passed: number; total: number; percentComplete: number } => {
        const state  = get();
        const passed = state.certifications
          .filter((c) => c.status === 'PASSED' && !c.isBridge)
          .length;
        const total  = 9; // AZ-900 through CKS — college-phase only
        return {
          passed,
          total,
          percentComplete: (passed / total) * 100,
        };
      },

      /** Total rupees spent in a given "YYYY-MM" month key */
      getMonthlySpend: (monthKey: string): number => {
        const month = get().monthlyExpenses.find((m) => m.id === monthKey);
        return month?.totalSpent ?? 0;
      },

      /**
       * College laptop savings status.
       * goal is always LAPTOP_GOAL = ₹2,50,000 (separate from the ₹39.80L cap).
       */
      getLaptopProgress: (): {
        saved:   number;
        goal:    number;
        percent: number;
        etaDate: string | null;
      } => {
        const { savedAmount, goal, monthlyContribution } = get().laptopSavings;
        return {
          saved:   savedAmount,
          goal,
          percent: goal > 0 ? (savedAmount / goal) * 100 : 0,
          etaDate: getETA(goal, savedAmount, monthlyContribution),
        };
      },

      /**
       * Lab machine savings status.
       * Uses selectedTarget (min 600K / plan 700K / max 800K — user-configurable).
       * Entirely outside ₹39.80L cap — funded from internship / freelance income.
       */
      getLaptopLabProgress: (): {
        saved:   number;
        target:  number;
        percent: number;
        etaDate: string | null;
      } => {
        const { savedAmount, selectedTarget, monthlyContribution } =
          get().laptopLabSavings;
        return {
          saved:   savedAmount,
          target:  selectedTarget,
          percent: selectedTarget > 0 ? (savedAmount / selectedTarget) * 100 : 0,
          etaDate: getETA(selectedTarget, savedAmount, monthlyContribution),
        };
      },

      /**
       * Year 3 certification cost spike breakdown.
       * GCP ACE + SCS-C03 + CKA + CKS = ₹1,52,418 in AY2028-29 (Semesters 5–6).
       * Used to render the Year 3 alert banner in the UI.
       */
      getYear3Alert: (): { totalCertCost: number; breakdown: Record<string, number> } => ({
        totalCertCost: YEAR3_CERT_SPIKE.TOTAL, // 152418
        breakdown: {
          'GCP ACE': YEAR3_CERT_SPIKE.GCP_ACE, // 13215
          'SCS-C03': YEAR3_CERT_SPIKE.SCS_C03, // 28318
          'CKA':     YEAR3_CERT_SPIKE.CKA,     // 50000
          'CKS':     YEAR3_CERT_SPIKE.CKS,     // 60885
        },
      }),
    }),

    // ── Persist Config ───────────────────────────────────────────────────────
    {
      name: 'payload-finance-v2',

      /**
       * Only persist the data slices — never functions.
       * Actions and computed selectors are recreated fresh from the store
       * definition on every page load, closing over the new get/set references.
       */
      partialize: (state) => ({
        certifications:  state.certifications,
        semesters:       state.semesters,
        monthlyExpenses: state.monthlyExpenses,
        laptopSavings:   state.laptopSavings,
        laptopLabSavings:state.laptopLabSavings,
        platforms:       state.platforms,
      }),
    },
  ),
);

export default useFinanceStore;