'use client';

import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export interface PaymentReceiptProps {
  id:     string;
  amount: number;
  date:   string;
  delay?: number;
}

export function PaymentReceipt({ id, amount, date, delay = 0 }: PaymentReceiptProps) {
  const formattedDate = format(parseISO(date), 'd MMM yyyy');

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={{ x: 2 }}
      className="group flex flex-col gap-1.5 rounded-lg border-l-2 border-[var(--accent-neon)] bg-[rgba(255,255,255,0.02)] px-4 py-3 transition-all duration-300 hover:bg-[rgba(57,255,20,0.04)] hover:shadow-[0_0_18px_rgba(57,255,20,0.08)] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs sm:text-sm">
        <span className="font-bold text-[var(--accent-neon)]">{id}</span>
        <span className="text-[var(--text-muted)]">{formattedDate}</span>
        <span className="font-bold text-[var(--text-primary)]">{formatINR(amount)}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <CheckCircle2 size={13} className="text-[var(--accent-neon)]" strokeWidth={2.5} />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--accent-neon)]">
          Confirmed
        </span>
      </div>
    </motion.div>
  );
}

export default PaymentReceipt;