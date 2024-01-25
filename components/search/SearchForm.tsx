'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { SearchCoin as Coin } from '@/types';

function SearchForm({ coins }: { coins: Coin[] }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = () => {
    setIsOpen(false);
    setQuery('');
  };

  const ref = useOnClickOutside(handleClickOutside);

  const matchingCoins =
    query.length !== 0
      ? coins.filter((coin) =>
          coin.name.toLowerCase().includes(query.toLowerCase())
        )
      : null;

  return (
    <>
      <div className='flex gap-2 items-center font-normal'>
        <div
          className='hidden sm:flex bg-white sm:bg-gray-100 gap-2 items-center w-full sm:w-52 border sm:p-2 text-black rounded-xl dark:bg-gray-700 dark:border-gray-500 dark:text-gray-400 cursor-pointer'
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Image
            src='/assets/icons/search.svg'
            alt='search'
            width={20}
            height={10}
          />
          <p>Search</p>
        </div>
        <Image
          src='/assets/icons/search.svg'
          alt='search'
          width={20}
          height={10}
          className='sm:hidden'
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </div>
      {isOpen && (
        <div
          ref={ref}
          className='bg-white sm:bg-gray-100 fixed sm:absolute top-0 sm:-top-2 left-0 z-50 sm:rounded-xl w-full h-full font-normal sm:shadow-md sm:dark:shadow-orange-500 dark:bg-[#222531] dark:sm:bg-gray-700 flex flex-col gap-2 sm:h-64 mt-0 sm:mt-2 sm:p-2 border dark:sm:border-gray-500'
        >
          <div className='flex gap-2 items-center p-4 sm:p-2 sm:border-b-2 dark:border-gray-600 mobile-shadow sm:shadow-none w-full'>
            <Image
              src='/assets/icons/search.svg'
              alt='search'
              width={20}
              height={10}
            />
            <div className='flex-grow'>
              <input
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search coin (Bitcoin, Ethereum..)'
                className='bg-white sm:bg-gray-100 w-full px-1 focus:outline-none text-black rounded-xl dark:bg-[#222531] dark:sm:bg-gray-700 dark:text-white'
                value={query}
                autoFocus
              />
            </div>
            <Image
              src='/assets/icons/close.svg'
              alt='close'
              width={22.5}
              height={10}
              onClick={() => setIsOpen(!isOpen)}
              className='cursor-pointer dark:invert'
            />
          </div>
          <div className='p-2 sm:p-0 flex flex-col my-2 overflow-y-scroll scrollbar-thin'>
            {matchingCoins?.map((coin) => (
              <Link
                key={coin.id}
                href={`/coin/${coin.id}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div
                  key={coin.id}
                  className='py-2 px-2 sm:py-2 sm:px-1 text-sm rounded-md flex justify-between items-center hover:bg-gray-200 hover:dark:bg-gray-600'
                >
                  <div className='flex items-center gap-2 justify-between sm:justify-normal w-full'>
                    <div className='flex items-center gap-2'>
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={30}
                        height={20}
                      />
                      <p className='font-bold'>{coin.name}</p>
                      <p className='text-gray-400'>
                        {coin.symbol.toUpperCase()}
                      </p>
                    </div>
                    <p className='text-gray-400'>#{coin.market_cap_rank}</p>
                  </div>
                  <div className='hidden sm:flex gap-2 mr-2'>
                    <p>${coin.current_price}</p>
                    <p
                      className={`${
                        coin.price_change_percentage_24h < 0
                          ? 'text-red-500'
                          : 'text-emerald-600'
                      }`}
                    >
                      {coin.price_change_percentage_24h < 0
                        ? Number(
                            coin.price_change_percentage_24h.toString().slice(1)
                          ).toFixed(2)
                        : coin.price_change_percentage_24h.toFixed(2)}
                      %
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchForm;
