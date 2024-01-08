'use client';

import { useEffect, useRef } from 'react';

function useOnClickOutside(handler: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [ref, handler]);

  return ref;
}

export default useOnClickOutside;
