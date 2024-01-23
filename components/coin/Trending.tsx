import Image from 'next/image';
import Link from 'next/link';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';

interface Coin {
  name: string;
  img: string;
  percentage: string;
  price: string;
  id: string;
}

function Trending({ name, img, percentage, price, id }: Coin) {
  return (
    <Link
      href={`/coin/${id}`}
      className='hover:scale-105 transition-transform duration-200 ease-in-out'
    >
      <div className='bg-gray-200 p-4 sm:p-8 flex flex-col justify-center sm:justify-between gap-4 rounded-xl shadow-md dark:bg-gray-800 dark:shadow-orange-500 text-sm h-36 sm:h-44'>
        <div className='flex gap-2 w-full items-center'>
          <Image
            src={img}
            alt={name}
            width='48'
            height='40'
            className='rounded-full'
          />
          <div>
            <h2>{name}</h2>
            <p>${price}</p>
          </div>
        </div>
        <div
          className={`flex gap-2 ${
            percentage[0] === '-' ? 'text-red-500' : 'text-emerald-600'
          } text-2xl items-center w-full ml-2`}
        >
          {Number(percentage) > 0 ? <BsArrowUp /> : <BsArrowDown />}
          <p>
            {percentage[0] === '-'
              ? percentage.slice(1, percentage.length)
              : percentage}
            %
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Trending;
