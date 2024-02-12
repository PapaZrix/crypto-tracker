import { checkPercentSign } from '@/lib/utils';
import { NftProps } from '@/types';

export default function MarketInfo(nft: NftProps) {
  return (
    <div className='mt-6 w-full text-gray-600 dark:text-gray-400'>
      <h2 className='mb-4 sm:mb-0 text-xl bold text-black dark:text-white'>
        {nft.symbol.toUpperCase()} Market Information
      </h2>
      <div className='mt-2 w-full flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between'>
        <div className='w-full flex items-center justify-between sm:block'>
          <p>% Volume Change</p>
          <p
            className={`text-black font-medium ${checkPercentSign(
              nft.volume_24h_percentage_change.native_currency
            )}`}
          >
            {nft.volume_24h_percentage_change.native_currency.toFixed(2)}%
          </p>
        </div>
        <div className='w-full flex items-center justify-between sm:block'>
          <p>Market Cap</p>
          <p className='text-black font-medium dark:text-white'>
            {nft.market_cap.native_currency} {nft.native_currency_symbol}
          </p>
        </div>
        <div className='w-full flex items-center justify-between sm:block'>
          <p>Volume (24h)</p>
          <p className='text-black font-medium dark:text-white'>
            {nft.volume_24h.native_currency} {nft.native_currency_symbol}
          </p>
        </div>
        <div className='w-full flex items-center justify-between sm:block'>
          <p>Total Supply</p>
          <p className='text-black font-medium dark:text-white'>{nft.total_supply}</p>
        </div>
      </div>
    </div>
  );
}
