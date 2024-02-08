'use client';

import Countdown from '@/components/layout/Countdown';
import Link from 'next/link';
import { useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [counter, setCounter] = useState(0);

  return (
    <div className='h-[calc(100vh_-_78px)] sm:h-[calc(100vh_-_83px)] flex items-center justify-center flex-col'>
      <h2 className='text-2xl'>Too Many Requests</h2>
      <p className='text-lg'>The API has a per minute request restriction</p>
      <p>(5-10 requests per minute)</p>
      <div className='flex gap-4 mt-4'>
        <button
          className={`p-2 border text-green-600 ${
            counter >= 100 && 'animate-bounce border-green-600'
          }`}
          onClick={() => location.reload()}
        >
          Try again
        </button>
        <Link className='p-2 border' href='/'>
          Back Home
        </Link>
      </div>
      <Countdown counter={counter} setCounter={setCounter} />
    </div>
  );
}
