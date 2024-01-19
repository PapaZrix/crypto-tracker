'use client';

import { currencies } from '@/constants';
import TopInfo from '@/components/coin/coin-page/TopInfo';
import { useState, useEffect } from 'react';
import { CoinPageParams, Currency, GraphData } from '@/types';
import Loader from '@/components/layout/Loader';
import useGraphData from '@/hooks/useGraphData';
import PriceGraph from '@/components/coin/coin-page/PriceGraph';

export default function CoinPage({ params }: { params: { id: string } }) {
  const { isLoading, graphData, getGraphData } = useGraphData();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    currencies[0]
  );
  const [coin, setCoin] = useState<CoinPageParams | null>(null);
  const [graphRange, setGraphRange] = useState(30);

  useEffect(() => {
    const getCoin = async (id: string) => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
        next: { revalidate: 600 },
      });
      const coin = await res.json();
      setCoin(coin);
    };

    getCoin(params.id);
  }, []);

  useEffect(() => {
    // @ts-ignore
    getGraphData(params.id, selectedCurrency.name, graphRange);
  }, [selectedCurrency, graphRange]);

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

  const handleGraphRange = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGraphRange(Number(event.currentTarget.value));
  };

  if (!coin) {
    return (
      <div className='h-[calc(100vh_-_78px)] sm:h-[calc(100vh_-_83px)] bg-gray-50 dark:bg-gray-900'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='mt-4 flex flex-col p-5 w-9/12 mx-auto'>
      <TopInfo
        coin={coin}
        selectedCurrency={selectedCurrency}
        handleClick={handleCurrencyChange}
      />
      <div className='my-4 flex flex-col gap-4 items-center h-96'>
        <PriceGraph
          graphData={graphData}
          graphRange={graphRange}
          handleGraphRange={handleGraphRange}
          selectedCurrency={selectedCurrency}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
