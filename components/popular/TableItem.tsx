'use client';

import { checkPercentSign } from '@/utils/checkSign';
import Image from 'next/image';
import millify from 'millify';

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
  return (
    <tr className='w-full hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer'>
      <td className=''>{market_cap_rank}</td>
      <td className='flex items-center gap-4'>
        <Image src={image} width={30} height={30} alt={name} /> {name} (
        {symbol.toUpperCase()})
      </td>
      <td className=''>${current_price}</td>
      <td
        className={`${checkPercentSign(
          price_change_percentage_24h
        )} text-center`}
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className='text-end'>{millify(market_cap, { precision: 2 })}</td>
      <td className='text-end'>{millify(total_volume, { precision: 2 })}</td>
      <td className='text-end'>{millify(total_supply, { precision: 2 })}</td>
    </tr>
  );
}
