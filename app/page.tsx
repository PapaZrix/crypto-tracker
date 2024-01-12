import Link from 'next/link';
import Image from 'next/image';
import type { GlobalMarketData, TrendingCoin } from '@/types';
import Trending from '@/components/coin/Trending';
import millify from 'millify';

async function getTrendingCoins() {
  const res = await fetch('https://api.coingecko.com/api/v3/search/trending', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();

  const coins = data.coins.slice(0, 6);

  return coins;
}

async function getGlobalMarketData() {
  const res = await fetch('https://api.coingecko.com/api/v3/global', {
    next: { revalidate: 600 },
  });

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();

  return data;
}

export default async function Home() {
  const trendingCoins = await getTrendingCoins();
  const globalMarketData: GlobalMarketData = await getGlobalMarketData();
  const movement =
    globalMarketData.data.market_cap_change_percentage_24h_usd > 0
      ? 'increase'
      : 'decrease';

  return (
    <div className='flex p-4 items-center w-full sm:w-10/12 min-h-[calc(100vh_-_83.26px)] mx-auto text-center sm:text-left gap-4 justify-center'>
      <div className='flex flex-col flex-1 h-full justify-center items-center'>
        <div className='flex flex-col gap-2 mb-4 sm:mb-0'>
          <h1 className='text-4xl sm:text-6xl mb-2'>
            Find your favorite cryptocurrency and its current market value
          </h1>
          <h2 className='text-4xl'>Charts and market movement available</h2>
          <h3 className='text-3xl text-gray-400'>
            See historic data for every cryptocurrency
          </h3>
          <p className='text-xl text-gray-400'>
            The global crypto market cap is $
            {millify(globalMarketData.data.total_market_cap.usd, {
              precision: 2,
            })}
            , a{' '}
            <span
              className={
                globalMarketData.data.market_cap_change_percentage_24h_usd > 0
                  ? 'text-emerald-600'
                  : 'text-red-500'
              }
            >
              {' '}
              {globalMarketData.data.market_cap_change_percentage_24h_usd.toFixed(
                2
              )}
              %
            </span>{' '}
            {movement} over the last day
          </p>
          <div className='text-md sm:text-lg flex items-center justify-center text-center gap-2 text-gray-400'>
            <h2 className='whitespace-nowrap w-full text-right sm:text-left sm:w-auto'>
              Powered by{' '}
            </h2>
            <Link href='https://www.coingecko.com' className='w-full'>
              <Image
                src='/assets/images/coingecko.png'
                alt='coingecko logo'
                width='120'
                height='120'
                className='w-32 sm:w-1/5 sm:mx-0'
              />
            </Link>
          </div>
        </div>
      </div>
      <div className='w-full h-full flex-1 justify-center items-center hidden sm:flex'>
        {/* <h2 className="text-2xl">Trending</h2> */}
        <div className='grid grid-cols-3 grid-rows-2 gap-4'>
          {trendingCoins.slice(0, 6).map((coin: TrendingCoin) => {
            return (
              <Trending
                key={coin.item.name}
                img={coin.item.large}
                name={coin.item.name}
                percentage={Number(
                  coin.item.data.price_change_percentage_24h.usd
                ).toFixed(2)}
                price={Number(coin.item.data.price.slice(1)).toFixed(4)}
                id={coin.item.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
