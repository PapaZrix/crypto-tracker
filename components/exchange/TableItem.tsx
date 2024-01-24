import { Exchange } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function TableItem(exchange: Exchange) {
  return (
    <tr className='w-full my-10'>
      <td className='p-4 text-start'>{exchange.trust_score_rank}</td>
      <td className='p-4 flex items-center gap-4 text-start'>
        <Image
          className='rounded'
          src={exchange.image}
          alt={exchange.name}
          width={40}
          height={40}
        />
        <p>{exchange.name}</p>
      </td>
      <td className='p-4 text-center'>{exchange.trust_score}</td>
      <td className='p-4 text-center'>{exchange.country}</td>
      <td className='p-4 text-center'>{exchange.year_established}</td>
      <td className='p-4 text-center'>
        <button className='text-white bg-orange-600 hover:bg-orange-700 rounded p-2'>
          <Link className='text-white no-underline' href={exchange.url}>
            Visit Exchange
          </Link>
        </button>
      </td>
    </tr>
  );
}
