'use client';

import { useEffect, useState } from 'react';

const INCREMENTS = 100;
const TIME_IN_SECONDS = 60;
const INTERVAL = (TIME_IN_SECONDS * 1000) / INCREMENTS;
const MINUTE_IN_MILLISECONDS = 60000;

type CountdownProps = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

export default function Countdown({ counter, setCounter }: CountdownProps) {
  useEffect(() => {
    const startTime = new Date().getTime();
    const timer: any = setInterval(() => {
      setCounter((prevCount) => prevCount + 1);
      console.log(new Date().getTime() - startTime);
      if (new Date().getTime() - startTime > MINUTE_IN_MILLISECONDS) {
        clearInterval(timer);
        return;
      }
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='w-1/3 mt-6'>
      <div
        className={`rounded-full h-6 bg-gray-300 ${
          counter < INCREMENTS && 'animate-pulse duration-300'
        }`}
      >
        <span
          className={`block rounded-full bg-orange-500 max-w-[100%] h-full`}
          style={{ width: `${counter}%` }}
        ></span>
      </div>
      {counter === INCREMENTS && (
        <p className='w-full h-12 mt-2 text-center'>
          API should be ready now. Click the{' '}
          <span className='bold underline underline-offset-4'>Try Again</span> button
        </p>
      )}
    </div>
  );
}
