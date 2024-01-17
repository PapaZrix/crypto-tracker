import Dropdown from '@/components/layout/Dropdown';
import type { CoinPageParams, Currency } from '@/types';
import Image from 'next/image';

type TopInfoProps = {
  coin: CoinPageParams | null;
  selectedCurrency: Currency;
  handleClick: (event: React.MouseEvent<HTMLLIElement>) => void;
};

export default function TopInfo({
  coin,
  selectedCurrency,
  handleClick,
}: TopInfoProps) {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <Image
            className='rounded-full'
            src={coin?.image.large ?? ''}
            alt={coin?.name ?? ''}
            width={60}
            height={50}
          />
          <div className='p-2 flex gap-2 items-center'>
            <p className='text-3xl'>{coin?.name}</p>
            <p className='text-gray-400 text-xl'>
              ({coin?.symbol.toUpperCase()})
            </p>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <p className='text-gray-400'>Currency</p>
          <Dropdown
            selectedCurrency={selectedCurrency}
            handleClick={handleClick}
          />
        </div>
      </div>
      <div className='mt-4 flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <p className='text-2xl'>Current Price: </p>
          <div className='text-2xl'>
            {selectedCurrency.symbol}{' '}
            {coin?.market_data.current_price[selectedCurrency.name ?? '']}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {coin?.market_data.price_change_percentage_24h.toString()[0] ===
          '-' ? (
            <>
              <p className='text-red-500 text-2xl'>
                {coin?.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className='text-gray-500'>(1D)</p>
            </>
          ) : (
            <>
              <p className='text-green-500 text-2xl'>
                {coin?.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className='text-gray-500'>(1D)</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
