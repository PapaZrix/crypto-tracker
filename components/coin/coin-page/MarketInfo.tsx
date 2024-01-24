import millify from 'millify';
import type { CoinPageParams, Currency } from '@/types';

type MarketInfoProps = {
  coin: CoinPageParams;
  selectedCurrency: Currency;
};

export default function MarketInfo({
  coin,
  selectedCurrency,
}: MarketInfoProps) {
  return (
    <div className='mt-6 w-full text-gray-600 dark:text-gray-400'>
      <h2 className='text-xl bold text-black dark:text-white'>
        {coin.symbol.toUpperCase()} Market Information
      </h2>
      <div className='mt-2 w-full flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between'>
        <div className='w-full flex items-center justify-between sm:block'>
          <p>Popularity</p>
          <p className='dark:text-white'>#{coin.market_data.market_cap_rank}</p>
        </div>
        <div className='w-full flex items-center justify-between sm:block'>
          <p>Market Cap</p>
          <p className='dark:text-white'>
            {millify(coin.market_data.market_cap[selectedCurrency.name ?? ''], {
              precision: 2,
            })}
          </p>
        </div>
        <div className='w-full flex items-center justify-between sm:block'>
          <p>Volume (24h)</p>
          <p className='dark:text-white'>
            {millify(
              coin.market_data.total_volume[selectedCurrency.name ?? ''],
              {
                precision: 2,
              }
            )}
          </p>
        </div>
        <div className='w-full flex items-center justify-between sm:block'>
          <p>Circulating Supply</p>
          <p className='dark:text-white'>
            {millify(coin.market_data.circulating_supply, {
              precision: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
