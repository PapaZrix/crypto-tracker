'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

type Coin = {
  name: string;
  id: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
};

function SearchForm({ coins }: { coins: Coin[] }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = () => {
    setIsOpen(false);
    setQuery('');
  };

  const focusRef = useOnClickOutside(handleClickOutside);

  const matchingCoins =
    query.length !== 0
      ? coins.filter((coin) =>
          coin.name.toLowerCase().includes(query.toLowerCase())
        )
      : null;

  return (
    <>
      <div className='mt-4 flex gap-2 items-center w-full relative'>
        <div
          className='bg-gray-100 flex gap-2 items-center w-8/12 border p-3 mb-2 text-black rounded-xl dark:bg-gray-700 dark:border-gray-500 dark:text-gray-400 cursor-pointer'
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
        {isOpen && (
          <div
            ref={focusRef}
            className='bg-gray-100 absolute -top-2 z-50 rounded-xl w-full dark:bg-gray-700 flex flex-col gap-2 h-52 mt-2 p-2 border dark:border-gray-500'
          >
            <div className='flex gap-2 items-center p-1'>
              <Image
                src='/assets/icons/search.svg'
                alt='search'
                width={20}
                height={10}
              />
              <input
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search coin (Bitcoin, Ethereum..)'
                className='bg-gray-100 w-full px-1 focus:outline-none text-black rounded-xl dark:bg-gray-700  dark:text-white'
                value={query}
                autoFocus
              />
            </div>
            <div className='flex flex-col my-2 overflow-auto'>
              {matchingCoins?.map((coin) => (
                <Link key={coin.id} href={`/coin/${coin.id}`}>
                  <div
                    key={coin.id}
                    className='py-2 px-1 rounded-md flex justify-between items-center hover:bg-gray-200 hover:dark:bg-gray-600'
                  >
                    <div className='flex items-center gap-2'>
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={30}
                        height={20}
                      />
                      <p>{coin.name}</p>
                      <p className='text-gray-400'>
                        {coin.symbol.toUpperCase()}
                      </p>
                      <p className='text-gray-400'>#{coin.market_cap_rank}</p>
                    </div>
                    <div className='flex gap-2'>
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
                              coin.price_change_percentage_24h
                                .toString()
                                .slice(1)
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
      </div>
    </>
  );
}

export default SearchForm;
