'use client';

import { useEffect, useState } from 'react';

/**
 * Returns false on first render (SSR + hydration), then true.
 * Gate any Zustand-persisted state reads on this to prevent
 * hydration mismatch warnings when localStorage differs from server defaults.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return mounted;
}

export default useMounted;