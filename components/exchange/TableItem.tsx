import { Exchange } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function TableItem(exchange: Exchange) {
  return (
    <tr className='w-full my-10 hover:bg-gray-200 dark:hover-bg-gray-700 cursor-pointer'>
      <td className='text-start w-[40px] sticky left-0 sm:w-auto sm:static bg-gray-50 dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent z-10'>
        {exchange.trust_score_rank}
      </td>
      <td className='text-start sticky left-[40px] w-[170px] sm:w-auto sm:static bg-gray-50 dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent z-10'>
        <div className='flex items-center gap-2'>
          <Image
            src={exchange.image}
            alt={exchange.name}
            width={30}
            height={30}
            className='rounded'
          />
          <p className='text-sm sm:text-[16px] font-semibold'>{exchange.name}</p>
        </div>
      </td>
      <td className='text-center font-medium'>{exchange.trust_score}</td>
      <td className='text-center font-medium'>{exchange.country}</td>
      <td className='text-center font-medium'>
        {exchange.year_established == undefined ? 'N/A' : exchange.year_established}
      </td>
      <td className='text-center font-medium'>
        <button className='text-white bg-orange-600 hover:bg-orange-700 rounded p-2'>
          <Link className='text-white no-underline whitespace-nowrap' href={exchange.url}>
            Visit Exchange
          </Link>
        </button>
      </td>
    </tr>
  );
}
