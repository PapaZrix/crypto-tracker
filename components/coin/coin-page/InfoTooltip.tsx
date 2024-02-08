import { IoMdInformationCircleOutline } from 'react-icons/io';

export default function InfoTooltip({ value }: { value: string | number }) {
  if (value === 'N/A') {
    return (
      <div className='flex justify-end gap-1 items-center relative'>
        <p>{value}</p>
        <div className='group relative flex justify-center'>
          <button>
            <IoMdInformationCircleOutline size='1.2rem' className='cursor-pointer' />
          </button>
          <div className='invisible absolute -right-1 bottom-7 sm:-left-[12.5rem] group-hover:visible'>
            <div className='relative'>
              <div className='w-44 bg-gray-200 text-black dark:bg-gray-800 rounded px-3 py-2 text-xs text-center dark:text-white sm:w-56'>
                No information is available about this movement
              </div>
              <div
                style={{
                  borderColor: '#5E6673 transparent transparent transparent',
                  borderWidth: '6px 8px 0 8px',
                }}
                className='absolute -right-1 border-solid w-2 mx-[10px]'
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return value;
}
