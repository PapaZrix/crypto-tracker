'use client';

import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';

type NavContentProps = {
  isOpen: boolean;
  handleClick: MouseEventHandler<HTMLImageElement>;
};

function NavContent({ isOpen, handleClick }: NavContentProps) {
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-3/4 h-full bg-white shadow-lg transform ${
          !isOpen && '-translate-x-full'
        } transition-transform duration-300 ease-in-out dark:bg-gray-700`}
      >
        <div className='flex w-full justify-between'>
          <Link href='/' className='p-3 flex gap-2 items-center'>
            <Image
              src='/assets/images/logo.png'
              alt='logo'
              width={40}
              height={30}
            />
            <p className='font-semibold text-2xl font-poppins'>
              Crypto<span className='text-orange-500'>Tracker</span>
            </p>
          </Link>
          <Image
            src='/assets/icons/close.svg'
            alt='close'
            width={30}
            height={30}
            onClick={handleClick}
            className='cursor-pointer dark:invert mr-2'
          />
        </div>
        <div className='h-full mt-6 p-6 flex flex-col gap-2'>
          {sidebarLinks.map((link) => (
            <Link
              key={link.value}
              href={link.route}
              className='flex gap-2 items-center'
            >
              <Image
                src={link.img}
                alt={link.value}
                width={40}
                height={30}
                className='dark:invert'
              />
              <p>{link.value}</p>
            </Link>
          ))}
        </div>
      </div>
      <div
        id='blurOverlay'
        className={`fixed inset-0 bg-black bg-opacity-25 z-30 ${
          isOpen ? 'block' : 'hidden'
        }`}
      ></div>
    </>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div className='sm:hidden'>
      <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'>
        <Image
          src='/assets/icons/hamburger.svg'
          alt='menu button'
          width={30}
          height={30}
          className='dark:invert sm:hidden'
        />
      </div>
      <NavContent isOpen={isOpen} handleClick={handleClick} />
    </div>
  );
}

export default MobileNav;
