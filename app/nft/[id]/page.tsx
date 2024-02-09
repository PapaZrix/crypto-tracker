import Image from 'next/image';
import Link from 'next/link';

export default function NftView() {
  return (
    <div className='min-h-[calc(100vh_-_100px)] mt-4 flex flex-col items-center justify-center gap-4 p-4 sm:p-5 w-full lg:w-11/12 xl:w-10/12 2xl:w-9/12 mx-auto'>
      <h2 className='text-2xl font-semibold'>Uh-Oh...</h2>
      <p className='text-lg font-medium'>
        This page is still a work in progress.{' '}
        <span className='underline underline-offset-4'>Check back soon!</span>
      </p>
      <Image src='/assets/images/working.png' width={150} height={150} alt='work in progress' />
      <Link
        href='/'
        className='border p-2 border-orange-500 dark:text-white font-medium animate-pulse hover:text-orange-500'
      >
        Back Home
      </Link>
    </div>
  );
}
