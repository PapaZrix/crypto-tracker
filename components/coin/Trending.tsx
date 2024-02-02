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
      <div className='bg-gray-200 p-4 lg:p-3 xl-p-5 2xl:p-8 flex flex-col justify-center sm:justify-between md:gap-0 lg:gap-4 rounded-xl shadow-md dark:bg-gray-800 dark:shadow-orange-500 text-sm xl:h-44 lg:h-36'>
        <div className='flex gap-2 w-full items-center md:flex-col lg:flex-row xl:justify-center 2xl:justify-normal md:h-20 lg:h-32 relative'>
          <Image
            src={img}
            alt={name}
            width='0'
            height='0'
            sizes='100vw'
            className='md:w-8 lg:w-10 xl:w-12 rounded-full'
          />
          <div className='text-[0.65rem] leading-3 lg:text-xs xl:text-sm'>
            <h2>{name}</h2>
            <p>${price}</p>
          </div>
        </div>
        <div
          className={`flex gap-2 ${
            percentage[0] === '-' ? 'text-red-500' : 'text-green-500'
          } items-center w-full ml-2 text-md lg:text-lg xl:text-xl 2xl:text-2xl`}
        >
          {Number(percentage) > 0 ? <BsArrowUp /> : <BsArrowDown />}
          <p>{percentage[0] === '-' ? percentage.slice(1, percentage.length) : percentage}%</p>
        </div>
      </div>
    </Link>
  );
}

export default Trending;
