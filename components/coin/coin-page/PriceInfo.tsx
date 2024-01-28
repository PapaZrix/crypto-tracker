import type { CoinPageParams, Currency } from '@/types';
import { checkPercentSign } from '@/utils/checkSign';

type PriceInfoProps = {
  coin: CoinPageParams;
  selectedCurrency: Currency;
};

export default function PriceInfo({ coin, selectedCurrency }: PriceInfoProps) {
  return (
    <>
      <div className='mt-6 w-full text-gray-600 dark:text-gray-400'>
        <h3 className='text-xl text-black dark:text-white bold'>
          {coin.symbol.toUpperCase()} Price Information
        </h3>
        <p className='my-2'>{`24h Low & High`}</p>
        <div className='flex items-center w-full gap-4 mt-1 text-sm'>
          <span className='text-nowrap'>
            Low: {selectedCurrency.symbol}
            {coin.market_data.low_24h[selectedCurrency.name ?? ''].toFixed(4)}
          </span>
          <div className='flex w-60 h-2'>
            <p className='w-1/2 h-full bg-red-500 rounded-l-lg'></p>
            <p className='w-1/2 h-full bg-green-500 rounded-r-lg'></p>
          </div>
          <span className='text-nowrap'>
            High: {selectedCurrency.symbol}
            {coin.market_data.high_24h[selectedCurrency.name ?? ''].toFixed(4)}
          </span>
        </div>
        <div className='mt-4 w-full flex flex-col sm:flex-row justify-between gap-6 sm:gap-0'>
          <div className='w-full flex items-center justify-between sm:block'>
            <p>All Time High</p>
            <p className='text-black font-medium dark:text-white'>
              {selectedCurrency.symbol}
              {coin.market_data.ath[selectedCurrency.name ?? '']}
            </p>
          </div>
          <div className='w-full flex items-center justify-between sm:block'>
            <p>Price Change (24h)</p>
            <p
              className={`${checkPercentSign(
                coin.market_data.price_change_24h_in_currency[selectedCurrency.name ?? '']
              )} font-medium`}
            >
              {coin.market_data.price_change_percentage_24h_in_currency[
                selectedCurrency.name ?? ''
              ].toFixed(2)}
              %
            </p>
          </div>
          <div className='w-full flex items-center justify-between sm:block'>
            <p>Price Change (7d)</p>
            <p
              className={`${checkPercentSign(
                coin.market_data.price_change_percentage_7d_in_currency[selectedCurrency.name ?? '']
              )} font-medium`}
            >
              {coin.market_data.price_change_percentage_7d_in_currency[
                selectedCurrency.name ?? ''
              ] === undefined
                ? 'N/A'
                : coin.market_data.price_change_percentage_7d_in_currency[
                    selectedCurrency.name ?? ''
                  ]
                    .toFixed(2)
                    .concat('%')}
            </p>
          </div>
          <div className='w-full flex items-center justify-between sm:block'>
            <p>Price Change (14d)</p>
            <p
              className={`${checkPercentSign(
                coin.market_data.price_change_percentage_14d_in_currency[
                  selectedCurrency.name ?? ''
                ]
              )} font-medium`}
            >
              {coin.market_data.price_change_percentage_14d === 0
                ? 'N/A'
                : coin.market_data.price_change_percentage_14d_in_currency[
                    selectedCurrency.name ?? ''
                  ]
                    .toFixed(2)
                    .concat('%')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
