import Image from 'next/image';
import React from 'react';
import Theme from './Theme';

const Header = () => {
  return (
    <header className='bg-white dark:bg-gray-700 dark:text-white'>
      <nav className='p-2 sm:p-5 w-11/12 sm:w-10/12 mx-auto flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <Image
            src='/assets/images/logo.png'
            alt='logo'
            width={40}
            height={30}
          />
          <h1 className='text-3xl sm:text-4xl'>Crypto Tracker</h1>
        </div>
        <ul className='hidden sm:flex gap-4 text-xl items-center'>
          <li className='cursor-pointer hover:text-orange-600 transition-all duration-200'>
            Popular
          </li>
          <li className='cursor-pointer hover:text-orange-600 transition-all duration-200'>
            Exchanges
          </li>
          <li>
            <Theme />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
