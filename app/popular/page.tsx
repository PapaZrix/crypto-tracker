'use client';

import { TableCoin } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { filters } from '@/constants';
import Loader from '@/components/layout/Loader';
import TableItem from '@/components/popular/TableItem';
import { usePagination } from '@mantine/hooks';
import Image from 'next/image';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const ITEMS_PER_PAGE = 25;

const getCoins = async () => {
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=price_change_percentage&locale=en';
  try {
    const res = await fetch(url, { next: { revalidate: 1200 } });
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
};

export default function PopularTable() {
  const [coins, setCoins] = useState<TableCoin[] | null>([] || null);
  const [visibleCoins, setVisibleCoins] = useState<TableCoin[] | null>([] || null);
  const [activeFilter, setActiveFilter] = useState<any>(filters[2]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const ref = useOnClickOutside(handleClickOutside);

  useEffect(() => {
    const getFirstPageCoins = async () => {
      const coins: any = await getCoins();
      setCoins(coins);
      return setVisibleCoins(coins.slice(0, ITEMS_PER_PAGE));
    };
    getFirstPageCoins();
  }, []);

  const pagination = usePagination({
    total: Math.ceil((coins?.length as number) / ITEMS_PER_PAGE),
    initialPage: 1,
    siblings: 4,
    onChange(page) {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      setVisibleCoins((coins as TableCoin[]).slice(start, end));
    },
  });

  const changePage = (page: number) => {
    pagination.setPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const customSort = (filter: any) => {
    return function (a: any, b: any) {
      // @ts-ignore
      return (b[filter] > a[filter]) - (b[filter] < a[filter]);
    };
  };

  const handleFilterChange = (e: React.MouseEvent<HTMLLIElement>): void => {
    const target = e.currentTarget.id;
    console.log(target);
    const filter = filters.find((f) => f.filter_api === target);
    console.log(filter);

    setCoins((coins as TableCoin[]).sort(customSort(filter?.filter_api)));
    setActiveFilter(filter);
    setVisibleCoins((coins as TableCoin[]).slice(0, ITEMS_PER_PAGE));
    setIsOpen(false);
    changePage(1);
  };

  if (coins === undefined) throw new Error('Too Many Requests');

  if (visibleCoins?.length === 0) {
    return (
      <div className='h-[calc(100vh_-_78px)] sm:h-[calc(100vh_-_83px)] bg-gray-50 dark:bg-gray-900'>
        <Loader />
      </div>
    );
  }

  return (
    <div
      id='container'
      className='h-screen sm:h-auto flex sm:p-5 flex-col w-full 2xl:w-10/12 mx-auto'
    >
      <div className='my-4 relative w-44 ml-auto mr-4 sm:mr-0'>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className='bg-white dark:bg-gray-700 px-3 py-1 flex gap-4 items-center justify-between border dark:border-gray-800 w-full shadow-md cursor-pointer rounded-md'
        >
          Filters
          <Image
            src='/assets/icons/filter.svg'
            width={20}
            height={20}
            alt='filter'
            className='dark:invert'
          />
        </div>
        {isOpen && (
          <div ref={ref}>
            <ul className='w-full absolute top-10 right-0 z-50 border bg-white dark:bg-gray-700 dark:border-gray-500 rounded-md shadow-md'>
              {filters.map((filter) =>
                filter.filter_name === activeFilter.filter_name ? (
                  <li
                    id={filter.filter_api}
                    className='cursor-pointer p-2 text-orange-500 hover:bg-gray-200 hover:dark-bg-gray-700'
                    key={filter.filter_name}
                    onClick={handleFilterChange}
                  >
                    {filter.filter_name}
                  </li>
                ) : (
                  <li
                    className='cursor-pointer p-2 hover:bg-gray-200 hover:dark-bg-gray-700'
                    id={filter.filter_api}
                    key={filter.filter_name}
                    onClick={handleFilterChange}
                  >
                    {filter.filter_name}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
      <div className='w-full overflow-x-scroll sm:overflow-x-clip'>
        <table className='w-full relative text-sm sm:text-base'>
          <thead className='w-full sticky -top-2 z-30 text-center'>
            <tr>
              <th className='text-left w-[20px] left-0 sm:w-[20px] bg-gray-200 dark:bg-gray-700 z-20'>
                #
              </th>
              <th className='text-start max-w-[100px] left-[40px] bg-gray-200 dark:bg-gray-700 z-20'>
                Name
              </th>
              <th className='text-start bg-gray-200 dark:bg-gray-700'>Price</th>
              <th className='bg-gray-200 dark:bg-gray-700'>24h %</th>
              <th className='text-end bg-gray-200 dark:bg-gray-700'>Market Cap</th>
              <th className='text-end bg-gray-200 dark:bg-gray-700'>Total Volume</th>
              <th className='text-end bg-gray-200 dark:bg-gray-700'>Circulating Supply</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-600'>
            {visibleCoins?.map((coin) => {
              return (
                <TableItem
                  key={coin.id}
                  id={coin.id}
                  current_price={coin.current_price}
                  market_cap={coin.market_cap}
                  market_cap_rank={coin.market_cap_rank}
                  name={coin.name}
                  price_change_percentage_24h={coin.price_change_percentage_24h}
                  symbol={coin.symbol}
                  total_supply={coin.total_supply}
                  total_volume={coin.total_volume}
                  image={coin.image}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='my-4 flex items-center justify-center gap-4'>
        <ul className='flex justify-center gap-4 items-center'>
          <li className='cursor-pointer' onClick={() => changePage(pagination.active - 1)}>
            <BsArrowLeft size='1.5rem' />
          </li>
          {pagination.range.map((r) =>
            pagination.active === r ? (
              <li onClick={() => changePage(r)} className='cursor-pointer text-orange-500' key={r}>
                {r}
              </li>
            ) : (
              <li onClick={() => changePage(r as number)} className='cursor-pointer' key={r}>
                {r}
              </li>
            )
          )}
          <li className='cursor-pointer' onClick={() => changePage(pagination.active + 1)}>
            <BsArrowRight size='1.5rem' />
          </li>
        </ul>
      </div>
    </div>
  );
}
