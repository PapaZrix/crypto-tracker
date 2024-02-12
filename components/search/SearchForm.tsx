'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { SearchCoin } from '@/types';
import { useRouter } from 'next/navigation';
import NavigationTooltip from './Navigation';
import { formatPrice } from '@/lib/utils';

interface Nft {
  id: string;
  name: string;
  symbol: string;
  type: 'nft';
}

interface Coin extends SearchCoin {
  type: 'coin';
}

type SearchFormParams = {
  data: {
    coins: Coin[];
    nfts: Nft[];
  };
};

type Asset = Coin | Nft;

const isCoin = (asset: Asset): asset is Coin => {
  return asset.type === 'coin';
};

export default function SearchForm({ data }: SearchFormParams) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleOpenSearch = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === '/') {
        setIsOpen(true);
        setQuery('');
      }
    };

    // @ts-ignore
    window.addEventListener('keydown', handleOpenSearch);
    // @ts-ignore
    return () => window.removeEventListener('keydown', handleOpenSearch);
  });

  const filterResults = (array: Asset[], input: string) => {
    return array.filter((item) => {
      if (input.length !== 0) {
        if (isCoin(item)) {
          return item.name.toLowerCase().includes(input.toLowerCase());
        } else {
          return item.name.toLowerCase().includes(input.toLowerCase());
        }
      }
    });
  };

  const matchingCoins: any = useMemo(() => filterResults(data.coins, query), [data.coins, query]);
  const matchingNFts: any = useMemo(() => filterResults(data.nfts, query), [data.nfts, query]);

  const handleClickOutside = () => {
    setIsOpen(false);
    setQuery('');
  };

  const ref = useOnClickOutside(handleClickOutside);

  const setChange = () => {
    const selected = listRef.current?.querySelector(`[data-index='${active}']`);
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

    const matchingItems = [...matchingCoins, ...matchingNFts];

    if (matchingItems && matchingItems.length > 0) {
      switch (e.key) {
        case 'ArrowUp':
          setChange();
          return active === 0 ? null : setActive(active - 1);
        case 'Tab':
          e.preventDefault();
        // setChange();
        // return active + 1 === matchingItems.length ? null : setActive(active + 1);
        case 'ArrowDown':
          setChange();
          return active + 1 === matchingItems.length ? null : setActive(active + 1);
        case 'Enter':
          setIsOpen(false);
          setQuery('');
          // @ts-ignore
          if (matchingItems[active].image === undefined) {
            return router.push(`/nft/${matchingItems[active].id}`);
          }
          return router.push(`/coin/${matchingItems[active].id}`);
      }
    }
  };

  return (
    <>
      <div className='flex gap-2 items-center font-normal'>
        <div
          className='hidden lg:flex justify-between bg-white sm:bg-gray-100 gap-2 items-center w-full lg:w-52 2xl:w-60 border h-10 sm:p-2 text-black rounded-xl dark:bg-gray-700 dark:border-gray-500 dark:text-gray-400 cursor-pointer shadow-md dark:shadow-sm dark:shadow-orange-500'
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div className='flex gap-2'>
            <Image src='/assets/icons/search.svg' alt='search' width={20} height={10} />
            <p>Search</p>
          </div>
          <div>
            <span className='px-2 py-[0.15rem] rounded-md text-gray-500 bg-gray-300 dark:bg-gray-500 dark:text-gray-300'>
              /
            </span>
          </div>
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
          className='bg-white sm:bg-gray-100 fixed sm:absolute top-0 sm:-top-2 left-0 z-50 sm:rounded-xl w-full h-full font-normal sm:shadow-md sm:dark:shadow-orange-500 dark:bg-[#222531] dark:sm:bg-gray-800 flex flex-col gap-2 sm:h-64 2xl:h-80 mt-0 sm:mt-2 sm:p-2 dark:sm:border-gray-500'
        >
          <div className='flex gap-2 items-center p-4 sm:p-2 sm:border-b-2 dark:border-gray-600 mobile-shadow sm:shadow-none w-full'>
            <Image src='/assets/icons/search.svg' alt='search' width={20} height={10} />
            <div className='flex-grow'>
              <input
                onChange={(e) => {
                  if (e.target.value === '/') {
                    setQuery('');
                  } else {
                    setQuery(e.target.value);
                    setActive(0);
                  }
                }}
                onKeyDown={handleKeyDown}
                placeholder='Search coin (Bitcoin, Ethereum...)'
                className='bg-white sm:bg-gray-100 w-full px-1 focus:outline-none text-black rounded-xl dark:bg-[#222531] dark:sm:bg-gray-800 dark:text-white'
                value={query === '/' ? '' : query}
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
            <h2
              className={`${
                matchingCoins.length === 0 && 'hidden'
              } pl-2 mb-2 text-gray-600 dark:text-gray-400`}
            >
              Cryptoassets
            </h2>
            {matchingCoins.map((coin: Coin, index: number) => (
              <li
                key={coin.id}
                data-index={index}
                className={`${
                  index === active ? 'bg-gray-200 dark:bg-gray-700 active' : 'transparent'
                } py-2 px-2 sm:text-[0.65rem] sm:py-2 sm:px-1 lg:text-sm rounded-xl hover:bg-gray-200 hover:dark:bg-gray-600`}
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
                    <p>${formatPrice(coin.current_price)}</p>
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
            ))}
            <h2
              className={`${
                matchingNFts.length === 0 && 'text-gray-100 dark:text-gray-800'
              } pl-2 my-2 text-gray-700 dark:text-gray-400`}
            >
              NFTs
            </h2>
            {matchingNFts.map((nft: Nft, index: number) => (
              <li
                data-index={index + matchingCoins.length}
                className={`last:mb-8 py-2 px-4 sm:text-[0.65rem] sm:py-2 lg:text-sm rounded-xl hover:bg-gray-200 hover:dark:bg-gray-600 ${
                  index + matchingCoins.length === active
                    ? 'bg-gray-200 dark:bg-gray-600 active'
                    : ''
                }`}
                key={nft.id}
              >
                {nft.name}
              </li>
            ))}
          </ul>
          <NavigationTooltip />
        </div>
      )}
    </>
  );
}
