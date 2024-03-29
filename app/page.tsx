import Link from 'next/link';
import Image from 'next/image';
import type { TrendingCoin } from '@/types';
import Coin from '@/components/trending/Coin';
import Trending from '@/components/trending/Trending';

async function getTrending() {
  const res = await fetch('https://api.coingecko.com/api/v3/search/trending', {
    next: { revalidate: 600 },
  });

  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();

  const coins = data.coins
    .filter((coin: TrendingCoin) => coin.item.data.price.length < 10)
    .slice(0, 6);

  const nfts = data.nfts;

  return { coins, nfts };
}

export default async function Home() {
  const trending = await getTrending();

  return (
    <div className='flex p-4 items-center w-full md:w-11/12 lg:w-10/12 min-h-[calc(100vh_-_83.26px)] mx-auto text-center sm:text-left gap-6 xl:gap-4 justify-center'>
      <div className='flex flex-col flex-1 h-full justify-center items-center'>
        <div className='flex flex-col gap-2 mb-4 sm:mb-0'>
          <h1 className='text-3xl lg:text-5xl 2xl:text-[3.5rem] mb-2'>
            Find your favorite cryptocurrency and its current market value
          </h1>
          <h2 className='text-lg sm:block lg:text-2xl 2xl:text-3xl'>
            Charts and market movement available
          </h2>
          <h3 className='sm:block lg:text-xl 2xl:text-2xl text-gray-400'>
            See historic data for every cryptocurrency
          </h3>
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
                className='w-28 xl:w-1/5 2xl:w-1/6 sm:mx-0'
              />
            </Link>
          </div>
        </div>
      </div>
      <div className='w-full h-full flex-1 justify-center items-center hidden sm:flex flex-col gap-2'>
        <Trending coins={trending.coins} nfts={trending.nfts} />
      </div>
    </div>
  );
}
