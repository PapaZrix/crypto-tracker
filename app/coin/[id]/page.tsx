'use client';

import { currencies } from '@/constants';
import TopInfo from '@/components/coin/coin-page/TopInfo';
import { useState, useEffect, useMemo } from 'react';
import { CoinPageParams, Currency, GraphData } from '@/types';
import Loader from '@/components/layout/Loader';

export default function CoinPage({ params }: { params: { id: string } }) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    currencies[0]
  );
  const [coin, setCoin] = useState<CoinPageParams | null>(null);

  useEffect(() => {
    const getCoin = async (id: string) => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      const coin = await res.json();
      setCoin(coin);
    };

    getCoin(params.id);
  }, []);

  const handleCurrencyChange = (
    event: React.MouseEvent<HTMLLIElement>
  ): void => {
    const currency = event.currentTarget.textContent;
    setSelectedCurrency({
      ...selectedCurrency,
      name: currency?.slice(0, 3).toLowerCase(),
      symbol: currency?.slice(6),
    });
  };

  const handleGraphRange = () => {};

  if (!coin) {
    return (
      <div className='h-[calc(100vh_-_78px)] sm:h-[calc(100vh_-_83px)] bg-gray-50 dark:bg-gray-900'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='flex flex-col p-5 w-10/12 mx-auto'>
      <TopInfo
        coin={coin}
        selectedCurrency={selectedCurrency}
        handleClick={handleCurrencyChange}
      />
    </div>
  );
}
