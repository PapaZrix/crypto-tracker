import Image from 'next/image';
import React from 'react';
import Theme from './Theme';
import Link from 'next/link';
import MobileNav from './MobileNav';
import SearchForm from '../search/SearchForm';
import { sidebarLinks } from '@/constants';

async function getAllCoins() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en',
    { next: { revalidate: 2400 } }
  );

  if (!res.ok) throw new Error('Failed to fetch data');

  const coins = await res.json();

  return coins;
}

const Header = async () => {
  const coins = await getAllCoins();

  return (
    <header className='sticky md:relative top-0 z-40 shadow-sm bg-white dark:bg-gray-900 border-b-[1px] dark:border-orange-500'>
      <nav className='px-4 py-2 sm:p-5 w-full md:w-11/12 2xl:w-10/12 mx-auto flex justify-between items-center relative'>
        <Link href='/' className='flex gap-2 items-center'>
          <Image src='/assets/images/logo.png' alt='logo' width={40} height={30} />
          <p className='sm:block font-semibold text-2xl sm:text-4xl font-poppins'>
            Crypto<span className='text-orange-500'>Tracker</span>
          </p>
        </Link>
        <div className='hidden sm:flex gap-4 items-center relative'>
          <ul className='hidden sm:flex gap-4 text-xl items-center'>
            {sidebarLinks.map((link) => (
              <Link key={link.value} href={link.route}>
                <li className='cursor-pointer flex gap-1 hover:text-orange-500 transition-all duration-200'>
                  <Image
                    src={link.img}
                    alt={link.value}
                    width={25}
                    height={10}
                    className='dark:invert'
                  />
                  <p>{link.value}</p>
                </li>
              </Link>
            ))}
          </ul>
          <Theme />
          <SearchForm coins={coins} />
        </div>
        <div className='flex sm:hidden gap-4 items-center'>
          <SearchForm coins={coins} />
          <Theme />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Header;
