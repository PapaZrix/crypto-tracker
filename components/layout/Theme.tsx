'use client';

import { themes } from '@/constants';
import { useTheme } from 'next-themes';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Loader from './Loader';

const Theme = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const ref = useOnClickOutside(handleClickOutside);

  if (!mounted) return <Loader />;

  return (
    <div className='relative' ref={ref}>
      <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        {theme === 'light' || theme === 'system' ? (
          <Image
            src='/assets/icons/sun.svg'
            width={20}
            height={20}
            alt='sun'
            className='active-theme'
          />
        ) : (
          <Image
            src='/assets/icons/moon.svg'
            width={20}
            height={20}
            alt='moon'
            className='active-theme'
          />
        )}
      </div>
      {isOpen && (
        <div className='absolute top-7 -left-14 sm:top-9 sm:-left-10 bg-gray-100 shadow-lg z-10 rounded border min-w-32 dark:bg-gray-600 dark:border-gray-600'>
          {themes.map((mode) => (
            <div
              key={mode.value}
              className='flex gap-2 items-center p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500'
              onClick={() => {
                setTheme(mode.value);
                setIsOpen(false);
              }}
            >
              <Image
                src={mode.img}
                alt={mode.value}
                width={16}
                height={16}
                className={`${theme === mode.value && 'active-theme'}`}
              />
              <p
                className={`font-semibold text-sm ${
                  theme === mode.value && 'text-orange-500'
                }`}
              >
                {mode.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Theme;
