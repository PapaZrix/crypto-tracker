'use client';

import { useEffect } from 'react';

const INCREMENTS = 100;
const TIME_IN_SECONDS = 60;
const INTERVAL = (TIME_IN_SECONDS * 1000) / INCREMENTS;

type CountdownProps = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

export default function Countdown({ counter, setCounter }: CountdownProps) {
  useEffect(() => {
    const timer: any = setInterval(() => {
      if (counter >= INCREMENTS) {
        clearInterval(timer);
        return;
      }
      setCounter((prevCount) => prevCount + 1);
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
    </div>
  );
}
