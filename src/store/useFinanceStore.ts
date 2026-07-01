'use client';

import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import { LAPTOP_LAB } from '@/lib/constants';
import type {
  CertStatusEntry,
  CertStatusValue,
  Contribution,
  Expense,
  ExpenseCategory,
} from '@/types';

// ── State shapes ──────────────────────────────────────────────────────

interface LaptopCollegeState {
  saved:         number;
  contributions: Contribution[];
}

interface LaptopLabState {
  saved:              number;
  contributions:      Contribution[];
  selectedTarget:     number;
}

interface NewExpenseInput {
  amount:   number;
  category: ExpenseCategory;
  note:     string;
  date?:    string;
}

interface PersistedState {
  expenses:             Expense[];
  laptopCollegeSavings: LaptopCollegeState;
  laptopLabSavings:     LaptopLabState;
  certStatuses:         CertStatusEntry[];
}

interface FinanceState extends PersistedState {
  addExpense:                  (expense: NewExpenseInput) => void;
  removeExpense:               (id: string) => void;
  addLaptopCollegeContribution:(amount: number) => void;
  addLaptopLabContribution:    (amount: number) => void;
  setLaptopLabTarget:          (target: number) => void;
  setCertStatus:               (certId: string, status: CertStatusValue) => void;
}

// ── Defaults ──────────────────────────────────────────────────────────

const DEFAULT_CERT_STATUSES: CertStatusEntry[] = [
  { certId: 'az900',   status: 'in-progress' },
  { certId: 'clfc02',  status: 'upcoming'    },
  { certId: 'secplus', status: 'locked'      },
  { certId: 'saac03',  status: 'locked'      },
  { certId: 'az500',   status: 'locked'      },
  { certId: 'gcpace',  status: 'locked'      },
  { certId: 'scsc03',  status: 'locked'      },
  { certId: 'cka',     status: 'locked'      },
  { certId: 'cks',     status: 'locked'      },
];

function genId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

// SSR-safe storage: localStorage only exists in the browser
const noopStorage: StateStorage = {
  getItem:    () => null,
  setItem:    () => undefined,
  removeItem: () => undefined,
};

// ── Store ─────────────────────────────────────────────────────────────

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      expenses:             [],
      laptopCollegeSavings: { saved: 0, contributions: [] },
      laptopLabSavings:     { saved: 0, contributions: [], selectedTarget: LAPTOP_LAB.PLAN },
      certStatuses:         DEFAULT_CERT_STATUSES,

      addExpense: (input) =>
        set((state) => ({
          expenses: [
            {
              id:       genId(),
              amount:   input.amount,
              category: input.category,
              note:     input.note,
              date:     input.date ?? new Date().toISOString(),
            },
            ...state.expenses,
          ],
        })),

      removeExpense: (id) =>
        set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),

      addLaptopCollegeContribution: (amount) =>
        set((state) => ({
          laptopCollegeSavings: {
            saved: state.laptopCollegeSavings.saved + amount,
            contributions: [
              { id: genId(), amount, date: new Date().toISOString() },
              ...state.laptopCollegeSavings.contributions,
            ],
          },
        })),

      addLaptopLabContribution: (amount) =>
        set((state) => ({
          laptopLabSavings: {
            ...state.laptopLabSavings,
            saved: state.laptopLabSavings.saved + amount,
            contributions: [
              { id: genId(), amount, date: new Date().toISOString() },
              ...state.laptopLabSavings.contributions,
            ],
          },
        })),

      setLaptopLabTarget: (target) =>
        set((state) => ({
          laptopLabSavings: { ...state.laptopLabSavings, selectedTarget: target },
        })),

      setCertStatus: (certId, status) =>
        set((state) => ({
          certStatuses: state.certStatuses.map((e) =>
            e.certId === certId ? { ...e, status } : e
          ),
        })),
    }),
    {
      name:       'payload-finance-v2',
      storage:    createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : noopStorage
      ),
      partialize: (state): PersistedState => ({
        expenses:             state.expenses,
        laptopCollegeSavings: state.laptopCollegeSavings,
        laptopLabSavings:     state.laptopLabSavings,
        certStatuses:         state.certStatuses,
      }),
    }
  )
);