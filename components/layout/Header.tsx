import Image from 'next/image';
import React from 'react';
import Theme from './Theme';
import Link from 'next/link';
import MobileNav from './MobileNav';
import SearchForm from '../search/SearchForm';
import { sidebarLinks } from '@/constants';

async function getData() {
  const fetchPromises = [
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en'
    ),
    fetch(
      '  https://api.coingecko.com/api/v3/nfts/list?order=market_cap_native_desc&per_page=250&page=1'
    ),
  ];

  const [res1, res2] = await Promise.all(fetchPromises);

  const coins = await res1.json();
  const nfts = await res2.json();
  return { coins, nfts };
}

const Header = async () => {
  const data = await getData();

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
          <SearchForm data={data} />
        </div>
        <div className='flex sm:hidden gap-4 items-center'>
          <SearchForm data={data} />
          <Theme />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Header;
