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
      <div className='bg-gray-200 lg:p-3 xl:p-8 flex flex-col justify-center sm:justify-between gap-4 rounded-xl shadow-md dark:bg-gray-800 dark:shadow-orange-500 text-sm xl:h-44 lg:h-36'>
        <div className='flex gap-2 w-full items-center h-32 relative'>
          <Image
            src={img}
            alt={name}
            width='0'
            height='0'
            sizes='100vw'
            className='lg:w-10 xl:w-12 rounded-full'
          />
          <div className='lg:text-xs xl:text-sm'>
            <h2 className='lg:text-xs xl:text-sm'>{name}</h2>
            <p>${price}</p>
          </div>
        </div>
        <div
          className={`flex gap-2 ${
            percentage[0] === '-' ? 'text-red-500' : 'text-green-500'
          } items-center w-full ml-2 lg:text-lg xl:text-2xl`}
        >
          {Number(percentage) > 0 ? <BsArrowUp /> : <BsArrowDown />}
          <p>{percentage[0] === '-' ? percentage.slice(1, percentage.length) : percentage}%</p>
        </div>
      </div>
    </Link>
  );
}

export default Trending;
