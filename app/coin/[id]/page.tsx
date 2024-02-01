'use client';

import { currencies } from '@/constants';
import TopInfo from '@/components/coin/coin-page/TopInfo';
import { useState, useEffect } from 'react';
import { CoinPageParams, Currency } from '@/types';
import Loader from '@/components/layout/Loader';
import useGraphData from '@/hooks/useGraphData';
import PriceGraph from '@/components/coin/coin-page/PriceGraph';
import HistoryTable from '@/components/coin/coin-page/HistoryTable';
import millify from 'millify';
import PriceInfo from '@/components/coin/coin-page/PriceInfo';
import MarketInfo from '@/components/coin/coin-page/MarketInfo';
import { useRouter } from 'next/navigation';

export default function CoinPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isLoading, graphData, getGraphData } = useGraphData();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [coin, setCoin] = useState<CoinPageParams | null | undefined>(null);
  const [graphRange, setGraphRange] = useState(30);
  const { id } = params;
  const movement =
    Number(coin?.market_data.price_change_percentage_24h_in_currency[selectedCurrency.name ?? '']) >
    0
      ? 'up'
      : 'down';

  useEffect(() => {
    const getCoin = async (id: string) => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
          next: { revalidate: 600 },
        });
        if (!res.ok) return router.push('/404');
        const coin = await res.json();
        setCoin(coin);
      } catch (error) {
        if (error instanceof TypeError) {
          setCoin(undefined);
        }
      }
    };

    getCoin(id);
  }, []);

  useEffect(() => {
    if (
      coin?.market_data.price_change_percentage_7d === 0 ||
      coin?.market_data.price_change_percentage_30d === 0
    ) {
      setGraphRange(1);
      // @ts-ignore
      getGraphData(id, selectedCurrency.name, 1);
    } else {
      // @ts-ignore
      getGraphData(id, selectedCurrency.name, graphRange);
    }
  }, [selectedCurrency, graphRange]);

  const handleCurrencyChange = (event: React.MouseEvent<HTMLLIElement>): void => {
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

  if (coin === undefined) throw new Error('smh');

  if (!coin) {
    return (
      <div className='h-[calc(100vh_-_78px)] sm:h-[calc(100vh_-_83px)] bg-gray-50 dark:bg-gray-900'>
        <Loader />
      </div>
    );
  }
  console.log(coin, graphData);
  return (
    <div className='mt-4 flex flex-col p-4 sm:p-5 w-full lg:w-11/12 xl:w-10/12 2xl:w-9/12 mx-auto'>
      <TopInfo coin={coin} selectedCurrency={selectedCurrency} handleClick={handleCurrencyChange} />
      <div className='w-full my-4 flex flex-col items-center justify-center h-64 sm:h-96'>
        <PriceGraph
          graphData={graphData}
          graphRange={graphRange}
          handleGraphRange={handleGraphRange}
          selectedCurrency={selectedCurrency}
          isLoading={isLoading}
        />
      </div>
      <hr className='mt-4 border-black dark:border-orange-500' />
      <div>
        <h2 className='text-3xl mt-4'>{coin.symbol.toUpperCase()} Price Live Data</h2>
        <p className='mt-4 dark:text-[#B7BDC6]'>
          {coin.name} price is updated every 5 minutes due to API restrictions. The live price of{' '}
          {coin.name} is{' '}
          <span className='font-semibold'>
            {selectedCurrency.symbol}
            {coin.market_data.current_price[selectedCurrency.name ?? '']} (
            {coin.symbol.toUpperCase()} / {selectedCurrency.name?.toUpperCase()})
          </span>{' '}
          with a current market cap of{' '}
          <span className='font-semibold'>
            {selectedCurrency.symbol}
            {millify(coin.market_data.market_cap[selectedCurrency.name ?? ''], {
              precision: 2,
            })}
            .
          </span>{' '}
          {coin.name} is {movement}
          <span
            className={`${
              Number(
                coin.market_data.price_change_percentage_24h_in_currency[
                  selectedCurrency.name ?? ''
                ]
              ) < 0
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            {' '}
            {coin.market_data.price_change_percentage_24h_in_currency[
              selectedCurrency.name ?? ''
            ].toFixed(2)}
            %
          </span>{' '}
          in the last 24 hours with a circulating supply of{' '}
          <span className='font-semibold'>
            {millify(coin.market_data.circulating_supply)} {coin.symbol.toUpperCase()}
          </span>
        </p>
      </div>
      <HistoryTable coin={coin} selectedCurrency={selectedCurrency} />
      <PriceInfo coin={coin} selectedCurrency={selectedCurrency} />
      <MarketInfo coin={coin} selectedCurrency={selectedCurrency} />
      {coin.description.en.length === 0 ? null : (
        <div className='w-full mt-10 mb-2'>
          <h2 className='text-3xl'>
            About {coin.name} ({coin.symbol.toUpperCase()})
          </h2>
          <div
            id='description'
            dangerouslySetInnerHTML={{ __html: coin.description.en }}
            className='mt-3 leading-relaxed whitespace-pre-wrap'
          ></div>
        </div>
      )}
    </div>
  );
}
