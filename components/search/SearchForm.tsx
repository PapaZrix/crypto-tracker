'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import type { SearchCoin as Coin } from '@/types';
import { useRouter } from 'next/navigation';

export default function SearchForm({ coins }: { coins: Coin[] }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const matchingCoins = useMemo(() => {
    return query.length !== 0
      ? coins.filter((coin) => coin.name.toLowerCase().includes(query.toLowerCase()))
      : null;
  }, [query, coins]);

  const handleClickOutside = () => {
    setIsOpen(false);
    setQuery('');
  };

  const ref = useOnClickOutside(handleClickOutside);

  const setChange = () => {
    const selected = listRef.current?.children.item(active);
    if (selected) {
      selected.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      setActive(0);
    }

    if (matchingCoins && matchingCoins.length > 0) {
      switch (e.key) {
        case 'ArrowUp':
          return active === 0 ? null : setActive(active - 1);
        case 'Tab':
          e.preventDefault();
          return active + 1 === matchingCoins.length ? null : setActive(active + 1);
        case 'ArrowDown':
          return active + 1 === matchingCoins.length ? null : setActive(active + 1);
        case 'Enter':
          setIsOpen(false);
          setQuery('');
          setActive(0);
          return router.push(`/coin/${matchingCoins[active].id}`);
      }
    }
  };

  return (
    <>
      <div className='flex gap-2 items-center font-normal'>
        <div
          className='hidden lg:flex bg-white sm:bg-gray-100 gap-2 items-center w-full sm:w-52 border h-10 sm:p-2 text-black rounded-xl dark:bg-gray-700 dark:border-gray-500 dark:text-gray-400 cursor-pointer shadow-md dark:shadow-sm dark:shadow-orange-500'
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Image src='/assets/icons/search.svg' alt='search' width={20} height={10} />
          <p>Search</p>
        </div>
        <Image
          src='/assets/icons/search.svg'
          alt='search'
          width={20}
          height={10}
          className='lg:hidden cursor-pointer'
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </div>
      {isOpen && (
        <div
          ref={ref}
          className='bg-white sm:bg-gray-100 fixed sm:absolute top-0 sm:-top-2 left-0 z-50 sm:rounded-xl w-full h-full font-normal sm:shadow-md sm:dark:shadow-orange-500 dark:bg-[#222531] dark:sm:bg-gray-800 flex flex-col gap-2 sm:h-64 mt-0 sm:mt-2 sm:p-2 dark:sm:border-gray-500'
        >
          <div className='flex gap-2 items-center p-4 sm:p-2 sm:border-b-2 dark:border-gray-600 mobile-shadow sm:shadow-none w-full'>
            <Image src='/assets/icons/search.svg' alt='search' width={20} height={10} />
            <div className='flex-grow'>
              <input
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder='Search coin (Bitcoin, Ethereum..)'
                className='bg-white sm:bg-gray-100 w-full px-1 focus:outline-none text-black rounded-xl dark:bg-[#222531] dark:sm:bg-gray-800 dark:text-white'
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
          <ul
            ref={listRef}
            className='p-2 sm:p-0 flex flex-col my-2 overflow-y-scroll scrollbar-none'
          >
            {matchingCoins?.map((coin, index) => {
              setChange();
              return (
                <li
                  key={coin.id}
                  className={`${
                    index === active ? 'bg-gray-200 dark:bg-gray-600 active' : 'transparent'
                  } last:mb-8 py-2 px-2 sm:text-[0.65rem] sm:py-2 sm:px-1 lg:text-sm rounded-xl hover:bg-gray-200 hover:dark:bg-gray-600`}
                >
                  <Link
                    href={`/coin/${coin.id}`}
                    onClick={() => setIsOpen(!isOpen)}
                    className='flex justify-between items-center'
                  >
                    <div className='flex items-center gap-2 justify-between sm:justify-normal w-full'>
                      <div className='flex items-center gap-2'>
                        <Image
                          className='rounded-full'
                          src={coin.image}
                          alt={coin.name}
                          width={30}
                          height={20}
                        />
                        <p className='font-bold whitespace-nowrap'>{coin.name}</p>
                        <p className='text-gray-400'>{coin.symbol.toUpperCase()}</p>
                      </div>
                      <p className='text-gray-400'>#{coin.market_cap_rank}</p>
                    </div>
                    <div className='hidden sm:flex gap-2 mr-2'>
                      <p>${coin.current_price}</p>
                      <p
                        className={`${
                          coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'
                        }`}
                      >
                        {coin.price_change_percentage_24h < 0
                          ? Number(coin.price_change_percentage_24h.toString().slice(1)).toFixed(2)
                          : coin.price_change_percentage_24h.toFixed(2)}
                        %
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className='hidden sm:flex items-center justify-between text-[0.6rem] lg:text-xs px-2 lg:px-4 py-2 absolute bottom-0 left-0 bg-gray-200 dark:bg-gray-700 w-full rounded-b-xl'>
            <div className='flex items-center gap-1 text-gray-600 dark:text-gray-300'>
              <div className='px-1 lg:px-3 py-1 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-white font-semibold'>
                ESC
              </div>
              To Cancel
            </div>
            <div className='flex items-center gap-1 text-gray-600 dark:text-gray-300'>
              <div className='px-1 lg:px-3 py-1 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-white font-semibold'>
                ENTER
              </div>
              To View
            </div>
            <div className='flex items-center gap-1 text-gray-600 dark:text-gray-300'>
              <div className='px-1 lg:px-3 py-1 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-white font-semibold'>
                TAB
              </div>
              <div className='px-1 lg:px-3 py-1 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-white font-semibold'>
                ↑
              </div>
              <div className='px-1 lg:px-3 py-1 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-white font-semibold'>
                ↓
              </div>
              To Navigate
            </div>
          </div>
        </div>
      )}
    </>
  );
}
