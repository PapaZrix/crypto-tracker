export default function Loading() {
  return (
    <div className='w-full 2xl:w-11/12 3xl:w-10/12 mx-auto flex min-h-screen flex-col items-center p-2 md:p-4 xl:p-4'>
      <section className='w-full flex flex-col gap-4 lg:grid lg:grid-cols-2 xl:px-0 lg:py-2 h-full'>
        <div className='w-full flex flex-col gap-4 lg:p-4 mt-3 h-[350px] lg:h-[700px]'>
          <div className='w-full h-[350px] lg:h-[380px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
          <div className='w-full lg:h-[150px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
        </div>
        <hr className='border-b-[1px] lg:mb-2 border-orange-500 w-full lg:hidden mx-auto border-x-0 border-t-0 ' />
        <div className='w-full lg:mt-8 lg:h-[700px] rounded-md flex flex-col gap-6'>
          <div className='w-full h-[350px] lg:h-[200px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
          <div className='w-full h-[350px] lg:h-[200px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
          <div className='w-full h-[350px] lg:h-[200px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
        </div>
      </section>
      <hr className='border-b-[1px] border-orange-500 border-x-0 border-t-0 w-full' />
      <section className='w-full mt-8'>
        <div className='w-full flex flex-col sm:grid sm:grid-cols-2 gap-4 mb-8'>
          <div className='w-full h-[100px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
          <div className='w-full h-[100px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
          <div className='w-full h-[100px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
          <div className='w-full h-[100px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
        </div>
        <hr className='border-b-[1px] border-orange-500 border-x-0 border-t-0 w-full' />
        <div className='w-full flex flex-col sm:flex-row gap-4 mt-8'>
          <div className='w-full lg:w-1/2 flex flex-col gap-4'>
            <div className='w-full h-[100px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
            <div className='w-full h-[100px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
            <div className='w-full h-[100px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
          </div>
          <div className='w-full lg:w-1/2 flex flex-col gap-4'>
            <div className='w-full h-[100px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
            <div className='w-full h-[100px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
            <div className='w-full h-[100px] rounded-md bg-gradient-to-tr from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900 animate-pulse'></div>
          </div>
        </div>
      </section>
    </div>
  );
}
