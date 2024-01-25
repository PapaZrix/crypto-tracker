'use client';

import { checkPercentSign } from '@/utils/checkSign';
import Image from 'next/image';
import millify from 'millify';
import { useRouter } from 'next/navigation';

type TableItemProps = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  total_supply: number;
  market_cap_rank: number;
};

export default function TableItem({
  id,
  name,
  symbol,
  current_price,
  image,
  price_change_percentage_24h,
  market_cap,
  total_volume,
  total_supply,
  market_cap_rank,
}: TableItemProps) {
  const router = useRouter();
  return (
    <tr
      onClick={() => router.push(`/coin/${id}`)}
      className='w-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
    >
      <td className='w-[40px] sticky left-0 sm:w-auto sm:static bg-gray-50 dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent z-10'>
        {market_cap_rank}
      </td>
      <td className='flex items-center gap-4 sticky left-[40px] w-[175px] sm:w-full sm:static bg-gray-50 dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent z-10'>
        <Image src={image} width={30} height={30} alt={name} />
        <div className='flex flex-col items-start flex-wrap gap-1 w-auto overflow-hidden sm:flex-row'>
          <p className='text-sm sm:text-base font-semibold'>{name}</p>
          <p className='text-sm sm:text-base'>({symbol.toUpperCase()})</p>
        </div>
      </td>
      <td className='font-medium'>${current_price}</td>
      <td
        className={`${checkPercentSign(
          price_change_percentage_24h
        )} text-center`}
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className='text-end font-medium'>
        {millify(market_cap, { precision: 2 })}
      </td>
      <td className='text-end font-medium'>
        {millify(total_volume, { precision: 2 })}
      </td>
      <td className='text-end font-medium'>
        {millify(total_supply, { precision: 2 })} {symbol.toUpperCase()}
      </td>
    </tr>
  );
}
