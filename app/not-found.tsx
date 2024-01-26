import Image from 'next/image';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';

export default function NotFound() {
  return (
    <div className='h-[calc(100vh_-_78px)] sm:h-[calc(100vh_-_81.66px)] flex justify-center items-center flex-col gap-4'>
      <Image src='/assets/images/404.png' alt='sad emoji' width={200} height={150} priority />
      <h1 className='text-2xl font-bold'>No such coin exists</h1>
      <h2 className='text-xl'>You can look up coins in the search bar above</h2>
      <Link className='text-lg header-link flex gap-2 items-center' href='/'>
        <span>
          <BsArrowLeft size='1.5rem' fill='#f97316' />
        </span>
        <p className='text-orange-500'>Go back</p>
      </Link>
    </div>
  );
}
