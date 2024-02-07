import { TrendingCoin } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

function Trending({ item }: TrendingCoin) {
  return (
    <Link
      href={`/coin/${item.id}`}
      className='hover:scale-105 backface-hidden will-change-transform transition-transform duration-200 ease-in-out'
    >
      <div className='bg-gray-200 p-4 lg:p-3 xl-p-5 2xl:p-8 flex flex-col justify-center sm:justify-between md:gap-0 lg:gap-4 rounded-xl shadow-md dark:bg-gray-800 dark:shadow-orange-500 text-sm md:h-32 lg:h-40 xl:h-44'>
        <div className='flex gap-2 w-full items-center md:flex-col lg:flex-row xl:justify-center 2xl:justify-normal md:h-24 lg:h-32 relative'>
          <Image
            src={item.large}
            alt={item.name}
            width='0'
            height='0'
            sizes='100vw'
            className='md:w-8 lg:w-10 xl:w-12 rounded-full'
          />
          <div className='text-[0.65rem] leading-3 lg:text-xs xl:text-sm'>
            <h2>{item.name}</h2>
            <p>{item.data.price}</p>
          </div>
        </div>
        <div
          className={`flex gap-2 ${
            item.data.price_change_percentage_24h.usd < 0
              ? 'text-red-500'
              : 'text-green-500'
          } items-center w-full ml-2 text-md lg:text-lg xl:text-xl 2xl:text-2xl`}
        >
          {item.data.price_change_percentage_24h.usd > 0 ? (
            <BsArrowUp />
          ) : (
            <BsArrowDown />
          )}
          <p>
            {item.data.price_change_percentage_24h.usd < 0
              ? Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)
              : item.data.price_change_percentage_24h.usd.toFixed(2)}
            %
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Trending;
