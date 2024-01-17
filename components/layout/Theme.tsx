'use client';

import { themes } from '@/constants';
import { useTheme } from '@/providers/ThemeProvider';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Image from 'next/image';
import { useState } from 'react';

const Theme = () => {
  const { mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const ref = useOnClickOutside(handleClickOutside);

  return (
    <div className='relative' ref={ref}>
      <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        {mode === 'light' ? (
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
          {themes.map((theme) => (
            <div
              key={theme.value}
              className='flex gap-2 items-center p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-500'
              onClick={() => {
                setMode(theme.value);
                if (theme.value !== 'system') {
                  localStorage.theme = theme.value;
                } else {
                  localStorage.removeItem('theme');
                }
                setIsOpen(false);
              }}
            >
              <Image
                src={theme.img}
                alt={theme.value}
                width={16}
                height={16}
                className={`${mode === theme.value && 'active-theme'}`}
              />
              <p
                className={`font-semibold text-sm ${
                  mode === theme.value && 'text-orange-500'
                }`}
              >
                {theme.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Theme;
