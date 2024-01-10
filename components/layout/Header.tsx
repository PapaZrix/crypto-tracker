import Image from 'next/image';
import React from 'react';
import Theme from './Theme';
import Link from 'next/link';
import MobileNav from './MobileNav';

const Header = () => {
  return (
    <header className='sticky md:relative top-0 z-50 shadow-sm bg-white dark:bg-gray-900 border-b-[1px] dark:border-orange-500 font-semibold'>
      <nav className='p-3 w-11/12 sm:p-5 sm:w-10/12 mx-auto flex justify-between items-center'>
        <Link href='/' className='flex gap-2 items-center'>
          <Image
            src='/assets/images/logo.png'
            alt='logo'
            width={40}
            height={30}
          />
          <p className='sm:block font-semibold text-2xl sm:text-4xl font-poppins'>
            Crypto<span className='text-orange-500'>Tracker</span>
          </p>
        </Link>
        <div className='flex gap-8 sm:gap-4 items-center'>
          <ul className='hidden sm:flex gap-4 text-xl items-center'>
            <li className='cursor-pointer hover:text-orange-500 transition-all duration-200 flex gap-1'>
              <Image
                src='/assets/icons/fire.svg'
                alt='popular'
                width={25}
                height={10}
                className='dark:invert'
              />
              <Link href='/popular'>Popular</Link>
            </li>
            <li className='cursor-pointer hover:text-orange-500 transition-all duration-200 flex gap-1'>
              <Image
                src='/assets/icons/exchanges.svg'
                alt='popular'
                width={25}
                height={10}
                className='dark:invert'
              />
              <Link href='/exchanges'>Exchanges</Link>
            </li>
          </ul>
          <Theme />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Header;
