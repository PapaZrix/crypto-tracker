export default function NavigationTooltip() {
  return (
    <div className='hidden sm:flex items-center justify-between text-[0.6rem] lg:text-xs px-2 lg:px-4 py-2 absolute bottom-0 left-0 bg-gray-200 dark:bg-gray-700 w-full rounded-b-xl'>
      <div className='flex items-center gap-1 text-gray-600 dark:text-gray-300'>
        <div className='px-1 lg:px-3 py-1 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-white font-semibold'>
          ESC
        </div>
        To Cancel
      </div>
      <div className='flex items-center gap-1 text-gray-600 dark:text-gray-300'>
        <div className='px-1 lg:px-3 py-1 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-white font-semibold'>
          ENTER
        </div>
        To View
      </div>
      <div className='flex items-center gap-1 text-gray-600 dark:text-gray-300'>
        <div className='px-1 lg:px-3 py-1 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-white font-semibold'>
          TAB
        </div>
        <div className='px-1 lg:px-3 py-1 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-white font-semibold'>
          ↑
        </div>
        <div className='px-1 lg:px-3 py-1 rounded-md shadow-md bg-gray-400 dark:bg-gray-600 text-white font-semibold'>
          ↓
        </div>
        To Navigate
      </div>
    </div>
  );
}
