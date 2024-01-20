'use client';

import { TableCoin } from '@/types';
import { useEffect, useState } from 'react';
import { filters } from '@/constants';
import Loader from '@/components/layout/Loader';
import TableItem from '@/components/popular/TableItem';
import { getCoins } from '@/utils/getCoins';

const ITEMS_PER_PAGE = 20;

export default function PopularTable() {
  const [coins, setCoins] = useState<TableCoin[] | null>([] || null);
  const [visibleCoins, setVisibleCoins] = useState<TableCoin[] | null>(
    [] || null
  );
  const [activeFilter, setActiveFilter] = useState<any>(filters[2]);

  useEffect(() => {
    const getFirstPageCoins = async () => {
      const coins: any = await getCoins();
      setCoins(coins);
      return setVisibleCoins(coins.slice(0, ITEMS_PER_PAGE));
    };
    getFirstPageCoins();
  }, []);

  if (visibleCoins?.length === 0) {
    return (
      <div className='h-[calc(100vh_-_78px)] sm:h-[calc(100vh_-_83px)] bg-gray-50 dark:bg-gray-900'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='flex p-5 flex-col w-9/12 mx-auto'>
      <div className='w-full'>
        <table className='w-full'>
          <thead className='border rounded bg-gray-200 dark:bg-gray-700'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
              <th className='text-end'>Market Cap</th>
              <th className='text-end'>Total Volume</th>
              <th className='text-end'>Circulating Supply</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-500'>
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
    </div>
  );
}
