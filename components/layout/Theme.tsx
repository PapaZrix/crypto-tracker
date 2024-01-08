'use client';

import { themes } from '@/constants';
import { useTheme } from '@/context/ThemeProvider';
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
        <div className='absolute mt-3 -left-6 bg-gray-100 shadow-lg z-10 rounded border py-3 min-w-32 dark:bg-gray-600 dark:border-gray-600'>
          {themes.map((theme) => (
            <div
              key={theme.value}
              className='flex gap-2 items-center px-2.5 py-2 cursor-pointer'
              onClick={() => {
                setMode(theme.value);
                if (theme.value !== 'system') {
                  localStorage.theme = theme.value;
                } else {
                  localStorage.removeItem('theme');
                }
              }}
            >
              <Image src={theme.img} alt={theme.value} width={16} height={16} />
              <p className='font-semibold text-sm'>{theme.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Theme;
