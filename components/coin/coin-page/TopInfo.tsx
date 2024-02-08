import Dropdown from '@/components/layout/Dropdown';
import type { CoinPageParams, Currency } from '@/types';
import { formatPrice, formatValue } from '@/utils/format';
import Image from 'next/image';

type TopInfoProps = {
  coin: CoinPageParams | null;
  selectedCurrency: Currency;
  handleClick: (event: React.MouseEvent<HTMLLIElement>) => void;
};

export default function TopInfo({ coin, selectedCurrency, handleClick }: TopInfoProps) {
  return (
    <>
      <div className='flex flex-col sm:flex-row items-center justify-between'>
        <div className='flex items-center gap-1 w-full'>
          <Image
            className='rounded-full w-10 h-10 sm:w-auto sm:h-auto'
            src={coin?.image.large ?? ''}
            alt={coin?.name ?? ''}
            width={60}
            height={50}
          />
          <div className='p-2 flex gap-2 items-center'>
            <p className='text-3xl'>{coin?.name}</p>
            <p className='text-gray-400 text-xl'>({coin?.symbol.toUpperCase()})</p>
          </div>
        </div>
        <div className='flex gap-4 items-center mt-4 sm:mt-0 w-full sm:w-auto'>
          <p className='text-gray-400 hidden sm:block'>Currency</p>
          <Dropdown selectedCurrency={selectedCurrency} handleClick={handleClick} />
        </div>
      </div>
      <div className='mt-6 mb-2 sm:mb-0 sm:mt-4 flex items-center gap-2 sm:gap-4'>
        <div className='flex items-center sm:gap-2'>
          <p className='text-2xl hidden sm:block'>Current Price: </p>
          <div className='text-2xl'>
            {selectedCurrency.symbol}{' '}
            {formatPrice(coin?.market_data.current_price[selectedCurrency.name ?? ''])}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {coin?.market_data.price_change_percentage_24h_in_currency[
            selectedCurrency.name ?? ''
          ].toString()[0] === '-' ? (
            <>
              <p className='text-red-500 text-2xl'>
                {coin?.market_data.price_change_percentage_24h_in_currency[
                  selectedCurrency.name ?? ''
                ].toFixed(2)}
                %
              </p>
              <p className='text-gray-400'>(1D)</p>
            </>
          ) : (
            <>
              <p className='text-green-500 text-2xl'>
                {coin?.market_data.price_change_percentage_24h_in_currency[
                  selectedCurrency.name ?? ''
                ].toFixed(2)}
                %
              </p>
              <p className='text-gray-400'>(1D)</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
