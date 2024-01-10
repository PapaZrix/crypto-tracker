import Link from 'next/link';
import Image from 'next/image';
import type { TrendingCoin } from '@/types';
import Trending from '@/components/coin/Trending';
import SearchForm from '@/components/search/SearchForm';

async function getTrendingCoins() {
  const res = await fetch('https://api.coingecko.com/api/v3/search/trending', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();

  // const coins = data.coins.filter(
  //   (coin: TrendingCoin) => coin.item.data.price[1] !== '0'
  // );
  const coins = data.coins.slice(0, 6);

  return coins;
}

async function getAllCoins() {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en'
  );

  if (!res.ok) throw new Error('Failed to fetch data');

  const coins = await res.json();

  return coins;
}

export default async function Home() {
  const trendingCoins = await getTrendingCoins();
  const allCoins = await getAllCoins();

  return (
    <div className='flex p-4 items-center w-full sm:w-10/12 min-h-[calc(100vh_-_83.26px)] mx-auto text-center sm:text-left gap-4'>
      <div className='flex flex-col flex-1 h-full justify-center'>
        <div className='flex flex-col gap-2 mb-4 sm:mb-0'>
          <h1 className='text-3xl sm:text-5xl max-w-xl mb-2'>
            Find your favorite cryptocurrency and its <br></br>current market
            value
          </h1>
          <h2 className='text-2xl text-gray-400'>
            See historic data for each cryptocurrency
          </h2>
          <div className='text-md flex items-center justify-center text-center gap-2 text-gray-400'>
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
        <SearchForm coins={allCoins} />
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
