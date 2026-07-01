'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { animate } from 'framer-motion';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';

export interface RadialGaugeProps {
  percentage:  number;
  color:       string;
  size?:       number;
  barSize?:    number;
  trackColor?: string;
  duration?:   number;
  children?:   ReactNode;
}

export function RadialGauge({
  percentage,
  color,
  size       = 160,
  barSize    = 14,
  trackColor = 'rgba(255,255,255,0.05)',
  duration   = 1.2,
  children,
}: RadialGaugeProps) {
  const target = Math.min(100, Math.max(0, percentage));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [target, duration]);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="72%"
          outerRadius="100%"
          barSize={barSize}
          data={[{ name: 'gauge', value: display, fill: color }]}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <RadialBar
            background={{ fill: trackColor }}
            dataKey="value"
            cornerRadius={barSize / 2}
            isAnimationActive={false}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {children && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

export default RadialGauge;